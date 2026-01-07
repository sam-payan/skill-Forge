import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Send,
  Sparkles,
  ChevronRight,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const task = {
  title: "React Hooks Deep Dive",
  description:
    "Implement a custom hook that manages form state with validation. The hook should handle input changes, validate fields, and return error states.",
  objectives: [
    "Create a useForm custom hook",
    "Implement field validation logic",
    "Handle form submission state",
    "Return appropriate error messages",
  ],
  difficulty: "Intermediate",
  estimatedTime: 45,
  category: "React",
  phase: "Applied Skills",
};

const hints = [
  {
    id: "1",
    title: "Getting Started",
    content: "Start by defining the initial state structure for your form fields.",
    revealed: true,
  },
  {
    id: "2",
    title: "Validation Pattern",
    content: "Consider using a validation schema object that maps field names to validation functions.",
    revealed: false,
  },
  {
    id: "3",
    title: "Error Handling",
    content: "Return both the error state and a function to clear specific field errors.",
    revealed: false,
  },
];

const difficultyColors = {
  Beginner: "bg-success-muted text-success",
  Intermediate: "bg-warning-muted text-warning",
  Advanced: "bg-destructive/10 text-destructive",
};

const TaskExecution = () => {
  const navigate = useNavigate();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState(`import { useState } from 'react';

function useForm(initialValues, validate) {
  // Your implementation here
  
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useForm;`);
  const [revealedHints, setRevealedHints] = useState<string[]>(["1"]);
  const [aiMessage, setAiMessage] = useState(
    "I see you're working on the useForm hook. Remember, the key to a good custom hook is keeping it reusable. Would you like a hint on structuring the validation logic?"
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const revealHint = (hintId: string) => {
    if (!revealedHints.includes(hintId)) {
      setRevealedHints([...revealedHints, hintId]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon-sm" onClick={() => navigate("/roadmap")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {task.phase}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{task.category}</span>
              </div>
              <h1 className="font-semibold text-foreground">{task.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono text-lg font-semibold text-foreground">
                {formatTime(timeElapsed)}
              </span>
              <span className="text-xs text-muted-foreground">/ {task.estimatedTime} min</span>
              <div className="flex items-center gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsRunning(!isRunning)}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    setTimeElapsed(0);
                    setIsRunning(false);
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Difficulty */}
            <span
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium",
                difficultyColors[task.difficulty as keyof typeof difficultyColors]
              )}
            >
              {task.difficulty}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Task Info & Workspace */}
        <div className="flex-1 flex flex-col border-r border-border">
          {/* Task Description */}
          <div className="p-6 border-b border-border bg-card">
            <h3 className="font-semibold text-foreground mb-2">Task Description</h3>
            <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Objectives:</h4>
              <ul className="space-y-1.5">
                {task.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code Editor Placeholder */}
          <div className="flex-1 p-6">
            <div className="h-full rounded-xl border border-border bg-sidebar overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-sidebar-border bg-sidebar-accent/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs text-sidebar-foreground">useForm.ts</span>
                <div />
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[calc(100%-40px)] p-4 bg-transparent text-sidebar-accent-foreground font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-4 border-t border-border bg-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset Code
              </Button>
              <Button variant="secondary" className="gap-2">
                <Play className="w-4 h-4" />
                Run Tests
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">Save Draft</Button>
              <Button variant="hero" className="gap-2">
                <Send className="w-4 h-4" />
                Submit Solution
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Guidance */}
        <aside className="w-96 flex flex-col bg-card">
          {/* AI Coach Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Coach</h3>
                <p className="text-xs text-muted-foreground">Here to guide, not give answers</p>
              </div>
            </div>
          </div>

          {/* AI Message */}
          <div className="p-4 border-b border-border">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-foreground">{aiMessage}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="secondary" size="sm" className="text-xs">
                Yes, show hint
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                I'll figure it out
              </Button>
            </div>
          </div>

          {/* Hints Section */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-warning" />
              Available Hints
            </h4>
            <div className="space-y-3">
              {hints.map((hint, index) => (
                <div
                  key={hint.id}
                  className={cn(
                    "p-3 rounded-lg border transition-all",
                    revealedHints.includes(hint.id)
                      ? "bg-secondary/50 border-border"
                      : "bg-muted/50 border-dashed border-border cursor-pointer hover:bg-secondary/30"
                  )}
                  onClick={() => !revealedHints.includes(hint.id) && revealHint(hint.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      Hint {index + 1}: {hint.title}
                    </span>
                    {!revealedHints.includes(hint.id) && (
                      <span className="text-xs text-muted-foreground">Click to reveal</span>
                    )}
                  </div>
                  {revealedHints.includes(hint.id) ? (
                    <p className="text-sm text-muted-foreground">{hint.content}</p>
                  ) : (
                    <div className="h-4 bg-muted rounded animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="p-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Related Resources
            </h4>
            <div className="space-y-2">
              {["React Hooks Documentation", "Custom Hooks Guide", "Form Validation Patterns"].map(
                (resource) => (
                  <button
                    key={resource}
                    className="w-full text-left p-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    {resource}
                  </button>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TaskExecution;
