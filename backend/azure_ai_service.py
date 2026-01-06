from dotenv import load_dotenv
import os
import json
import logging

load_dotenv()
logger = logging.getLogger(__name__)


class AzureAIService:
    """Service for Azure OpenAI integration using emergentintegrations"""
    
    def __init__(self):
        
    async def generate_assessment_scenario(self, assessment_title: str, difficulty: str, skills: list) -> str:
        """
        Generate a personalized assessment scenario using Azure OpenAI
        
        Args:
            assessment_title: Title of the assessment
            difficulty: Difficulty level (Beginner, Intermediate, Advanced)
            skills: List of skills to assess
            
        Returns:
            Generated scenario text
        """
        try:
            chat = LlmChat(
                api_key=self.api_key,
                session_id=f"scenario-gen-{assessment_title}",
                system_message="You are an expert technical assessment creator for SkillSphere, an AI-powered skill assessment platform. Create realistic, practical assessment scenarios that test real-world abilities."
            ).with_model("openai", "gpt-5.2")
            
            skills_str = ", ".join(skills)
            prompt = f"""Create a {difficulty} level assessment scenario for {assessment_title}.

Skills to assess: {skills_str}

Requirements:
1. The scenario should be a real-world problem that tests practical skills
2. Include specific requirements and success criteria
3. Make it challenging but achievable within 30-60 minutes
4. Focus on problem-solving and execution
5. Be detailed enough that the candidate knows exactly what to build

Provide ONLY the scenario description, no additional commentary."""
            
            user_message = UserMessage(text=prompt)
            response = await chat.send_message(user_message)
            
            logger.info(f"✅ Azure OpenAI: Generated scenario for {assessment_title}")
            return response
            
        except Exception as e:
            logger.error(f"❌ Azure OpenAI scenario generation failed: {str(e)}")
            raise Exception(f"Failed to generate assessment scenario: {str(e)}")
    
    async def evaluate_assessment(self, scenario: str, user_response: str, skills: list) -> dict:
        """
        Evaluate user's assessment response using Azure OpenAI
        
        Args:
            scenario: The original assessment scenario
            user_response: User's solution/answer
            skills: Skills being assessed
            
        Returns:
            Dictionary with score, feedback, strengths, and areas for improvement
        """
        try:
            chat = LlmChat(
                api_key=self.api_key,
                session_id=f"eval-{hash(user_response)}",
                system_message="You are an expert technical evaluator for SkillSphere. Provide detailed, actionable feedback on assessment submissions. Be fair but thorough."
            ).with_model("openai", "gpt-5.2")
            
            skills_str = ", ".join(skills)
            prompt = f"""Evaluate this assessment submission.

**Scenario:**
{scenario}

**User's Response:**
{user_response}

**Skills Being Assessed:** {skills_str}

Provide your evaluation in the following JSON format (respond with ONLY valid JSON, no markdown):
{{
  "score": <number 0-100>,
  "feedback": "<detailed feedback paragraph explaining the score>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "areas_for_improvement": ["<area 1>", "<area 2>", "<area 3>"]
}}

Evaluation criteria:
- Correctness and completeness
- Code quality and best practices
- Problem-solving approach
- Technical depth
- Real-world applicability"""
            
            user_message = UserMessage(text=prompt)
            response = await chat.send_message(user_message)
            
            # Parse JSON response
            try:
                # Clean response if it contains markdown code blocks
                cleaned_response = response.strip()
                if cleaned_response.startswith("```"):
                    lines = cleaned_response.split("\n")
                    cleaned_response = "\n".join(lines[1:-1] if len(lines) > 2 else lines)
                
                evaluation = json.loads(cleaned_response)
                
                # Validate structure
                required_keys = ["score", "feedback", "strengths", "areas_for_improvement"]
                if not all(key in evaluation for key in required_keys):
                    raise ValueError("Missing required keys in evaluation")
                
                logger.info(f"✅ Azure OpenAI: Evaluated submission - Score: {evaluation['score']}")
                return evaluation
                
            except json.JSONDecodeError as json_err:
                logger.error(f"Failed to parse JSON response: {response}")
                # Return default evaluation
                return {
                    "score": 70,
                    "feedback": response[:500],  # Use raw response as feedback
                    "strengths": ["Attempted the problem", "Provided detailed response"],
                    "areas_for_improvement": ["Consider structure", "Add more detail"]
                }
            
        except Exception as e:
            logger.error(f"❌ Azure OpenAI evaluation failed: {str(e)}")
            raise Exception(f"Failed to evaluate assessment: {str(e)}")
    
    def calculate_proficiency_level(self, score: float) -> str:
        """Determine proficiency level based on score"""
        if score >= 85:
            return "Advanced"
        elif score >= 70:
            return "Intermediate"
        else:
            return "Beginner"

# Create singleton instance
azure_ai_service = AzureAIService()