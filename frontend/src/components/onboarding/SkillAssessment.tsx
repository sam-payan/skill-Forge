import { useState } from "react";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  levels: string[];
}

const skills: Skill[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    levels: ["New to this", "Built some projects", "Comfortable", "Expert"],
  },
  {
    id: "backend",
    name: "Backend Development",
    levels: ["New to this", "Built some projects", "Comfortable", "Expert"],
  },
  {
    id: "databases",
    name: "Databases & SQL",
    levels: ["New to this", "Basic queries", "Design schemas", "Optimization expert"],
  },
  {
    id: "devops",
    name: "DevOps & Deployment",
    levels: ["No experience", "Deployed once", "CI/CD familiar", "Infrastructure pro"],
  },
];

interface SkillAssessmentProps {
  assessments: Record<string, number>;
  onAssess: (skillId: string, level: number) => void;
}

const SkillAssessment = ({ assessments, onAssess }: SkillAssessmentProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Rate your current skills</h2>
        <p className="text-muted-foreground">
          Be honest — this helps us create the right starting point for you
        </p>
      </div>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <label className="block font-medium text-foreground mb-3">{skill.name}</label>
            <div className="grid grid-cols-4 gap-2">
              {skill.levels.map((level, levelIndex) => (
                <button
                  key={levelIndex}
                  onClick={() => onAssess(skill.id, levelIndex)}
                  className={cn(
                    "py-3 px-2 rounded-lg text-xs font-medium transition-all duration-200",
                    assessments[skill.id] === levelIndex
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillAssessment;
