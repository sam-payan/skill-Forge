import DashboardLayout from "@/components/layout/DashboardLayout";
import MentorChat from "@/components/mentor/MentorChat";
import { BookOpen, Clock, TrendingUp } from "lucide-react";

const contextCards = [
  {
    icon: BookOpen,
    label: "Current Topic",
    value: "React Hooks",
  },
  {
    icon: Clock,
    label: "Session Time",
    value: "12 min",
  },
  {
    icon: TrendingUp,
    label: "Understanding",
    value: "Growing",
  },
];


const Mentor = () => {
  return (
    <DashboardLayout>
      <div className="flex h-screen">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <header className="px-8 py-4 border-b border-border bg-background/80 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Mentor</h1>
                <p className="text-sm text-muted-foreground">
                  Personalized guidance for your learning journey
                </p>
              </div>
              <div className="flex items-center gap-4">
                {contextCards.map((card) => (
                  <div key={card.label} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                    <card.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{card.label}</p>
                      <p className="text-sm font-medium text-foreground">{card.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <div className="flex-1">
            <MentorChat />
          </div>
        </div>

        {/* Right Sidebar - Context Panel */}
        <aside className="w-80 border-l border-border bg-card p-6 hidden xl:block">
          <h3 className="font-semibold text-foreground mb-4">Learning Context</h3>

          {/* Current Progress */}
          <div className="p-4 rounded-xl bg-secondary/50 mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">React Hooks Deep Dive</h4>
            <div className="progress-bar h-2 mb-2">
              <div className="progress-fill" style={{ width: "65%" }} />
            </div>
            <p className="text-xs text-muted-foreground">65% complete • 2 topics remaining</p>
          </div>

          {/* Related Resources */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Suggested Resources</h4>
            <div className="space-y-2">
              {["useEffect Best Practices", "Custom Hooks Guide", "React Patterns"].map(
                (resource) => (
                  <button
                    key={resource}
                    className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <p className="text-sm font-medium text-foreground">{resource}</p>
                    <p className="text-xs text-muted-foreground">Documentation</p>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Insights */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Your Insights</h4>
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-sm text-foreground mb-2">
                You learn best with <strong>examples</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Based on your interaction patterns, I'll include more code examples in my explanations.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
};

export default Mentor;
