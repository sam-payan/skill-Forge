import { useEffect, useState } from "react";
import { Bell, Search, User } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TodayTask from "@/components/dashboard/TodayTask";
import SkillRadar from "@/components/dashboard/SkillRadar";
import RoadmapProgress from "@/components/dashboard/RoadmapProgress";
import WeeklyStats, { defaultStats } from "@/components/dashboard/WeeklyStats";
import UpcomingTasks, { defaultUpcomingTasks } from "@/components/dashboard/UpcomingTasks";

import { getAuth } from "firebase/auth"; // Firebase Auth

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

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email || "Learner"); // fallback if email not present
    }
  }, []);

  return (
    <DashboardLayout>
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white">
              Welcome back, {userEmail}
            </h1>
            <p className="text-sm text-zinc-400 max-w-md">
              Continue your journey to becoming a Full-Stack Developer
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-md bg-zinc-900 border border-zinc-800 pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* NOTIFICATION */}
            <button className="relative p-2 rounded-md hover:bg-zinc-800 transition">
              <Bell className="w-5 h-5 text-zinc-300" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {/* PROFILE */}
            <button className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {/* STATS */}
        <div className="mb-6">
          <WeeklyStats stats={defaultStats} />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <TodayTask task={todayTask} />
            <RoadmapProgress phases={phases} />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">
            <SkillRadar skills={skills} />
            <UpcomingTasks tasks={defaultUpcomingTasks} />
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}