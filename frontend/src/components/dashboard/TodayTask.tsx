import { Clock, ArrowRight, Zap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodayTaskProps {
  task: {
    title: string;
    description: string;
    estimatedTime: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    category: string;
    progress: number;
  };
}

const difficultyColors = {
  Beginner: "bg-success-muted text-success",
  Intermediate: "bg-warning-muted text-warning",
  Advanced: "bg-destructive/10 text-destructive",
};


const TodayTask = ({ task }: TodayTaskProps) => {
  return (
    <div className="card-elevated p-6 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Today's Focus</h3>
            <p className="text-xs text-muted-foreground">Your priority task</p>
          </div>
        </div>
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", difficultyColors[task.difficulty])}>
          {task.difficulty}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-foreground mb-1">{task.title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{task.estimatedTime}</span>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
          {task.category}
        </div>
      </div>

      {task.progress > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium text-foreground">{task.progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${task.progress}%` }} />
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="hero" className="flex-1 gap-2">
          <Play className="w-4 h-4" />
          {task.progress > 0 ? "Continue" : "Start Task"}
        </Button>
        <Button variant="outline" size="icon">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TodayTask;
