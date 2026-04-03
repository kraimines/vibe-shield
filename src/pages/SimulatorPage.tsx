import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Wrench, Link2, Globe, TrendingUp } from 'lucide-react';
import SimMicro from '@/components/simulator/SimMicro';
import SimIntermediate from '@/components/simulator/SimIntermediate';
import SimMacro from '@/components/simulator/SimMacro';
import SimPredictions from '@/components/simulator/SimPredictions';

const tabs = [
  { id: 'micro', label: 'Micro — Opérations', icon: Wrench },
  { id: 'intermediate', label: 'Intermédiaire — Clients', icon: Link2 },
  { id: 'macro', label: 'Macro — Environnement', icon: Globe },
  { id: 'predictions', label: 'Prédictions futures', icon: TrendingUp },
] as const;

type TabId = typeof tabs[number]['id'];

export default function SimulatorPage() {
  const [activeTab, setActiveTab] = useState<TabId>('micro');

  return (
    <div className="p-6 max-w-[920px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-display font-semibold text-foreground">Moteur de Simulation Stratégique — Talan Tunisie</h1>
            <p className="text-xs text-muted-foreground">Données réelles : CRM · RH · ERP · 36 mois (Jan 2022 → Déc 2024) · 2880 entrées revenue · 150 employés · 60 projets · 500 opportunités</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-5 flex-wrap">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                activeTab === tab.id
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'micro' && <SimMicro />}
          {activeTab === 'intermediate' && <SimIntermediate />}
          {activeTab === 'macro' && <SimMacro />}
          {activeTab === 'predictions' && <SimPredictions />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
