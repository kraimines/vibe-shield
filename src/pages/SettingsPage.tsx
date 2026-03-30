import { useState } from 'react';
import { useRole } from '@/hooks/useRole';
import { motion } from 'framer-motion';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full transition-colors relative ${checked ? 'bg-primary/40' : 'bg-muted'}`}
    >
      <div className={`w-4 h-4 rounded-full transition-all absolute top-0.5 ${checked ? 'left-5.5 bg-primary' : 'left-0.5 bg-muted-foreground'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { user } = useRole();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  return (
    <div className="p-6 max-w-[800px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-display font-bold text-foreground mb-1">Paramètres</h1>
        <p className="text-sm text-muted-foreground mb-8">Configurez votre expérience</p>
      </motion.div>

      <div className="space-y-6">
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Profil</h3>
          <div className="space-y-3">
            {[
              { label: 'Nom', value: user?.name },
              { label: 'Email', value: user?.email },
              { label: 'Département', value: user?.department },
              { label: 'Rôle', value: user?.role },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-2 border-b border-border/50">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="text-xs text-foreground capitalize">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Préférences</h3>
          <div className="space-y-4">
            {[
              { label: 'Notifications', desc: 'Recevoir les alertes et mises à jour', checked: notifications, onChange: setNotifications },
              { label: 'Mode sombre', desc: 'Activer le thème dark (recommandé)', checked: darkMode, onChange: setDarkMode },
              { label: 'Analytics', desc: 'Partager les données d\'utilisation anonymisées', checked: analytics, onChange: setAnalytics },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
                <Toggle checked={item.checked} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
