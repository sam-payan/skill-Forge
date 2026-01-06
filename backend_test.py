#!/usr/bin/env python3
"""
SkillSphere Backend Testing Suite
Tests Azure OpenAI integration and Azure ML analytics
"""

import asyncio
import aiohttp
import json
import time
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Test configuration
BASE_URL = "https://ai-skills-5.preview.emergentagent.com/api"
TEST_USER_ID = "demo_user_001"

class SkillSphereBackendTester:
    def __init__(self):
        self.session = None
        self.test_results = {
            "scenario_generation": {"status": "PENDING", "details": {}},
            "assessment_evaluation": {"status": "PENDING", "details": {}},
            "dashboard_metrics": {"status": "PENDING", "details": {}},
            "improvement_tracking": {"status": "PENDING", "details": {}},
            "error_scenarios": {"status": "PENDING", "details": {}}
        }
        self.session_id = None
        
    async def setup(self):
        """Initialize HTTP session"""
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=30),
            headers={"Content-Type": "application/json"}
        )
        logger.info("🚀 Starting SkillSphere Backend Testing Suite")
        logger.info(f"📍 Base URL: {BASE_URL}")
        logger.info(f"👤 Test User ID: {TEST_USER_ID}")
        
    async def cleanup(self):
        """Close HTTP session"""
        if self.session:
            await self.session.close()
            
    async def test_scenario_generation(self):
        """Test Scenario 1: Start Assessment with AI Scenario Generation"""
        logger.info("\n" + "="*60)
        logger.info("🧪 TEST SCENARIO 1: Azure OpenAI Scenario Generation")
        logger.info("="*60)
        
        try:
            start_time = time.time()
            
            payload = {
                "assessment_id": "frontend-engineering",
                "user_id": TEST_USER_ID
            }
            
            logger.info(f"📤 POST {BASE_URL}/assessments/start")
            logger.info(f"📋 Payload: {json.dumps(payload, indent=2)}")
            
            async with self.session.post(f"{BASE_URL}/assessments/start", json=payload) as response:
                response_time = time.time() - start_time
                status_code = response.status
                response_data = await response.json()
                
                logger.info(f"📥 Response Status: {status_code}")
                logger.info(f"⏱️  Response Time: {response_time:.2f}s")
                logger.info(f"📄 Response Data: {json.dumps(response_data, indent=2)}")
                
                # Validation checks
                validation_results = {
                    "status_200": status_code == 200,
                    "has_session_id": "session_id" in response_data,
                    "has_assessment_title": "assessment_title" in response_data,
                    "has_scenario": "scenario" in response_data,
                    "has_max_duration": "max_duration_minutes" in response_data,
                    "scenario_length": len(response_data.get("scenario", "")) > 100,
                    "scenario_mentions_frontend": any(term in response_data.get("scenario", "").lower() 
                                                    for term in ["react", "css", "javascript", "frontend", "component"]),
                    "response_time_acceptable": response_time < 10.0
                }
                
                # Store session_id for next test
                if validation_results["has_session_id"]:
                    self.session_id = response_data["session_id"]
                    logger.info(f"💾 Stored session_id: {self.session_id}")
                
                # Log validation results
                logger.info("\n🔍 VALIDATION RESULTS:")
                for check, passed in validation_results.items():
                    status = "✅ PASS" if passed else "❌ FAIL"
                    logger.info(f"  {check}: {status}")
                
                # Overall test result
                all_passed = all(validation_results.values())
                self.test_results["scenario_generation"] = {
                    "status": "PASS" if all_passed else "FAIL",
                    "details": {
                        "response_code": status_code,
                        "response_time": response_time,
                        "validation_checks": validation_results,
                        "session_id": self.session_id,
                        "scenario_preview": response_data.get("scenario", "")[:200] + "..." if response_data.get("scenario") else None
                    }
                }
                
                if all_passed:
                    logger.info("🎉 TEST SCENARIO 1: PASSED")
                else:
                    logger.error("💥 TEST SCENARIO 1: FAILED")
                    
        except Exception as e:
            logger.error(f"💥 TEST SCENARIO 1 ERROR: {str(e)}")
            self.test_results["scenario_generation"] = {
                "status": "ERROR",
                "details": {"error": str(e)}
            }
    
    async def test_assessment_evaluation(self):
        """Test Scenario 2: Submit Assessment with AI Evaluation"""
        logger.info("\n" + "="*60)
        logger.info("🧪 TEST SCENARIO 2: Azure OpenAI Assessment Evaluation")
        logger.info("="*60)
        
        if not self.session_id:
            logger.error("❌ Cannot run test - no session_id from previous test")
            self.test_results["assessment_evaluation"] = {
                "status": "SKIP",
                "details": {"error": "No session_id available"}
            }
            return
            
        try:
            start_time = time.time()
            
            payload = {
                "session_id": self.session_id,
                "user_id": TEST_USER_ID,
                "user_response": "I would build a responsive React dashboard using functional components with useState for state management. The component would use CSS Grid for layout, media queries for responsiveness, and React.memo for performance optimization. Key features include error boundaries, loading states, and accessibility support with ARIA labels. I'd implement lazy loading for large datasets, use React.Suspense for code splitting, and add comprehensive unit tests with Jest and React Testing Library.",
                "time_spent_minutes": 35
            }
            
            logger.info(f"📤 POST {BASE_URL}/assessments/submit")
            logger.info(f"📋 Payload: {json.dumps(payload, indent=2)}")
            
            async with self.session.post(f"{BASE_URL}/assessments/submit", json=payload) as response:
                response_time = time.time() - start_time
                status_code = response.status
                response_data = await response.json()
                
                logger.info(f"📥 Response Status: {status_code}")
                logger.info(f"⏱️  Response Time: {response_time:.2f}s")
                logger.info(f"📄 Response Data: {json.dumps(response_data, indent=2)}")
                
                # Validation checks
                validation_results = {
                    "status_200": status_code == 200,
                    "has_result_id": "result_id" in response_data,
                    "has_score": "score" in response_data,
                    "has_ai_feedback": "ai_feedback" in response_data,
                    "has_improvement_delta": "improvement_delta" in response_data,
                    "has_proficiency_level": "proficiency_level" in response_data,
                    "has_strengths": "strengths" in response_data and isinstance(response_data.get("strengths"), list),
                    "has_areas_for_improvement": "areas_for_improvement" in response_data and isinstance(response_data.get("areas_for_improvement"), list),
                    "score_in_range": 0 <= response_data.get("score", -1) <= 100,
                    "reasonable_score": 60 <= response_data.get("score", 0) <= 95,
                    "feedback_substantial": len(response_data.get("ai_feedback", "")) > 50,
                    "strengths_count": len(response_data.get("strengths", [])) >= 2,
                    "improvements_count": len(response_data.get("areas_for_improvement", [])) >= 2,
                    "proficiency_valid": response_data.get("proficiency_level") in ["Beginner", "Intermediate", "Advanced"],
                    "response_time_acceptable": response_time < 10.0
                }
                
                # Log validation results
                logger.info("\n🔍 VALIDATION RESULTS:")
                for check, passed in validation_results.items():
                    status = "✅ PASS" if passed else "❌ FAIL"
                    logger.info(f"  {check}: {status}")
                
                # Overall test result
                all_passed = all(validation_results.values())
                self.test_results["assessment_evaluation"] = {
                    "status": "PASS" if all_passed else "FAIL",
                    "details": {
                        "response_code": status_code,
                        "response_time": response_time,
                        "validation_checks": validation_results,
                        "score": response_data.get("score"),
                        "proficiency_level": response_data.get("proficiency_level"),
                        "feedback_preview": response_data.get("ai_feedback", "")[:200] + "..." if response_data.get("ai_feedback") else None
                    }
                }
                
                if all_passed:
                    logger.info("🎉 TEST SCENARIO 2: PASSED")
                else:
                    logger.error("💥 TEST SCENARIO 2: FAILED")
                    
        except Exception as e:
            logger.error(f"💥 TEST SCENARIO 2 ERROR: {str(e)}")
            self.test_results["assessment_evaluation"] = {
                "status": "ERROR",
                "details": {"error": str(e)}
            }
    
    async def test_dashboard_metrics(self):
        """Test Scenario 3: Dashboard Analytics"""
        logger.info("\n" + "="*60)
        logger.info("🧪 TEST SCENARIO 3: Dashboard Analytics")
        logger.info("="*60)
        
        try:
            start_time = time.time()
            
            url = f"{BASE_URL}/dashboard/overview?user_id={TEST_USER_ID}"
            logger.info(f"📤 GET {url}")
            
            async with self.session.get(url) as response:
                response_time = time.time() - start_time
                status_code = response.status
                response_data = await response.json()
                
                logger.info(f"📥 Response Status: {status_code}")
                logger.info(f"⏱️  Response Time: {response_time:.2f}s")
                logger.info(f"📄 Response Data: {json.dumps(response_data, indent=2)}")
                
                # Validation checks
                validation_results = {
                    "status_200": status_code == 200,
                    "has_active_assessments": "active_assessments" in response_data,
                    "has_completed_assessments": "completed_assessments" in response_data,
                    "has_avg_score": "avg_score" in response_data,
                    "has_improvement": "improvement" in response_data,
                    "has_skill_progress": "skill_progress" in response_data and isinstance(response_data.get("skill_progress"), list),
                    "has_ai_feedback": "ai_feedback" in response_data and isinstance(response_data.get("ai_feedback"), list),
                    "completed_count_positive": response_data.get("completed_assessments", 0) >= 1,
                    "active_assessments_zero": response_data.get("active_assessments", -1) == 0,
                    "avg_score_reasonable": 0 <= response_data.get("avg_score", -1) <= 100,
                    "response_time_acceptable": response_time < 5.0
                }
                
                # Log validation results
                logger.info("\n🔍 VALIDATION RESULTS:")
                for check, passed in validation_results.items():
                    status = "✅ PASS" if passed else "❌ FAIL"
                    logger.info(f"  {check}: {status}")
                
                # Overall test result
                all_passed = all(validation_results.values())
                self.test_results["dashboard_metrics"] = {
                    "status": "PASS" if all_passed else "FAIL",
                    "details": {
                        "response_code": status_code,
                        "response_time": response_time,
                        "validation_checks": validation_results,
                        "metrics": response_data
                    }
                }
                
                if all_passed:
                    logger.info("🎉 TEST SCENARIO 3: PASSED")
                else:
                    logger.error("💥 TEST SCENARIO 3: FAILED")
                    
        except Exception as e:
            logger.error(f"💥 TEST SCENARIO 3 ERROR: {str(e)}")
            self.test_results["dashboard_metrics"] = {
                "status": "ERROR",
                "details": {"error": str(e)}
            }
    
    async def test_improvement_tracking(self):
        """Test Scenario 4: Multiple Assessment Flow (Improvement Tracking)"""
        logger.info("\n" + "="*60)
        logger.info("🧪 TEST SCENARIO 4: Azure ML Improvement Tracking")
        logger.info("="*60)
        
        try:
            # Step 1: Start new assessment
            logger.info("📝 Step 1: Starting second assessment...")
            payload1 = {
                "assessment_id": "frontend-engineering",
                "user_id": TEST_USER_ID
            }
            
            async with self.session.post(f"{BASE_URL}/assessments/start", json=payload1) as response:
                if response.status != 200:
                    raise Exception(f"Failed to start second assessment: {response.status}")
                data = await response.json()
                second_session_id = data["session_id"]
                logger.info(f"✅ Second session created: {second_session_id}")
            
            # Step 2: Submit with better response
            logger.info("📤 Step 2: Submitting improved response...")
            payload2 = {
                "session_id": second_session_id,
                "user_id": TEST_USER_ID,
                "user_response": "I would architect a comprehensive React dashboard solution using modern best practices. Starting with TypeScript for type safety, I'd implement a component-based architecture with custom hooks for state management and API calls. The layout would use CSS Grid with Flexbox for responsive design, incorporating CSS-in-JS with styled-components for maintainable styling. Performance optimizations include React.memo, useMemo, useCallback, and lazy loading with React.Suspense. I'd implement a robust error boundary system, comprehensive accessibility with ARIA attributes and keyboard navigation, internationalization support, and a complete testing suite with Jest, React Testing Library, and Cypress for E2E testing. The dashboard would feature real-time data updates using WebSockets, advanced filtering and sorting capabilities, and a plugin architecture for extensibility.",
                "time_spent_minutes": 45
            }
            
            start_time = time.time()
            async with self.session.post(f"{BASE_URL}/assessments/submit", json=payload2) as response:
                response_time = time.time() - start_time
                status_code = response.status
                response_data = await response.json()
                
                logger.info(f"📥 Response Status: {status_code}")
                logger.info(f"⏱️  Response Time: {response_time:.2f}s")
                logger.info(f"📄 Response Data: {json.dumps(response_data, indent=2)}")
                
                # Step 3: Check dashboard for improvement
                logger.info("📊 Step 3: Checking dashboard for improvement tracking...")
                await asyncio.sleep(1)  # Brief pause for data consistency
                
                async with self.session.get(f"{BASE_URL}/dashboard/overview?user_id={TEST_USER_ID}") as dashboard_response:
                    dashboard_data = await dashboard_response.json()
                    logger.info(f"📊 Dashboard Data: {json.dumps(dashboard_data, indent=2)}")
                
                # Validation checks
                validation_results = {
                    "status_200": status_code == 200,
                    "has_improvement_delta": "improvement_delta" in response_data,
                    "improvement_delta_positive": response_data.get("improvement_delta", 0) > 0,
                    "dashboard_shows_multiple_completed": dashboard_data.get("completed_assessments", 0) >= 2,
                    "dashboard_shows_improvement": dashboard_data.get("improvement", 0) != 0,
                    "skill_progress_exists": len(dashboard_data.get("skill_progress", [])) > 0,
                    "response_time_acceptable": response_time < 10.0
                }
                
                # Log validation results
                logger.info("\n🔍 VALIDATION RESULTS:")
                for check, passed in validation_results.items():
                    status = "✅ PASS" if passed else "❌ FAIL"
                    logger.info(f"  {check}: {status}")
                
                # Overall test result
                all_passed = all(validation_results.values())
                self.test_results["improvement_tracking"] = {
                    "status": "PASS" if all_passed else "FAIL",
                    "details": {
                        "response_code": status_code,
                        "response_time": response_time,
                        "validation_checks": validation_results,
                        "improvement_delta": response_data.get("improvement_delta"),
                        "dashboard_improvement": dashboard_data.get("improvement"),
                        "completed_count": dashboard_data.get("completed_assessments")
                    }
                }
                
                if all_passed:
                    logger.info("🎉 TEST SCENARIO 4: PASSED")
                else:
                    logger.error("💥 TEST SCENARIO 4: FAILED")
                    
        except Exception as e:
            logger.error(f"💥 TEST SCENARIO 4 ERROR: {str(e)}")
            self.test_results["improvement_tracking"] = {
                "status": "ERROR",
                "details": {"error": str(e)}
            }
    
    async def test_error_scenarios(self):
        """Test Error Scenarios"""
        logger.info("\n" + "="*60)
        logger.info("🧪 TEST SCENARIO 5: Error Handling")
        logger.info("="*60)
        
        error_tests = {
            "invalid_session_id": {"expected_status": 404, "passed": False},
            "invalid_assessment_id": {"expected_status": 404, "passed": False},
            "resubmit_completed": {"expected_status": 400, "passed": False}
        }
        
        try:
            # Test 1: Invalid session_id
            logger.info("🔍 Testing invalid session_id...")
            payload = {
                "session_id": "invalid-session-id",
                "user_id": TEST_USER_ID,
                "user_response": "Test response",
                "time_spent_minutes": 30
            }
            
            async with self.session.post(f"{BASE_URL}/assessments/submit", json=payload) as response:
                status = response.status
                logger.info(f"Invalid session_id test: {status} (expected 404)")
                error_tests["invalid_session_id"]["passed"] = status == 404
            
            # Test 2: Invalid assessment_id
            logger.info("🔍 Testing invalid assessment_id...")
            payload = {
                "assessment_id": "invalid-assessment",
                "user_id": TEST_USER_ID
            }
            
            async with self.session.post(f"{BASE_URL}/assessments/start", json=payload) as response:
                status = response.status
                logger.info(f"Invalid assessment_id test: {status} (expected 404)")
                error_tests["invalid_assessment_id"]["passed"] = status == 404
            
            # Test 3: Resubmit completed session (if we have a valid session)
            if self.session_id:
                logger.info("🔍 Testing resubmit completed session...")
                payload = {
                    "session_id": self.session_id,
                    "user_id": TEST_USER_ID,
                    "user_response": "Another response",
                    "time_spent_minutes": 20
                }
                
                async with self.session.post(f"{BASE_URL}/assessments/submit", json=payload) as response:
                    status = response.status
                    logger.info(f"Resubmit completed test: {status} (expected 400)")
                    error_tests["resubmit_completed"]["passed"] = status == 400
            
            # Overall error handling result
            all_error_tests_passed = all(test["passed"] for test in error_tests.values())
            self.test_results["error_scenarios"] = {
                "status": "PASS" if all_error_tests_passed else "FAIL",
                "details": error_tests
            }
            
            if all_error_tests_passed:
                logger.info("🎉 TEST SCENARIO 5: PASSED")
            else:
                logger.error("💥 TEST SCENARIO 5: FAILED")
                
        except Exception as e:
            logger.error(f"💥 TEST SCENARIO 5 ERROR: {str(e)}")
            self.test_results["error_scenarios"] = {
                "status": "ERROR",
                "details": {"error": str(e)}
            }
    
    async def run_all_tests(self):
        """Run all test scenarios"""
        await self.setup()
        
        try:
            # Run tests in sequence
            await self.test_scenario_generation()
            await self.test_assessment_evaluation()
            await self.test_dashboard_metrics()
            await self.test_improvement_tracking()
            await self.test_error_scenarios()
            
            # Generate final report
            self.generate_final_report()
            
        finally:
            await self.cleanup()
    
    def generate_final_report(self):
        """Generate comprehensive test report"""
        logger.info("\n" + "="*80)
        logger.info("📊 FINAL TEST REPORT - SkillSphere Backend Validation")
        logger.info("="*80)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results.values() if result["status"] == "PASS")
        failed_tests = sum(1 for result in self.test_results.values() if result["status"] == "FAIL")
        error_tests = sum(1 for result in self.test_results.values() if result["status"] == "ERROR")
        
        logger.info(f"📈 SUMMARY: {passed_tests}/{total_tests} tests passed")
        logger.info(f"✅ Passed: {passed_tests}")
        logger.info(f"❌ Failed: {failed_tests}")
        logger.info(f"💥 Errors: {error_tests}")
        
        logger.info("\n📋 DETAILED RESULTS:")
        for test_name, result in self.test_results.items():
            status_emoji = {"PASS": "✅", "FAIL": "❌", "ERROR": "💥", "SKIP": "⏭️"}
            emoji = status_emoji.get(result["status"], "❓")
            logger.info(f"  {emoji} {test_name.replace('_', ' ').title()}: {result['status']}")
        
        # Azure AI Integration Verification
        logger.info("\n🤖 AZURE AI INTEGRATION STATUS:")
        scenario_gen_working = self.test_results["scenario_generation"]["status"] == "PASS"
        evaluation_working = self.test_results["assessment_evaluation"]["status"] == "PASS"
        
        if scenario_gen_working and evaluation_working:
            logger.info("✅ Azure OpenAI integration: CONFIRMED WORKING")
            logger.info("✅ Dynamic content generation: VERIFIED")
            logger.info("✅ AI evaluation system: OPERATIONAL")
        else:
            logger.info("❌ Azure OpenAI integration: ISSUES DETECTED")
        
        # Azure ML Analytics Verification
        analytics_working = self.test_results["dashboard_metrics"]["status"] == "PASS"
        improvement_working = self.test_results["improvement_tracking"]["status"] == "PASS"
        
        if analytics_working and improvement_working:
            logger.info("✅ Azure ML analytics: CONFIRMED WORKING")
            logger.info("✅ Improvement tracking: OPERATIONAL")
        else:
            logger.info("❌ Azure ML analytics: ISSUES DETECTED")
        
        logger.info("\n🎯 SUCCESS CRITERIA EVALUATION:")
        criteria = {
            "All 3 core endpoints return valid responses": passed_tests >= 3,
            "Azure OpenAI integration confirmed": scenario_gen_working and evaluation_working,
            "Analytics calculations work correctly": analytics_working,
            "Improvement tracking demonstrates Azure ML": improvement_working,
            "Error handling works correctly": self.test_results["error_scenarios"]["status"] == "PASS"
        }
        
        for criterion, met in criteria.items():
            status = "✅ MET" if met else "❌ NOT MET"
            logger.info(f"  {status}: {criterion}")
        
        overall_success = all(criteria.values())
        logger.info(f"\n🏆 OVERALL RESULT: {'SUCCESS' if overall_success else 'NEEDS ATTENTION'}")
        
        if overall_success:
            logger.info("🎉 SkillSphere backend is ready for hackathon demonstration!")
        else:
            logger.info("⚠️  Some issues need to be addressed before demo")
        
        logger.info("="*80)

async def main():
    """Main test execution"""
    tester = SkillSphereBackendTester()
    await tester.run_all_tests()

if __name__ == "__main__":
    asyncio.run(main())