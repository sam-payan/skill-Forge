from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime
import uuid
from bson import ObjectId

# Import models and services
from models import (
    StartAssessmentRequest, StartAssessmentResponse,
    SubmitAssessmentRequest, SubmitAssessmentResponse,
    DashboardMetrics
)
from azure_ai_service import azure_ai_service
from analytics_service import analytics_service

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="SkillSphere API", version="1.0.0")

# Create API router with /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Seed assessments on startup
async def seed_assessments():
    """Seed initial assessment templates if they don't exist"""
    try:
        count = await db.assessments.count_documents({})
        if count > 0:
            logger.info("Assessments already seeded")
            return
        
        assessments = [
            {
                "_id": "frontend-engineering",
                "title": "Frontend Engineering",
                "description": "Build responsive interfaces with React, optimize performance, and implement modern UI patterns.",
                "difficulty": "Intermediate",
                "duration": 45,
                "skills": ["React", "CSS", "JavaScript", "Performance"],
                "scenario_template": "frontend",
                "created_at": datetime.utcnow()
            },
            {
                "_id": "backend-development",
                "title": "Backend Development",
                "description": "Design RESTful APIs, implement authentication, and optimize database queries.",
                "difficulty": "Advanced",
                "duration": 60,
                "skills": ["Node.js", "Python", "API Design", "Security"],
                "scenario_template": "backend",
                "created_at": datetime.utcnow()
            },
            {
                "_id": "system-design",
                "title": "System Design",
                "description": "Architect scalable systems, handle distributed challenges, and optimize for high availability.",
                "difficulty": "Advanced",
                "duration": 90,
                "skills": ["Scalability", "Microservices", "Caching", "Load Balancing"],
                "scenario_template": "system-design",
                "created_at": datetime.utcnow()
            }
        ]
        
        await db.assessments.insert_many(assessments)
        logger.info(f"✅ Seeded {len(assessments)} assessments")
        
    except Exception as e:
        logger.error(f"Error seeding assessments: {str(e)}")

@app.on_event("startup")
async def startup_event():
    """Initialize database and seed data"""
    await seed_assessments()
    logger.info("🚀 SkillSphere API started successfully")

# ============= API ENDPOINTS =============

@api_router.post("/assessments/start", response_model=StartAssessmentResponse)
async def start_assessment(request: StartAssessmentRequest):
    """
    Start a new assessment with AI-generated scenario
    Uses Azure OpenAI to generate personalized scenarios
    """
    try:
        logger.info(f"📝 Starting assessment: {request.assessment_id} for user: {request.user_id}")
        
        # Get assessment template
        assessment = await db.assessments.find_one({"_id": request.assessment_id})
        if not assessment:
            raise HTTPException(status_code=404, detail="Assessment not found")
        
        # Generate scenario using Azure OpenAI
        logger.info(f"🤖 Calling Azure OpenAI to generate scenario...")
        scenario = await azure_ai_service.generate_assessment_scenario(
            assessment_title=assessment["title"],
            difficulty=assessment["difficulty"],
            skills=assessment["skills"]
        )
        
        # Create assessment session
        session_id = str(uuid.uuid4())
        session = {
            "_id": session_id,
            "user_id": request.user_id,
            "assessment_id": request.assessment_id,
            "assessment_title": assessment["title"],
            "scenario": scenario,
            "skills": assessment["skills"],
            "completed": False,
            "created_at": datetime.utcnow()
        }
        
        await db.assessment_sessions.insert_one(session)
        
        logger.info(f"✅ Assessment session created: {session_id}")
        
        return StartAssessmentResponse(
            session_id=session_id,
            assessment_title=assessment["title"],
            scenario=scenario,
            max_duration_minutes=assessment["duration"]
        )
        
    except Exception as e:
        logger.error(f"❌ Error starting assessment: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/assessments/submit", response_model=SubmitAssessmentResponse)
async def submit_assessment(request: SubmitAssessmentRequest):
    """
    Submit assessment response and get AI evaluation
    Uses Azure OpenAI for evaluation and Azure ML for improvement tracking
    """
    try:
        logger.info(f"📤 Submitting assessment: {request.session_id}")
        
        # Get session
        session = await db.assessment_sessions.find_one({"_id": request.session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        if session["completed"]:
            raise HTTPException(status_code=400, detail="Assessment already submitted")
        
        # Evaluate using Azure OpenAI
        logger.info(f"🤖 Calling Azure OpenAI to evaluate submission...")
        evaluation = await azure_ai_service.evaluate_assessment(
            scenario=session["scenario"],
            user_response=request.user_response,
            skills=session["skills"]
        )
        
        # Calculate proficiency level
        proficiency_level = azure_ai_service.calculate_proficiency_level(evaluation["score"])
        
        # Calculate improvement using Azure ML-inspired analytics
        improvement_delta = await analytics_service.calculate_improvement(
            db=db,
            user_id=request.user_id,
            assessment_id=session["assessment_id"]
        )
        
        # Store result
        result_id = str(uuid.uuid4())
        result = {
            "_id": result_id,
            "user_id": request.user_id,
            "assessment_id": session["assessment_id"],
            "scenario": session["scenario"],
            "user_response": request.user_response,
            "score": evaluation["score"],
            "ai_feedback": evaluation["feedback"],
            "improvement_delta": improvement_delta,
            "strengths": evaluation["strengths"],
            "areas_for_improvement": evaluation["areas_for_improvement"],
            "proficiency_level": proficiency_level,
            "completed_at": datetime.utcnow()
        }
        
        await db.assessment_results.insert_one(result)
        
        # Mark session as completed
        await db.assessment_sessions.update_one(
            {"_id": request.session_id},
            {"$set": {"completed": True}}
        )
        
        logger.info(f"✅ Assessment evaluated - Score: {evaluation['score']}, Proficiency: {proficiency_level}")
        
        return SubmitAssessmentResponse(
            result_id=result_id,
            score=evaluation["score"],
            ai_feedback=evaluation["feedback"],
            improvement_delta=improvement_delta,
            proficiency_level=proficiency_level,
            strengths=evaluation["strengths"],
            areas_for_improvement=evaluation["areas_for_improvement"]
        )
        
    except Exception as e:
        logger.error(f"❌ Error submitting assessment: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/dashboard/overview", response_model=DashboardMetrics)
async def get_dashboard_overview(user_id: str):
    """
    Get dashboard metrics with Azure ML-powered analytics
    Includes skill progression, improvement trends, and AI feedback
    """
    try:
        logger.info(f"📊 Getting dashboard metrics for user: {user_id}")
        
        metrics = await analytics_service.get_dashboard_metrics(db=db, user_id=user_id)
        
        logger.info(f"✅ Dashboard metrics retrieved")
        
        return DashboardMetrics(**metrics)
        
    except Exception as e:
        logger.error(f"❌ Error getting dashboard metrics: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/")
async def root():
    return {
        "message": "SkillSphere API",
        "version": "1.0.0",
        "azure_services": {
            "openai": "Active - Scenario generation and evaluation",
            "machine_learning": "Active - Performance analytics and skill progression"
        }
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("🔌 Database connection closed")