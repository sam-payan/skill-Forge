import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleSelection from "@/components/onboarding/RoleSelection";
import SkillAssessment from "@/components/onboarding/SkillAssessment";
import TimeCommitment from "@/components/onboarding/TimeCommitment";
import { cn } from "@/lib/utils";
import { auth, db } from "@/firebaseconfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const steps = [
  { id: 1, name: "Role" },
  { id: 2, name: "Skills" },
  { id: 3, name: "Time" },
];

const Onboarding = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [skillAssessments, setSkillAssessments] = useState<Record<string, number>>({});
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSkillAssess = (skillId: string, level: number) => {
    setSkillAssessments(prev => ({ ...prev, [skillId]: level }));
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedRole !== null;
    if (currentStep === 2) return Object.keys(skillAssessments).length >= 4;
    if (currentStep === 3) return selectedTime !== null;
    return false;
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    const user = auth.currentUser;
    if (!user || !selectedRole || !selectedTime) return;

    try {
      setLoading(true);

      await setDoc(
        doc(db, "users", user.uid),
        {
          onboardingCompleted: true,
          onboarding: {
            role: selectedRole,
            skills: skillAssessments,
            timeCommitment: selectedTime,
            completedAt: serverTimestamp(),
          },
        },
        { merge: true }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Onboarding save failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/3 bg-sidebar p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-sidebar-accent-foreground">
              SkillForge
            </span>
          </div>

          <h1 className="text-3xl font-bold text-sidebar-accent-foreground mb-4">
            Your personalized path to mastery
          </h1>
          <p className="text-sidebar-foreground text-lg">
            We'll create a custom roadmap based on your goals, current skills, and available time.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-lg font-bold text-sidebar-accent-foreground">
                92%
              </span>
            </div>
            <div>
              <p className="font-medium text-sidebar-accent-foreground">
                Success Rate
              </p>
              <p className="text-sm text-sidebar-foreground">
                of learners reach their goals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        {/* Steps */}
        <div className="px-8 py-6 border-b border-border">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                      currentStep > step.id
                        ? "bg-success text-success-foreground"
                        : currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium hidden sm:block",
                      currentStep >= step.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-16 h-0.5 mx-4",
                      currentStep > step.id ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            {currentStep === 1 && (
              <RoleSelection
                selectedRole={selectedRole}
                onSelect={setSelectedRole}
              />
            )}
            {currentStep === 2 && (
              <SkillAssessment
                assessments={skillAssessments}
                onAssess={handleSkillAssess}
              />
            )}
            {currentStep === 3 && (
              <TimeCommitment
                selectedTime={selectedTime}
                onSelect={setSelectedTime}
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="px-8 py-6 border-t border-border">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1 || loading}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="gap-2"
            >
              {currentStep === 3 ? "Start Learning" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
