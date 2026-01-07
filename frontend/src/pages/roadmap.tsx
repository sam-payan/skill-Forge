import { useNavigate } from "react-router-dom";
import { Filter, Target } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";
import { Button } from "@/components/ui/button";

const milestones = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Master core JavaScript concepts including variables, functions, and async programming",
    phase: "Foundation",
    status: "completed" as const,
    tasks: [
      { id: "1-1", title: "Variables & Data Types", estimatedTime: "30 min", status: "completed" as const },
      { id: "1-2", title: "Functions & Scope", estimatedTime: "45 min", status: "completed" as const },
      { id: "1-3", title: "Arrays & Objects", estimatedTime: "1h", status: "completed" as const },
      { id: "1-4", title: "Async JavaScript", estimatedTime: "1.5h", status: "completed" as const },
    ],
  },
  
  {
    id: "2",
    title: "React Essentials",
    description: "Learn React fundamentals including components, state, props, and hooks",
    phase: "Foundation",
    status: "active" as const,
    tasks: [
      { id: "2-1", title: "Components & JSX", estimatedTime: "45 min", status: "completed" as const },
      { id: "2-2", title: "State & Props", estimatedTime: "1h", status: "completed" as const },
      { id: "2-3", title: "React Hooks Deep Dive", estimatedTime: "1.5h", status: "active" as const },
      { id: "2-4", title: "Context & State Management", estimatedTime: "2h", status: "locked" as const },
    ],
  },
  {
    id: "3",
    title: "Building Real Applications",
    description: "Apply your skills by building complete, production-ready applications",
    phase: "Applied Skills",
    status: "locked" as const,
    tasks: [
      { id: "3-1", title: "Project Setup & Architecture", estimatedTime: "1h", status: "locked" as const },
      { id: "3-2", title: "API Integration", estimatedTime: "2h", status: "locked" as const },
      { id: "3-3", title: "Authentication Implementation", estimatedTime: "2h", status: "locked" as const },
      { id: "3-4", title: "Deployment & CI/CD", estimatedTime: "1.5h", status: "locked" as const },
    ],
  },
  {
    id: "4",
    title: "Backend Development",
    description: "Learn server-side development with Node.js and databases",
    phase: "Applied Skills",
    status: "locked" as const,
    tasks: [
      { id: "4-1", title: "Node.js & Express Basics", estimatedTime: "2h", status: "locked" as const },
      { id: "4-2", title: "Database Design & SQL", estimatedTime: "2.5h", status: "locked" as const },
      { id: "4-3", title: "REST API Development", estimatedTime: "3h", status: "locked" as const },
      { id: "4-4", title: "Authentication & Security", estimatedTime: "2h", status: "locked" as const },
    ],
  },
];

const Roadmap = () => {
  const navigate = useNavigate();

  const handleTaskClick = (taskId: string) => {
    // Navigate to task execution screen
    console.log("Navigate to task:", taskId);
  };

  const completedTasks = milestones.reduce(
    (acc, m) => acc + m.tasks.filter((t) => t.status === "completed").length,
    0
  );
  const totalTasks = milestones.reduce((acc, m) => acc + m.tasks.length, 0);
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your Learning Roadmap</h1>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer Path • {completedTasks}/{totalTasks} tasks completed
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Overview */}
      <div className="px-8 py-6 border-b border-border bg-card">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{progressPercent}%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <div className="progress-bar h-3">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">
                {milestones.filter((m) => m.status === "completed").length}
              </p>
              <p className="text-xs text-muted-foreground">Milestones Done</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{completedTasks}</p>
              <p className="text-xs text-muted-foreground">Tasks Completed</p>
            </div>
            <div>
              <p className="text-lg font-bold text-accent">~12h</p>
              <p className="text-xs text-muted-foreground">Time Remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-8 max-w-4xl">
        <RoadmapTimeline milestones={milestones} onTaskClick={handleTaskClick} />
      </div>
    </DashboardLayout>
  );
};

export default Roadmap;
