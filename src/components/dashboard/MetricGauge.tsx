import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MetricGaugeProps {
  value: number;
  max: number;
  label: string;
  color?: string;
  size?: number;
}

export default function MetricGauge({ value, max, label, color = 'hsl(190, 100%, 50%)', size = 100 }: MetricGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = animatedValue / max;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(220, 30%, 15%)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percentage)}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-lg font-mono font-bold text-foreground">{value}</span>
        <span className="text-[10px] text-muted-foreground">{label}</span>
      </div>
    </motion.div>
  );
}
