import { GitCommit, Calendar, Package, Plane } from 'lucide-react';
import { activities } from '@/data/mockData';
import { motion } from 'framer-motion';

const iconMap = {
  commit: GitCommit,
  meeting: Calendar,
  delivery: Package,
  leave: Plane,
};

const colorMap = {
  commit: 'text-primary bg-primary/10',
  meeting: 'text-purple-400 bg-purple-400/10',
  delivery: 'text-secondary bg-secondary/10',
  leave: 'text-amber-400 bg-amber-400/10',
};

export default function ActivityFeed() {
  return (
    <div className="glass-card rounded-xl p-4">
      <h3 className="text-sm font-display font-semibold text-foreground mb-4">Activité Récente</h3>
      <div className="space-y-0">
        {activities.map((activity, i) => {
          const Icon = iconMap[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-3 relative"
            >
              {i < activities.length - 1 && (
                <div className="absolute left-[13px] top-8 w-px h-[calc(100%-8px)] bg-border" />
              )}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${colorMap[activity.type]}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="pb-4 min-w-0">
                <p className="text-xs text-foreground leading-relaxed">{activity.text}</p>
                <span className="text-[10px] text-muted-foreground">{activity.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
