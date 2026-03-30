import { Bell, Search } from 'lucide-react';
import { useRole } from '@/hooks/useRole';

export default function TopBar() {
  const { user } = useRole();
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-sidebar/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Rechercher..."
            className="h-8 pl-9 pr-4 text-sm bg-muted/50 rounded-lg border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground w-64 transition-colors"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground capitalize">{dateStr}</span>
        <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
        </button>
        {user && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
