import { Code2, Database, Layers, Wrench, Zap, CheckCircle2, Target, TrendingUp, Award, Brain, BarChart3 } from 'lucide-react';
import React from 'react';

export const assessments = [
  {
    title: 'Frontend Engineering',
    description: 'Build responsive interfaces with React, optimize performance, and implement modern UI patterns.',
    difficulty: 'Intermediate',
    duration: '45 min',
    skillsCount: 8,
    skills: ['React', 'CSS', 'JavaScript', 'Performance'],
    aiMethod: 'Real-time code analysis',
    icon: <Code2 className="assessment-type-icon" />
  },
  {
    title: 'Backend Development',
    description: 'Design RESTful APIs, implement authentication, and optimize database queries.',
    difficulty: 'Advanced',
    duration: '60 min',
    skillsCount: 10,
    skills: ['Node.js', 'Python', 'API Design', 'Security'],
    aiMethod: 'Architecture evaluation',
    icon: <Database className="assessment-type-icon" />
  },
  {
    title: 'System Design',
    description: 'Architect scalable systems, handle distributed challenges, and optimize for high availability.',
    difficulty: 'Advanced',
    duration: '90 min',
    skillsCount: 12,
    skills: ['Scalability', 'Microservices', 'Caching', 'Load Balancing'],
    aiMethod: 'Design pattern recognition',
    icon: <Layers className="assessment-type-icon" />
  },
  {
    title: 'API Integration',
    description: 'Connect third-party services, handle webhooks, and implement robust error handling.',
    difficulty: 'Intermediate',
    duration: '40 min',
    skillsCount: 6,
    skills: ['REST', 'GraphQL', 'OAuth', 'Webhooks'],
    aiMethod: 'Integration testing',
    icon: <Zap className="assessment-type-icon" />
  },
  {
    title: 'Performance Optimization',
    description: 'Profile applications, reduce load times, and implement caching strategies.',
    difficulty: 'Advanced',
    duration: '50 min',
    skillsCount: 9,
    skills: ['Profiling', 'Caching', 'CDN', 'Lazy Loading'],
    aiMethod: 'Performance metrics analysis',
    icon: <Wrench className="assessment-type-icon" />
  },
  {
    title: 'DevOps & CI/CD',
    description: 'Set up pipelines, automate deployments, and implement monitoring solutions.',
    difficulty: 'Intermediate',
    duration: '55 min',
    skillsCount: 7,
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
    aiMethod: 'Pipeline efficiency scoring',
    icon: <BarChart3 className="assessment-type-icon" />
  }
];

export const dashboardData = {
  activeAssessments: 3,
  completedAssessments: 12,
  avgScore: 87,
  improvement: 23,
  skillProgress: [
    { name: 'Frontend Development', score: 92 },
    { name: 'Backend APIs', score: 85 },
    { name: 'System Design', score: 78 },
    { name: 'Performance Optimization', score: 88 },
    { name: 'DevOps', score: 73 }
  ],
  aiFeedback: [
    'Strong performance in React component optimization - 15% faster than average',
    'API error handling shows production-ready patterns',
    'Consider exploring distributed caching for system design improvement',
    'Your code review skills exceed 85% of peer assessments'
  ]
};

export const techFeatures = [
  {
    title: 'Azure OpenAI Service',
    description: 'Powers intelligent assessment generation and adaptive questioning',
    icon: <Brain className="tech-feature-icon" />,
    capabilities: [
      'Scenario-based challenge creation',
      'Real-time code evaluation logic',
      'Natural language feedback generation',
      'Adaptive difficulty adjustment'
    ]
  },
  {
    title: 'Azure Machine Learning',
    description: 'Tracks performance trends and predicts skill readiness',
    icon: <TrendingUp className="tech-feature-icon" />,
    capabilities: [
      'Skill progression modeling',
      'Performance analytics and insights',
      'Readiness level predictions',
      'Learning path optimization'
    ]
  }
];

export const comparisons = [
  {
    title: 'Assessment Method',
    icon: <Target className="comparison-icon" />,
    skillsphere: 'Real-world scenario challenges with AI-driven evaluation',
    traditional: 'Multiple choice quizzes and video watching'
  },
  {
    title: 'Validation',
    icon: <Award className="comparison-icon" />,
    skillsphere: 'AI-verified skill outcomes with measurable performance data',
    traditional: 'Generic completion certificates without validation'
  },
  {
    title: 'Learning Approach',
    icon: <Brain className="comparison-icon" />,
    skillsphere: 'Execution-based problem solving with instant AI feedback',
    traditional: 'Passive content consumption without practical application'
  },
  {
    title: 'Progress Tracking',
    icon: <BarChart3 className="comparison-icon" />,
    skillsphere: 'Azure ML-powered analytics with predictive insights',
    traditional: 'Basic progress bars and completion percentages'
  }
];