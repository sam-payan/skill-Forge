import { GraduationCap, Briefcase, RefreshCw, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const roles: Role[] = [
  {
    id: "student",
    title: "University Student",
    description: "Currently enrolled and building foundational skills",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "early-career",
    title: "Early-Career Professional",
    description: "0-3 years of experience, looking to level up",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: "career-switcher",
    title: "Career Switcher",
    description: "Transitioning from another field into tech",
    icon: <RefreshCw className="w-6 h-6" />,
  },
  {
    id: "recruiter",
    title: "Hiring Manager",
    description: "Evaluating candidates and talent pipelines",
    icon: <Users className="w-6 h-6" />,
  },
];

interface RoleSelectionProps {
  selectedRole: string | null;
  onSelect: (roleId: string) => void;
}

const RoleSelection = ({ selectedRole, onSelect }: RoleSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">What describes you best?</h2>
        <p className="text-muted-foreground">
          This helps us personalize your learning experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role, index) => (
          <button
            key={role.id}
            onClick={() => onSelect(role.id)}
            className={cn(
              "p-6 rounded-xl border-2 text-left transition-all duration-200 animate-fade-in hover-lift",
              selectedRole === role.id
                ? "border-primary bg-primary/5 shadow-glow"
                : "border-border bg-card hover:border-primary/50"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                selectedRole === role.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {role.icon}
            </div>
            <h3 className="font-semibold text-foreground mb-1">{role.title}</h3>
            <p className="text-sm text-muted-foreground">{role.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
