import { AlertTriangle, X } from 'lucide-react';
import { alerts } from '@/data/mockData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AlertPanel() {
  const [visible, setVisible] = useState(true);
  const dangerAlerts = alerts.filter(a => a.type === 'danger' || a.type === 'warning');

  if (!visible || dangerAlerts.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 mb-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              {dangerAlerts.map(alert => (
                <div key={alert.id} className="flex items-center gap-3">
                  <span className="text-xs text-foreground">{alert.text}</span>
                  <button className="text-[10px] px-2 py-0.5 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors">
                    {alert.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
