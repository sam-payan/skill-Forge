import { Check, Lock, ChevronRight, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  estimatedTime: string;
  status: "completed" | "active" | "locked";
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  phase: string;
  status: "completed" | "active" | "locked";
  tasks: Task[];
}

interface RoadmapTimelineProps {
  milestones: Milestone[];
  onTaskClick: (taskId: string) => void;
}

const RoadmapTimeline = ({ milestones, onTaskClick }: RoadmapTimelineProps) => {
  return (
    <div className="space-y-6">
      {milestones.map((milestone, index) => (
        <div
          key={milestone.id}
          className="relative animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Connection Line */}
          {index < milestones.length - 1 && (
            <div
              className={cn(
                "absolute left-6 top-16 w-0.5 h-[calc(100%-2rem)]",
                milestone.status === "completed" ? "bg-success" : "bg-border"
              )}
            />
          )}

          {/* Milestone Card */}
          <div
            className={cn(
              "card-elevated p-6 transition-all duration-300",
              milestone.status === "active" && "ring-2 ring-primary/50 shadow-glow"
            )}
          >
            <div className="flex items-start gap-4">
              {/* Status Indicator */}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                  milestone.status === "completed" && "bg-success text-success-foreground",
                  milestone.status === "active" && "bg-primary text-primary-foreground animate-pulse-glow",
                  milestone.status === "locked" && "bg-muted text-muted-foreground"
                )}
              >
                {milestone.status === "completed" ? (
                  <Check className="w-6 h-6" />
                ) : milestone.status === "locked" ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <BookOpen className="w-5 h-5" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {milestone.phase}
                    </span>
                    <h3
                      className={cn(
                        "font-semibold text-lg",
                        milestone.status === "locked" ? "text-muted-foreground" : "text-foreground"
                      )}
                    >
                      {milestone.title}
                    </h3>
                  </div>
                  {milestone.status === "active" && (
                    <Button size="sm" variant="hero" className="shrink-0">
                      Continue
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{milestone.description}</p>

                {/* Tasks */}
                {milestone.status !== "locked" && (
                  <div className="space-y-2">
                    {milestone.tasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => onTaskClick(task.id)}
                        disabled={task.status === "locked"}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group",
                          task.status === "completed" && "bg-success-muted",
                          task.status === "active" && "bg-primary/5 hover:bg-primary/10",
                          task.status === "locked" && "bg-muted cursor-not-allowed opacity-60"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center",
                              task.status === "completed" && "bg-success text-success-foreground",
                              task.status === "active" && "bg-primary/20 text-primary",
                              task.status === "locked" && "bg-muted-foreground/20 text-muted-foreground"
                            )}
                          >
                            {task.status === "completed" ? (
                              <Check className="w-3 h-3" />
                            ) : task.status === "locked" ? (
                              <Lock className="w-3 h-3" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              task.status === "completed" && "text-success line-through",
                              task.status === "active" && "text-foreground group-hover:text-primary",
                              task.status === "locked" && "text-muted-foreground"
                            )}
                          >
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{task.estimatedTime}</span>
                          </div>
                          {task.status === "active" && (
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {milestone.status === "locked" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Complete previous milestone to unlock</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapTimeline;
