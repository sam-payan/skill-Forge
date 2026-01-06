# SkillSphere Backend Implementation Contracts

## Overview
This document outlines the API contracts, data models, and integration points for the SkillSphere backend implementation with Azure OpenAI and Azure Machine Learning.

---

## 1. Current Mock Data (Frontend)

### File: `/app/frontend/src/mock.js`

**Mock Data Currently Used:**
- `assessments` - 6 assessment cards with title, description, difficulty, duration, skills
- `dashboardData` - Active assessments count, completed count, avg score, improvement %, skill progress, AI feedback
- `techFeatures` - Azure OpenAI and Azure ML feature descriptions
- `comparisons` - Comparison data for SkillSphere vs Traditional

**What to Implement in Backend:**
- Assessment listing API
- Dashboard metrics API with real calculations
- Assessment submission and evaluation API

---

## 2. MongoDB Models

### Assessment Model
```python
{
    "_id": ObjectId,
    "title": str,  # "Frontend Engineering"
    "description": str,
    "difficulty": str,  # "Beginner", "Intermediate", "Advanced"
    "duration": int,  # minutes
    "skills": [str],  # ["React", "CSS", "JavaScript"]
    "scenario_prompt": str,  # Azure OpenAI generated scenario
    "created_at": datetime
}
```

### AssessmentResult Model
```python
{
    "_id": ObjectId,
    "user_id": str,
    "assessment_id": ObjectId,
    "scenario": str,  # The actual scenario presented
    "user_response": str,  # User's solution/answer
    "score": float,  # 0-100
    "ai_feedback": str,  # Azure OpenAI generated feedback
    "improvement_delta": float,  # Calculated improvement
    "completed_at": datetime
}
```

### User Model (Simple)
```python
{
    "_id": ObjectId,
    "name": str,
    "email": str,
    "selected_role": str,  # "Frontend", "Backend", etc.
    "assessment_history": [ObjectId],  # References to AssessmentResult
    "created_at": datetime
}
```

---

## 3. Core APIs (MVP)

### API 1: POST /api/assessments/start
**Purpose:** Start a new assessment with AI-generated scenario

**Request:**
```json
{
  "assessment_id": "frontend-engineering",
  "user_id": "user123"
}
```

**Backend Process:**
1. Fetch assessment template from MongoDB
2. Call **Azure OpenAI** with prompt to generate personalized scenario
3. Store scenario in session/temp collection
4. Return scenario to frontend

**Response:**
```json
{
  "session_id": "sess_abc123",
  "assessment_title": "Frontend Engineering",
  "scenario": "Build a responsive dashboard component with...",
  "max_duration_minutes": 45
}
```

**Azure OpenAI Integration:**
- Use `emergentintegrations` library
- Model: `gpt-5.2` (default)
- Prompt template: "Generate a {difficulty} level {skill} assessment scenario..."

---

### API 2: POST /api/assessments/submit
**Purpose:** Submit assessment response and get AI evaluation

**Request:**
```json
{
  "session_id": "sess_abc123",
  "user_id": "user123",
  "user_response": "User's code/solution here...",
  "time_spent_minutes": 40
}
```

**Backend Process:**
1. Retrieve original scenario
2. Call **Azure OpenAI** to evaluate response:
   - Generate structured feedback
   - Calculate score (0-100)
   - Provide improvement suggestions
3. Calculate improvement delta using **Azure ML** (if previous attempts exist)
4. Store result in AssessmentResult collection
5. Update user's assessment_history

**Response:**
```json
{
  "result_id": "result_xyz",
  "score": 87,
  "ai_feedback": "Strong implementation of responsive design...",
  "improvement_delta": 12,
  "proficiency_level": "Advanced",
  "strengths": ["Component structure", "State management"],
  "areas_for_improvement": ["Error handling", "Performance optimization"]
}
```

**Azure OpenAI Integration:**
- Evaluation prompt: "Evaluate this {skill} solution based on..."
- Return JSON structure with score and feedback

---

### API 3: GET /api/dashboard/overview
**Purpose:** Get user dashboard data with analytics

**Request:**
```
GET /api/dashboard/overview?user_id=user123
```

**Backend Process:**
1. Aggregate user's assessment results from MongoDB
2. Calculate metrics:
   - Active assessments: Count of in-progress
   - Completed: Count of finished assessments
   - Average score: Mean of all scores
   - Improvement: Use **Azure ML** to calculate trend
