import { useNavigate } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  Target,
  Brain,
  TrendingUp,
  Users,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";


const features = [
  {
    icon: Target,
    title: "Structured Roadmaps",
    description: "Clear, phase-based learning paths that take you from beginner to job-ready",
  },
  {
    icon: Brain,
    title: "AI-Powered Mentorship",
    description: "Get personalized guidance from an AI coach that adapts to your learning style",
  },
  {
    icon: BarChart3,
    title: "Real-Time Assessment",
    description: "Continuous skill evaluation with detailed feedback and improvement tracking",
  },
  {
    icon: Shield,
    title: "Recruiter Verification",
    description: "Skill reports that hiring managers trust for candidate evaluation",
  },
];

const stats = [
  { value: "92%", label: "Success Rate" },
  { value: "15K+", label: "Active Learners" },
  { value: "200+", label: "Partner Companies" },
  { value: "4.9/5", label: "Satisfaction Score" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">SkillForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Sign In
            </Button>
            <Button variant="hero" onClick={() => navigate("/onboarding")} className="gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              AI-Powered Learning Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-slide-up">
              Transform Into a{" "}
              <span className="text-gradient">Job-Ready</span> Professional
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Structured roadmaps, continuous assessments, and AI mentorship that evolve with you.
              Stop learning randomly — start progressing systematically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/onboarding")}
                className="gap-2 w-full sm:w-auto"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto"
              >
                View Demo Dashboard
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete learning operating system designed for real career outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-interactive p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Path to Mastery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systematic approach that keeps you accountable and progressing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Personalized Onboarding",
                description: "Tell us your goals, current skills, and time commitment. We'll create a custom roadmap.",
              },
              {
                step: "02",
                title: "Learn & Execute",
                description: "Work through structured tasks with real-time AI guidance and feedback.",
              },
              {
                step: "03",
                title: "Assess & Grow",
                description: "Regular assessments track your progress and adapt your learning path.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-sidebar">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-sidebar-accent-foreground mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-lg text-sidebar-foreground mb-8">
            Join thousands of learners who transformed their careers with SkillForge
          </p>
          <Button
            variant="hero"
            size="xl"
            onClick={() => navigate("/onboarding")}
            className="gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">SkillForge</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SkillForge. Transform your career with structured learning.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
