import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend?: number;
  icon: LucideIcon;
  color?: 'cyan' | 'green' | 'amber' | 'red';
  delay?: number;
  decimals?: number;
}

const colorMap = {
  cyan: 'text-primary bg-primary/10 border-primary/20',
  green: 'text-secondary bg-secondary/10 border-secondary/20',
  amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  red: 'text-destructive bg-destructive/10 border-destructive/20',
};

export default function KPICard({ title, value, suffix = '', prefix = '', trend, icon: Icon, color = 'cyan', delay = 0, decimals = 0 }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Number((eased * value).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay, decimals]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card rounded-xl p-4 hover:-translate-y-0.5 transition-transform duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground font-medium">{title}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-mono font-bold text-foreground">
          {prefix}{displayValue}{suffix}
        </span>
        {trend !== undefined && (
          <span className={`text-xs font-mono mb-1 ${trend >= 0 ? 'text-secondary' : 'text-destructive'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </motion.div>
  );
}
