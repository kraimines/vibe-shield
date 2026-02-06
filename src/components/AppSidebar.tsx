import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Trophy,
  Map,
  Puzzle,
  Settings,
  User,
  Shield,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/community", icon: MessageSquare, label: "Community" },
  { to: "/journey", icon: Map, label: "Journey" },
  { to: "/missions", icon: Puzzle, label: "Missions" },
  { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/extension", icon: Shield, label: "Extension" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
      <div className="p-5 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-display font-bold text-foreground">VibeGuard</span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary glow-cyan"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-foreground">Good Vibes Streak</span>
        </div>
        <p className="text-2xl font-display font-bold text-primary">7 days 🔥</p>
        <p className="text-xs text-muted-foreground mt-0.5">Keep it up fr 💯</p>
      </div>
    </aside>
  );
}
