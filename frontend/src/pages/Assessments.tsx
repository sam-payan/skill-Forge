import { Clock, Award, TrendingUp, Play, Lock, CheckCircle2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Assessment {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  skills: string[];
  status: "available" | "completed" | "locked";
  score?: number;
}


const assessments: Assessment[] = [
  {
    id: "1",
    title: "React Component Architecture",
    description: "Design and implement a scalable component structure for a dashboard application",
    difficulty: "Intermediate",
    duration: "45 min",
    skills: ["React", "TypeScript", "Component Design"],
    status: "completed",
    score: 87,
  },
  {
    id: "2",
    title: "State Management Challenge",
    description: "Solve complex state management scenarios using React hooks and context",
    difficulty: "Intermediate",
    duration: "30 min",
    skills: ["React Hooks", "State Management"],
    status: "available",
  },
  {
    id: "3",
    title: "API Integration Scenario",
    description: "Build a data fetching layer with error handling and caching strategies",
    difficulty: "Advanced",
    duration: "60 min",
    skills: ["REST APIs", "Error Handling", "Caching"],
    status: "available",
  },
  {
    id: "4",
    title: "Performance Optimization",
    description: "Identify and fix performance bottlenecks in a React application",
    difficulty: "Advanced",
    duration: "45 min",
    skills: ["React", "Performance", "Debugging"],
    status: "locked",
  },
];

const difficultyColors = {
  Beginner: "bg-success-muted text-success",
  Intermediate: "bg-warning-muted text-warning",
  Advanced: "bg-destructive/10 text-destructive",
};

const Assessments = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Skill Assessments</h1>
            <p className="text-sm text-muted-foreground">
              Test your knowledge with scenario-based challenges
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">3 Completed</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="px-8 py-6 border-b border-border bg-card">
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-2xl font-bold text-foreground">85%</p>
            <p className="text-sm text-muted-foreground">Avg. Score</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-2xl font-bold text-foreground">2</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <p className="text-2xl font-bold text-foreground">+12%</p>
            </div>
            <p className="text-sm text-muted-foreground">Improvement</p>
          </div>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assessments.map((assessment, index) => (
            <div
              key={assessment.id}
              className={cn(
                "card-elevated p-6 animate-fade-in",
                assessment.status === "locked" && "opacity-60"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      assessment.status === "completed"
                        ? "bg-success text-success-foreground"
                        : assessment.status === "locked"
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {assessment.status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : assessment.status === "locked" ? (
                      <Lock className="w-5 h-5" />
                    ) : (
                      <Award className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{assessment.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          difficultyColors[assessment.difficulty]
                        )}
                      >
                        {assessment.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{assessment.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {assessment.score && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">{assessment.score}%</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4">{assessment.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {assessment.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                {assessment.status === "completed" ? (
                  <Button variant="outline" className="gap-2">
                    View Results
                  </Button>
                ) : assessment.status === "locked" ? (
                  <Button variant="secondary" disabled className="gap-2">
                    <Lock className="w-4 h-4" />
                    Complete Previous
                  </Button>
                ) : (
                  <Button variant="hero" className="gap-2">
                    <Play className="w-4 h-4" />
                    Start Assessment
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Assessments;
