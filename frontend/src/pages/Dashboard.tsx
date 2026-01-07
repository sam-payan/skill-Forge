import { Bell, Search, User } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TodayTask from "@/components/dashboard/TodayTask";
import SkillRadar from "@/components/dashboard/SkillRadar";
import RoadmapProgress from "@/components/dashboard/RoadmapProgress";
import WeeklyStats, { defaultStats } from "@/components/dashboard/WeeklyStats";
import UpcomingTasks, {
  defaultUpcomingTasks,
} from "@/components/dashboard/UpcomingTasks";
import { Button } from "@/components/ui/button";

const todayTask = {
  title: "React State Management Deep Dive",
  description:
    "Learn advanced patterns for managing complex state in React applications using Context API and useReducer hooks.",
  estimatedTime: "45 min",
  difficulty: "Intermediate" as const,
  category: "Frontend",
  progress: 35,
};

const skills = [
  { name: "React", value: 78, fullMark: 100 },
  { name: "Node.js", value: 65, fullMark: 100 },
  { name: "TypeScript", value: 72, fullMark: 100 },
  { name: "Databases", value: 58, fullMark: 100 },
  { name: "System Design", value: 45, fullMark: 100 },
  { name: "DevOps", value: 40, fullMark: 100 },
];

const phases = [
  { id: 1, name: "Foundation", status: "completed" as const, tasks: 8, completedTasks: 8 },
  { id: 2, name: "Applied Skills", status: "active" as const, tasks: 12, completedTasks: 5 },
  { id: 3, name: "Real-World Simulation", status: "locked" as const, tasks: 10, completedTasks: 0 },
  { id: 4, name: "Portfolio & Interview Prep", status: "locked" as const, tasks: 6, completedTasks: 0 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Welcome back, Alex
            </h1>
            <p className="text-sm text-muted-foreground">
              Continue your journey to becoming a Full-Stack Developer
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="
                  w-full
                  sm:w-56
                  pl-9 pr-4 py-2
                  rounded-lg
                  border border-input
                  bg-background
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-ring
                "
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            <Button variant="ghost" size="icon">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <WeeklyStats stats={defaultStats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TodayTask task={todayTask} />
            <RoadmapProgress phases={phases} />
          </div>

          <div className="space-y-6">
            <SkillRadar skills={skills} />
            <UpcomingTasks tasks={defaultUpcomingTasks} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
