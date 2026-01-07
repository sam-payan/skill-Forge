import { TrendingUp, Clock, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

interface WeeklyStatsProps {
  stats: Stat[];
}


const WeeklyStats = ({ stats }: WeeklyStatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="card-elevated p-4 animate-fade-in"
          style={{ animationDelay: `${0.05 * index}s` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              {stat.icon}
            </div>
            {stat.change && (
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  stat.changeType === "positive" && "bg-success-muted text-success",
                  stat.changeType === "negative" && "bg-destructive/10 text-destructive",
                  stat.changeType === "neutral" && "bg-secondary text-muted-foreground"
                )}
              >
                {stat.change}
              </span>
            )}
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyStats;

export const defaultStats: Stat[] = [
  {
    label: "Tasks Completed",
    value: "12",
    change: "+3 this week",
    changeType: "positive",
    icon: <Target className="w-5 h-5 text-primary" />,
  },
  {
    label: "Hours Learned",
    value: "8.5h",
    change: "+2.5h",
    changeType: "positive",
    icon: <Clock className="w-5 h-5 text-primary" />,
  },
  {
    label: "Current Streak",
    value: "5 days",
    change: "Personal best!",
    changeType: "positive",
    icon: <Flame className="w-5 h-5 text-primary" />,
  },
  {
    label: "Skill Growth",
    value: "+15%",
    change: "This month",
    changeType: "neutral",
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
  },
];
