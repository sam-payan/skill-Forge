import { Check, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Phase {
  id: number;
  name: string;
  status: "completed" | "active" | "locked";
  tasks: number;
  completedTasks: number;
}

interface RoadmapProgressProps {
  phases: Phase[];
}

const RoadmapProgress = ({ phases }: RoadmapProgressProps) => {
  return (
    <div className="card-elevated p-4 sm:p-6 animate-fade-in w-full" style={{ animationDelay: "0.2s" }}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground text-sm sm:text-base">
            Roadmap Progress
          </h3>
          <p className="text-xs text-muted-foreground">
            Your learning journey
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs self-start sm:self-auto"
        >
          View Full Roadmap
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-5">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative">
            {index < phases.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-9 w-0.5 h-10 sm:h-8",
                  phase.status === "completed" ? "bg-success" : "bg-border"
                )}
              />
            )}

            <div className="flex gap-3 sm:gap-4">
              <div
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                  phase.status === "completed" && "bg-success text-success-foreground",
                  phase.status === "active" && "bg-primary text-primary-foreground animate-pulse-glow",
                  phase.status === "locked" && "bg-muted text-muted-foreground border border-border"
                )}
              >
                {phase.status === "completed" ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : phase.status === "locked" ? (
                  <Lock className="w-3 h-3" />
                ) : (
                  <span className="text-[10px] sm:text-xs font-bold">
                    {phase.id}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h4
                    className={cn(
                      "font-medium text-sm truncate",
                      phase.status === "locked"
                        ? "text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    {phase.name}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {phase.completedTasks}/{phase.tasks} tasks
                  </span>
                </div>

                {phase.status !== "locked" && (
                  <div className="mt-2">
                    <div className="progress-bar h-1.5 w-full">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          phase.status === "completed"
                            ? "bg-success"
                            : "bg-gradient-to-r from-primary to-accent"
                        )}
                        style={{
                          width: `${(phase.completedTasks / phase.tasks) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapProgress;
