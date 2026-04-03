import { ReactNode } from 'react';

interface SimCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function SimCard({ title, subtitle, children, className = '' }: SimCardProps) {
  return (
    <div className={`glass-card rounded-xl p-4 md:p-5 mb-3.5 ${className}`}>
      {title && <h3 className="text-sm font-display font-semibold text-foreground mb-1">{title}</h3>}
      {subtitle && <p className="text-[11px] text-muted-foreground mb-3.5">{subtitle}</p>}
      {children}
    </div>
  );
}

export function MetricGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5">{children}</div>;
}

export function Metric({ label, value, color }: { label: string; value: string; color?: 'green' | 'red' | 'amber' | 'blue' }) {
  const colorMap = {
    green: 'text-secondary',
    red: 'text-destructive',
    amber: 'text-warning',
    blue: 'text-primary',
  };
  return (
    <div className="bg-muted/50 rounded-lg p-3">
      <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
      <div className={`text-lg font-mono font-medium ${color ? colorMap[color] : 'text-foreground'}`}>{value}</div>
    </div>
  );
}

export function ScenarioRow({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-3 gap-2.5 mb-3.5">{children}</div>;
}

export function ScenarioBox({ label, value, desc, variant }: { label: string; value: string; desc: string; variant: 'pessimistic' | 'realistic' | 'optimistic' }) {
  const styles = {
    pessimistic: 'bg-destructive/10 border-destructive/30 [&_.s-label]:text-destructive',
    realistic: 'bg-muted/50 border-border [&_.s-label]:text-muted-foreground',
    optimistic: 'bg-secondary/10 border-secondary/30 [&_.s-label]:text-secondary',
  };
  return (
    <div className={`rounded-lg p-3 border ${styles[variant]}`}>
      <div className="s-label text-[10px] font-medium mb-1.5">{label}</div>
      <div className="text-base font-mono font-medium text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground mt-1">{desc}</div>
    </div>
  );
}

export function BarRow({ label, percent, value, color }: { label: string; percent: number; value: string; color?: string }) {
  const barColor = color || (percent > 90 ? 'bg-destructive' : percent > 75 ? 'bg-warning' : 'bg-primary');
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[11px] text-muted-foreground w-[130px] shrink-0">{label}</span>
      <div className="flex-1 bg-muted/50 rounded h-2">
        <div className={`h-2 rounded transition-all duration-500 ${barColor}`} style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
      <span className="text-[11px] font-mono font-medium w-[70px] text-right text-foreground">{value}</span>
    </div>
  );
}

export function StepList({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <div className="space-y-2 mb-3">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-medium flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
          <div className="text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">{s.title}</strong> {s.desc}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-2.5">{children}</div>;
}

export function InfoBox({ children, variant = 'info' }: { children: ReactNode; variant?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info: 'bg-primary/5 border-primary/20 text-primary',
    warning: 'bg-warning/10 border-warning/20 text-warning',
    success: 'bg-secondary/5 border-secondary/20 text-secondary',
  };
  return (
    <div className={`text-[11px] leading-relaxed rounded-lg border p-3 ${styles[variant]}`}>{children}</div>
  );
}

export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="bg-muted/50 rounded-lg p-3 font-mono text-[10px] leading-[1.7] text-muted-foreground overflow-x-auto">{children}</pre>
  );
}
