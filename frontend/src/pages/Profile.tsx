import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Award,
  Download,
  Eye,
  Shield,
  TrendingUp,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseconfig";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

const skillScores = [
  { skill: "React", score: 78, change: +12 },
  { skill: "Node.js", score: 65, change: +8 },
  { skill: "TypeScript", score: 72, change: +15 },
  { skill: "Databases", score: 58, change: +5 },
  { skill: "System Design", score: 45, change: +10 },
  { skill: "DevOps", score: 40, change: +3 },
];

const progressData = [
  { month: "Jan", score: 35 },
  { month: "Feb", score: 42 },
  { month: "Mar", score: 48 },
  { month: "Apr", score: 55 },
  { month: "May", score: 62 },
  { month: "Jun", score: 68 },
];

const achievements = [
  {
    id: "1",
    title: "First Milestone",
    description: "Completed your first learning milestone",
    date: "Jan 15",
    icon: Award,
  },
  {
    id: "2",
    title: "Week Streak",
    description: "Maintained a 7-day learning streak",
    date: "Feb 3",
    icon: Calendar,
  },
  {
    id: "3",
    title: "React Mastery",
    description: "Achieved 75%+ in React assessments",
    date: "Mar 20",
    icon: CheckCircle2,
  },
];

const Profile = () => {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "User");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <DashboardLayout>
      <header className="px-8 py-6 border-b border-border bg-card">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
              {username.charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {username}
              </h1>
              <p className="text-muted-foreground">
                Full-Stack Developer Path
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="badge-primary">Level 12</span>
                <span className="text-sm text-muted-foreground">
                  Joined January 2024
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Recruiter View
            </Button>
            <Button variant="hero" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card-elevated p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">
                  Skill Confidence Scores
                </h3>
                <p className="text-sm text-muted-foreground">
                  Based on assessments and task completion
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success font-medium">
                  +53 pts this month
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {skillScores.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">
                      {skill.skill}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {skill.score}%
                    </span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 card-elevated p-6">
            <h3 className="font-semibold text-foreground mb-4">
              Progress Over Time
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
