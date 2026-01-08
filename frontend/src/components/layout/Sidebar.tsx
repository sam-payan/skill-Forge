import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  ClipboardCheck,
  MessageSquare,
  User,
  Settings,
  ChevronLeft,
  Zap,
  Trophy,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Assessments", href: "/assessments", icon: ClipboardCheck },
  { name: "AI Mentor", href: "/mentor", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: User },
];

const mentorLink = navigation.find((item) => item.name === "AI Mentor")?.href;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center gap-3 px-6 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg text-sidebar-accent-foreground">
            SkillForge
          </span>
        )}
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-sidebar-foreground group-hover:text-primary"
                )}
              />
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mx-3 mb-4 p-4 rounded-xl bg-sidebar-accent/50 border border-sidebar-border">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-warning" />
            <span className="text-xs font-medium text-sidebar-foreground">
              Weekly Streak
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-2 bg-sidebar-border rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
            <span className="text-xs font-semibold text-sidebar-accent-foreground">
              5/7
            </span>
          </div>
          <p className="text-xs text-sidebar-foreground">
            2 more days to complete!
          </p>
        </div>
      )}

      {!collapsed && (
        <div className="mx-3 mb-4 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-sidebar-accent-foreground">
              AI Mentor
            </span>
          </div>
          <p className="text-xs text-sidebar-foreground mb-3">
            Get personalized guidance for your learning journey
          </p>
          {mentorLink && (
            <Link to={mentorLink}>
              <Button size="sm" variant="accent" className="w-full text-xs">
                Start Chat
              </Button>
            </Link>
          )}
        </div>
      )}

      <div className="px-3 pb-4 space-y-1.5 border-t border-sidebar-border pt-4">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-all duration-200 w-full"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span className="font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
