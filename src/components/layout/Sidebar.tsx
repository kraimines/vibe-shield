import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MessageSquare, LayoutDashboard, Users, TrendingUp, FlaskConical, Settings, LogOut, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';
import { useRole } from '@/hooks/useRole';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/chat', icon: MessageSquare, label: 'Assistant IA', roles: ['employee', 'manager', 'direction'], badge: true },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Mon Dashboard', roles: ['employee', 'manager', 'direction'] },
  { to: '/team', icon: Users, label: 'Équipe', roles: ['manager', 'direction'] },
  { to: '/direction', icon: TrendingUp, label: 'Direction', roles: ['direction'] },
  { to: '/simulator', icon: FlaskConical, label: 'Simulateur', roles: ['employee', 'manager', 'direction'] },
  { to: '/settings', icon: Settings, label: 'Paramètres', roles: ['employee', 'manager', 'direction'] },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useRole();
  const location = useLocation();

  const filteredNav = navItems.filter(item => user && item.roles.includes(user.role));

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-screen flex flex-col bg-sidebar border-r border-border fixed left-0 top-0 z-40 overflow-hidden"
    >
      <div className="p-3 flex items-center gap-2 h-16 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Cpu className="w-4 h-4 text-primary" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-w-0">
              <span className="text-sm font-display font-bold text-foreground truncate">TALAN.AI</span>
              <span className="text-[10px] text-muted-foreground">AI Platform</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!collapsed && user && (
        <div className="px-3 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary capitalize">{user.role}</span>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
        {filteredNav.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-200 group relative ${
                isActive
                  ? 'bg-primary/10 text-primary glow-cyan'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="truncate">
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.badge && !collapsed && (
                <span className="ml-auto w-2 h-2 rounded-full bg-secondary animate-pulse-glow" />
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-card rounded text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border-glow z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-2 border-t border-border space-y-1">
        <button
          onClick={logout}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        {!collapsed && (
          <p className="text-[10px] text-muted-foreground text-center">v2.1.0 · API ✓</p>
        )}
      </div>
    </motion.aside>
  );
}
