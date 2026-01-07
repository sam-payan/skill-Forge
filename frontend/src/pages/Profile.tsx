import {
  BarChart,
  Bar,
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
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


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
  { id: "1", title: "First Milestone", description: "Completed your first learning milestone", date: "Jan 15", icon: Award },
  { id: "2", title: "Week Streak", description: "Maintained a 7-day learning streak", date: "Feb 3", icon: Calendar },
  { id: "3", title: "React Mastery", description: "Achieved 75%+ in React assessments", date: "Mar 20", icon: CheckCircle2 },
];

const Profile = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <header className="px-8 py-6 border-b border-border bg-card">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
              A
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Alex Johnson</h1>
              <p className="text-muted-foreground">Full-Stack Developer Path</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="badge-primary">Level 12</span>
                <span className="text-sm text-muted-foreground">Joined January 2024</span>
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
          {/* Skill Confidence Scores */}
          <div className="lg:col-span-2 card-elevated p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Skill Confidence Scores</h3>
                <p className="text-sm text-muted-foreground">Based on assessments and task completion</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success font-medium">+53 pts this month</span>
              </div>
            </div>

            <div className="space-y-4">
              {skillScores.map((skill, index) => (
                <div
                  key={skill.skill}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{skill.score}%</span>
                      <span className="text-xs text-success">+{skill.change}</span>
                    </div>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certification Status */}
          <div className="card-elevated p-6">
            <h3 className="font-semibold text-foreground mb-4">Certification Readiness</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-warning-muted border border-warning/20">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-warning" />
                  <span className="font-medium text-foreground">React Developer</span>
                </div>
                <div className="progress-bar h-2 mb-2">
                  <div className="h-full bg-warning rounded-full" style={{ width: "72%" }} />
                </div>
                <p className="text-xs text-muted-foreground">72% ready • 3 topics remaining</p>
              </div>

              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Full-Stack Developer</span>
                </div>
                <div className="progress-bar h-2 mb-2">
                  <div className="h-full bg-muted-foreground rounded-full" style={{ width: "45%" }} />
                </div>
                <p className="text-xs text-muted-foreground">45% ready • In progress</p>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Certifications
            </Button>
          </div>

          {/* Progress Chart */}
          <div className="lg:col-span-2 card-elevated p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-foreground">Progress Over Time</h3>
              <p className="text-sm text-muted-foreground">Your skill growth trajectory</p>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Achievements */}
          <div className="card-elevated p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Achievements</h3>

            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <achievement.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4 text-sm">
              View All Achievements
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
