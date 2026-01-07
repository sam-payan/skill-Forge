import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeOption {
  id: string;
  hours: string;
  label: string;
  description: string;
  estimatedCompletion: string;
}

const timeOptions: TimeOption[] = [
  {
    id: "light",
    hours: "3-5",
    label: "Light",
    description: "A few hours per week",
    estimatedCompletion: "6-8 months",
  },
  {
    id: "moderate",
    hours: "8-12",
    label: "Moderate",
    description: "Part-time commitment",
    estimatedCompletion: "3-4 months",
  },
  {
    id: "intensive",
    hours: "20+",
    label: "Intensive",
    description: "Serious learning mode",
    estimatedCompletion: "6-8 weeks",
  },
];

interface TimeCommitmentProps {
  selectedTime: string | null;
  onSelect: (timeId: string) => void;
}

const TimeCommitment = ({ selectedTime, onSelect }: TimeCommitmentProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          How much time can you commit weekly?
        </h2>
        <p className="text-muted-foreground">
          We'll pace your roadmap accordingly
        </p>
      </div>

      <div className="space-y-4">
        {timeOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "w-full p-6 rounded-xl border-2 text-left transition-all duration-200 animate-fade-in hover-lift",
              selectedTime === option.id
                ? "border-primary bg-primary/5 shadow-glow"
                : "border-border bg-card hover:border-primary/50"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    selectedTime === option.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-foreground">{option.hours}</span>
                    <span className="text-muted-foreground">hrs/week</span>
                  </div>
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">Est. completion</span>
                <p className="font-semibold text-accent">{option.estimatedCompletion}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeCommitment;
