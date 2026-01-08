import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {Link} from "react-router-dom";
import { Progress } from '../components/ui/progress';
import { Brain, Target, TrendingUp, Shield, Zap, CheckCircle2, Clock, BarChart3, Award, Code2, Database, Layers, ArrowRight, ChevronRight } from 'lucide-react';
import { assessments, dashboardData, techFeatures, comparisons } from '../mock';

const Home = () => {
  return (
    <div className="home-container">
      {/* Header Navigation */}
      <header className="site-header">
        <div className="header-content">
          <div className="logo">
            <Brain className="logo-icon" />
            <span className="logo-text">SkillForge</span>
          </div>
          <nav className="main-nav">
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#assessments" className="nav-link">Assessments</a>
            <a href="#dashboard" className="nav-link">Dashboard</a>
            <a href="#technology" className="nav-link">Technology</a>
          </nav>
          <Link to="login">
            <Button className="cta-button">Get started!</Button>
          </Link>
          
        </div>  
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <Badge className="hero-badge" variant="outline">
            <Zap className="badge-icon" />
            Powered by Azure OpenAI & Machine Learning
          </Badge>
          <h1 className="hero-title">
            Build skills. Prove expertise.
            <br />
            <span className="hero-gradient">Get job-ready.</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered skill assessment platform that evaluates real-world abilities through
            scenario-driven challenges. Focus on execution, problem-solving, and measurable career readiness.
          </p>
          <div className="hero-cta-group">
            <Button size="lg" className="hero-primary-cta">
              Start Skill Assessment
              <ArrowRight className="cta-icon" />
            </Button>
            <Button size="lg" variant="outline" className="hero-secondary-cta">
              View AI Dashboard
            </Button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Assessments Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">Skill Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">AI-First</div>
              <div className="stat-label">Azure-Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="highlights-section">
        <div className="highlights-grid">
          <Card className="highlight-card">
            <CardHeader>
              <Brain className="highlight-icon" />
              <CardTitle>Azure OpenAI Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Intelligent scenario-based challenges powered by Azure OpenAI Service with adaptive questioning.</p>
            </CardContent>
          </Card>
          <Card className="highlight-card">
            <CardHeader>
              <Target className="highlight-icon" />
              <CardTitle>Personalized Skill Roadmaps</CardTitle>
            </CardHeader>
            <CardContent>
              <p>AI-driven learning paths tailored to your strengths, weaknesses, and career goals.</p>
            </CardContent>
          </Card>
          <Card className="highlight-card">
            <CardHeader>
              <TrendingUp className="highlight-icon" />
              <CardTitle>Azure ML Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Advanced performance tracking and skill progression modeling with Azure Machine Learning.</p>
            </CardContent>
          </Card>
          <Card className="highlight-card">
            <CardHeader>
              <Shield className="highlight-icon" />
              <CardTitle>Job-Ready Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Measurable skill verification that employers trust, not just passive completion certificates.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-header">
          <h2 className="section-title">How SkillForge Works</h2>
          <p className="section-subtitle">Five steps to validated, job-ready skills</p>
        </div>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3 className="step-title">Select Your Domain</h3>
              <p className="step-description">
                Choose from frontend, backend, system design, and more specialized skill tracks.
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3 className="step-title">Azure OpenAI Generates Scenarios</h3>
              <p className="step-description">
                Personalized assessment scenarios are created based on your profile and skill level.
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3 className="step-title">Solve Real-World Challenges</h3>
              <p className="step-description">
                Work through practical problems that mirror actual job requirements and workflows.
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3 className="step-title">Azure ML Analyzes Performance</h3>
              <p className="step-description">
                Machine learning models track trends, predict readiness, and identify improvement areas.
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">05</div>
            <div className="step-content">
              <h3 className="step-title">Validate Your Readiness</h3>
              <p className="step-description">
                Receive measurable outcomes and AI-verified skill certifications employers recognize.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assessments Overview */}
      <section id="assessments" className="assessments-section">
        <div className="section-header">
          <h2 className="section-title">Skill Assessments</h2>
          <p className="section-subtitle">Real-world challenges. AI-powered evaluation.</p>
        </div>
        <div className="assessments-grid">
          {assessments.map((assessment, index) => (
            <Card key={index} className="assessment-card">
              <CardHeader>
                <div className="assessment-header">
                  <div className="assessment-icon">{assessment.icon}</div>
                  <Badge variant={assessment.difficulty === 'Advanced' ? 'destructive' : assessment.difficulty === 'Intermediate' ? 'default' : 'secondary'}>
                    {assessment.difficulty}
                  </Badge>
                </div>
                <CardTitle>{assessment.title}</CardTitle>
                <CardDescription>{assessment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="assessment-meta">
                  <div className="meta-item">
                    <Clock className="meta-icon" />
                    <span>{assessment.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Target className="meta-icon" />
                    <span>{assessment.skillsCount} skills</span>
                  </div>
                </div>
                <div className="assessment-skills">
                  {assessment.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="skill-badge">{skill}</Badge>
                  ))}
                </div>
                <div className="assessment-ai-tag">
                  <Brain className="ai-icon" />
                  <span>AI Evaluation: {assessment.aiMethod}</span>
                </div>
                <Link to="login">                <Button className="assessment-cta" variant="outline">
                  Start Assessment
                  <ChevronRight className="button-icon" />
                </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Your AI-Powered Dashboard</h2>
          <p className="section-subtitle">Track progress. Analyze trends. Optimize learning with Azure Machine Learning.</p>
        </div>
        <Card className="dashboard-preview-card">
          <CardContent className="dashboard-content">
            <div className="dashboard-grid">
              {/* Stats Overview */}
              <div className="dashboard-stats">
                <Card className="stat-card">
                  <CardHeader>
                    <CardDescription>Active Assessments</CardDescription>
                    <CardTitle className="stat-number">{dashboardData.activeAssessments}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="stat-card">
                  <CardHeader>
                    <CardDescription>Completed</CardDescription>
                    <CardTitle className="stat-number">{dashboardData.completedAssessments}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="stat-card">
                  <CardHeader>
                    <CardDescription>Average Score</CardDescription>
                    <CardTitle className="stat-number">{dashboardData.avgScore}%</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="stat-card">
                  <CardHeader>
                    <CardDescription>Improvement</CardDescription>
                    <CardTitle className="stat-number improvement">+{dashboardData.improvement}%</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Skill Progress */}
              <Card className="progress-card">
                <CardHeader>
                  <CardTitle>Skill Progression</CardTitle>
                  <CardDescription>Powered by Azure Machine Learning Analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  {dashboardData.skillProgress.map((skill, index) => (
                    <div key={index} className="skill-progress-item">
                      <div className="progress-header">
                        <span className="progress-label">{skill.name}</span>
                        <span className="progress-value">{skill.score}%</span>
                      </div>
                      <Progress value={skill.score} className="skill-progress-bar" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Feedback */}
              <Card className="feedback-card">
                <CardHeader>
                  <CardTitle>AI-Generated Insights</CardTitle>
                  <CardDescription>Real-time feedback from Azure OpenAI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="feedback-list">
                    {dashboardData.aiFeedback.map((feedback, index) => (
                      <div key={index} className="feedback-item">
                        <CheckCircle2 className="feedback-icon" />
                        <p>{feedback}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technology & AI Stack */}
      <section id="technology" className="technology-section">
        <div className="section-header">
          <h2 className="section-title">Built on Microsoft Azure AI</h2>
          <p className="section-subtitle">Enterprise-grade AI services powering intelligent skill assessment</p>
        </div>
        <div className="tech-content">
          <div className="tech-features">
            {techFeatures.map((feature, index) => (
              <Card key={index} className="tech-card">
                <CardHeader>
                  <div className="tech-icon">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="tech-description">{feature.description}</p>
                  <ul className="tech-list">
                    {feature.capabilities.map((capability, idx) => (
                      <li key={idx}>
                        <CheckCircle2 className="list-icon" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="architecture-card">
            <CardHeader>
              <CardTitle>Secure, Scalable Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Built on Microsoft Cloud infrastructure with:</p>
              <div className="architecture-grid">
                <div className="arch-item">
                  <Layers className="arch-icon" />
                  <span>Azure App Service</span>
                </div>
                <div className="arch-item">
                  <Database className="arch-icon" />
                  <span>Azure Cosmos DB</span>
                </div>
                <div className="arch-item">
                  <Shield className="arch-icon" />
                  <span>Microsoft Entra ID</span>
                </div>
                <div className="arch-item">
                  <BarChart3 className="arch-icon" />
                  <span>Application Insights</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why SkillForge */}
      <section className="comparison-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose SkillForge</h2>
          <p className="section-subtitle">Execution-based validation vs. passive learning</p>
        </div>
        <div className="comparison-grid">
          {comparisons.map((item, index) => (
            <Card key={index} className="comparison-card">
              <CardHeader>
                <div className="comparison-icon">{item.icon}</div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="comparison-content">
                  <div className="comparison-column SkillForge">
                    <h4>SkillForge</h4>
                    <p>{item.SkillForge}</p>
                  </div>
                  <div className="comparison-divider"></div>
                  <div className="comparison-column traditional">
                    <h4>Traditional Platforms</h4>
                    <p>{item.traditional}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="cta-content">
          <Award className="cta-award-icon" />
          <h2 className="cta-title">Ready to Prove Your Skills?</h2>
          <p className="cta-subtitle">
            Join thousands of professionals validating their expertise with AI-powered assessments.
            Build measurable skills that employers recognize.
          </p>
          <div className="cta-buttons">
            <Link to="login">
            <Button size="lg" className="cta-primary">
              Start Assessing Your Skills
              <ArrowRight className="button-icon" />
            </Button>
           </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Brain className="footer-logo-icon" />
              <span>SkillForge</span>
            </div>
            <p className="footer-tagline">Build skills. Prove expertise. Get job-ready.</p>
          </div>
          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><a href="#assessments">Assessments</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#technology">Technology</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 SkillForge. Powered by Microsoft Azure AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;