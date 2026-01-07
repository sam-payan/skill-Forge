import { Calendar, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  estimatedTime: string;
  priority: "high" | "medium" | "low";
  category: string;
}

interface UpcomingTasksProps {
  tasks: Task[];
}

const priorityStyles = {
  high: "border-l-destructive",
  medium: "border-l-warning",
  low: "border-l-success",
};


const UpcomingTasks = ({ tasks }: UpcomingTasksProps) => {
  return (
    <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-foreground">Upcoming Tasks</h3>
          <p className="text-xs text-muted-foreground">Next on your roadmap</p>
        </div>
        <button className="text-xs text-primary hover:underline font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "p-3 rounded-lg bg-secondary/50 border-l-2 hover:bg-secondary transition-colors cursor-pointer group",
              priorityStyles[task.priority]
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{task.estimatedTime}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;

export const defaultUpcomingTasks: Task[] = [
  {
    id: "1",
    title: "Build a REST API with Node.js",
    dueDate: "Tomorrow",
    estimatedTime: "2h",
    priority: "high",
    category: "Backend",
  },
  {
    id: "2",
    title: "Database Schema Design Challenge",
    dueDate: "In 2 days",
    estimatedTime: "1.5h",
    priority: "medium",
    category: "Databases",
  },
  {
    id: "3",
    title: "Authentication Implementation",
    dueDate: "In 3 days",
    estimatedTime: "3h",
    priority: "low",
    category: "Security",
  },
];
