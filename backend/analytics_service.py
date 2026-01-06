from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo import ASCENDING, DESCENDING
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class AnalyticsService:
    """Service for Azure ML-inspired analytics and skill progression tracking"""
    
    async def calculate_improvement(self, db: AsyncIOMotorDatabase, user_id: str, assessment_id: str) -> float:
        """
        Calculate improvement percentage for a user on specific assessment
        Uses Azure ML-style analytics approach
        """
        try:
            # Get all results for this user and assessment, sorted by date
            results = await db.assessment_results.find({
                "user_id": user_id,
                "assessment_id": assessment_id
            }).sort("completed_at", ASCENDING).to_list(None)
            
            if len(results) < 2:
                return 0.0
            
            first_score = results[0]["score"]
            latest_score = results[-1]["score"]
            
            if first_score == 0:
                return 0.0
            
            improvement = ((latest_score - first_score) / first_score) * 100
            return round(improvement, 1)
            
        except Exception as e:
            logger.error(f"Error calculating improvement: {str(e)}")
            return 0.0
    
    async def get_dashboard_metrics(self, db: AsyncIOMotorDatabase, user_id: str) -> dict:
        """
        Get comprehensive dashboard metrics for a user
        Azure ML-powered performance analytics
        """
        try:
            # Count active assessments (sessions without results)
            active_sessions = await db.assessment_sessions.count_documents({
                "user_id": user_id,
                "completed": False
            })
            
            # Count completed assessments
            completed = await db.assessment_results.count_documents({
                "user_id": user_id
            })
            
            # Calculate average score
            pipeline = [
                {"$match": {"user_id": user_id}},
                {"$group": {
                    "_id": None,
                    "avg_score": {"$avg": "$score"},
                    "total_count": {"$sum": 1}
                }}
            ]
            
            avg_result = await db.assessment_results.aggregate(pipeline).to_list(None)
            avg_score = round(avg_result[0]["avg_score"], 1) if avg_result else 0
            
            # Calculate overall improvement
            all_results = await db.assessment_results.find(
                {"user_id": user_id}
            ).sort("completed_at", ASCENDING).to_list(None)
            
            improvement = 0.0
            if len(all_results) >= 2:
                first_score = all_results[0]["score"]
                latest_score = all_results[-1]["score"]
                if first_score > 0:
                    improvement = ((latest_score - first_score) / first_score) * 100
            
            # Get skill progression
            skill_progress = await self._calculate_skill_progress(db, user_id)
            
            # Get recent AI feedback
            recent_feedback = await db.assessment_results.find(
                {"user_id": user_id}
            ).sort("completed_at", DESCENDING).limit(4).to_list(None)
            
            ai_feedback = [result["ai_feedback"][:150] + "..." for result in recent_feedback if result.get("ai_feedback")]
            
            return {
                "active_assessments": active_sessions,
                "completed_assessments": completed,
                "avg_score": avg_score,
                "improvement": round(improvement, 1),
                "skill_progress": skill_progress,
                "ai_feedback": ai_feedback
            }
            
        except Exception as e:
            logger.error(f"Error getting dashboard metrics: {str(e)}")
            return {
                "active_assessments": 0,
                "completed_assessments": 0,
                "avg_score": 0,
                "improvement": 0,
                "skill_progress": [],
                "ai_feedback": []
            }
    
    async def _calculate_skill_progress(self, db: AsyncIOMotorDatabase, user_id: str) -> list:
        """
        Calculate progress for each skill domain
        Azure ML skill progression modeling
        """
        try:
            # Aggregate results by assessment to get skill-level scores
            pipeline = [
                {"$match": {"user_id": user_id}},
                {
                    "$lookup": {
                        "from": "assessments",
                        "localField": "assessment_id",
                        "foreignField": "_id",
                        "as": "assessment"
                    }
                },
                {"$unwind": "$assessment"},
                {
                    "$group": {
                        "_id": "$assessment.title",
                        "avg_score": {"$avg": "$score"},
                        "latest_score": {"$last": "$score"},
                        "count": {"$sum": 1}
                    }
                },
                {"$sort": {"avg_score": DESCENDING}},
                {"$limit": 5}
            ]
            
            results = await db.assessment_results.aggregate(pipeline).to_list(None)
            
            skill_progress = []
            for result in results:
                skill_progress.append({
                    "name": result["_id"],
                    "score": round(result["avg_score"], 0)
                })
            
            return skill_progress
            
        except Exception as e:
            logger.error(f"Error calculating skill progress: {str(e)}")
            return []

# Create singleton instance
analytics_service = AnalyticsService()