3. Get skill progression per topic
4. Get latest AI feedback from recent assessments

**Response:**
```json
{
  "active_assessments": 3,
  "completed_assessments": 12,
  "avg_score": 87,
  "improvement": 23,
  "skill_progress": [
    {"name": "Frontend Development", "score": 92},
    {"name": "Backend APIs", "score": 85}
  ],
  "ai_feedback": [
    "Strong performance in React optimization...",
    "API error handling shows production-ready patterns..."
  ]
}
```

---

## 4. Azure OpenAI Integration Details

### Installation
```bash
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/
```

### Environment Variable
```
EMERGENT_LLM_KEY=sk-emergent-6090fA63fC1F4BaAcE
```

### Usage Pattern
```python
from emergentintegrations.llm.chat import LlmChat, UserMessage
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize chat
chat = LlmChat(
    api_key=os.getenv("EMERGENT_LLM_KEY"),
    session_id="assessment-generator",
    system_message="You are an expert skill assessment creator."
).with_model("openai", "gpt-5.2")

# Generate scenario
user_message = UserMessage(
    text=f"Generate a {difficulty} level {skill} assessment scenario..."
)

response = await chat.send_message(user_message)
```

### Two Main Use Cases:
1. **Scenario Generation:** Generate realistic assessment challenges
2. **Evaluation:** Evaluate user responses with structured feedback

---

## 5. Azure Machine Learning Integration

### Purpose
- Track skill progression over time
- Calculate improvement percentages
- Predict readiness levels

### Simple Implementation (MVP)
For MVP, implement **basic analytics** without full Azure ML deployment:

```python
def calculate_improvement(user_id: str, skill: str, db):
    """Calculate improvement percentage for a skill"""
    # Get all results for this skill
    results = db.assessment_results.find({
        "user_id": user_id,
        "assessment.skills": skill
    }).sort("completed_at", 1)
    
    results_list = list(results)
    
    if len(results_list) < 2:
        return 0
    
    first_score = results_list[0]["score"]
    latest_score = results_list[-1]["score"]
    
    improvement = ((latest_score - first_score) / first_score) * 100
    return round(improvement, 1)
```

**Note:** Full Azure ML model deployment can be added post-MVP for advanced predictions.

---

## 6. Frontend Integration Changes

### Remove Mock Data
1. Delete imports from `mock.js` in Home.jsx
2. Replace with API calls using axios

### Example Changes:
```javascript
// Old (mock)
import { assessments, dashboardData } from '../mock';

// New (API)
const [assessments, setAssessments] = useState([]);
const [dashboardData, setDashboardData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get(`${API}/dashboard/overview?user_id=demo_user`);
    setDashboardData(response.data);
  };
  fetchData();
}, []);
```

---

## 7. Implementation Priority

### Phase 1: Core Backend (Priority)
1. Setup MongoDB models
2. Implement POST /api/assessments/start with Azure OpenAI scenario generation
3. Implement POST /api/assessments/submit with Azure OpenAI evaluation
4. Implement GET /api/dashboard/overview with basic analytics

### Phase 2: Frontend Integration
1. Create API service layer
2. Replace mock data with real API calls
3. Add loading states and error handling
4. Test assessment flow end-to-end

### Phase 3: Testing
1. Test Azure OpenAI integration
2. Test dashboard metrics calculation
3. Test full assessment submission flow

---

## 8. Environment Setup Required

### Backend .env additions:
```
EMERGENT_LLM_KEY=sk-emergent-6090fA63fC1F4BaAcE
```

### Installation:
```bash
cd /app/backend
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/
pip freeze > requirements.txt
```

---

## Success Criteria

✅ User can start an assessment and receive AI-generated scenario
✅ User can submit solution and receive AI evaluation with score
✅ Dashboard shows real metrics calculated from MongoDB
✅ Azure OpenAI integration clearly visible in assessment flow
✅ Basic improvement tracking works
✅ All frontend mock data replaced with real API calls

---

## Notes for Implementation

- Keep it simple for MVP - focus on ONE working assessment flow
- Log all Azure OpenAI calls for demo purposes
- Use demo/test user ID initially (no auth needed for MVP)
- Ensure assessment scenarios are realistic and relevant
- Make AI feedback detailed and actionable
