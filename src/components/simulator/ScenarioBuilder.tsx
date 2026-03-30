import { useState } from 'react';
import { FlaskConical, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScenarioBuilderProps {
  onRun: () => void;
  isRunning: boolean;
  progress: number;
  loadingMessage: string;
}

const scenarios = [
  { value: 'client-loss', label: 'Perte de client stratégique' },
  { value: 'mass-hiring', label: 'Recrutement massif' },
  { value: 'budget-cut', label: 'Réduction de budget' },
  { value: 'market-expansion', label: 'Expansion marché' },
  { value: 'economic-crisis', label: 'Crise économique externe' },
];

const sectors = ['Banque', 'Industrie', 'Telecom', 'Retail'];

export default function ScenarioBuilder({ onRun, isRunning, progress, loadingMessage }: ScenarioBuilderProps) {
  const [scenario, setScenario] = useState('client-loss');
  const [impact, setImpact] = useState(30);
  const [delay, setDelay] = useState(6);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(['Banque']);

  const toggleSector = (s: string) => {
    setSelectedSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <FlaskConical className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Simulateur Stratégique — Digital Twin</h2>
          <p className="text-xs text-muted-foreground">Modélisez l'impact de scénarios sur l'activité Talan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Type de scénario</label>
          <select
            value={scenario}
            onChange={e => setScenario(e.target.value)}
            className="w-full h-9 px-3 text-sm bg-muted/50 rounded-lg border border-border text-foreground focus:border-primary/50 focus:outline-none"
          >
            {scenarios.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Impact estimé : {impact}%</label>
          <input
            type="range"
            min="5"
            max="100"
            value={impact}
            onChange={e => setImpact(+e.target.value)}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Délai : {delay} mois</label>
          <input
            type="range"
            min="1"
            max="24"
            value={delay}
            onChange={e => setDelay(+e.target.value)}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Secteurs impactés</label>
          <div className="flex flex-wrap gap-1.5">
            {sectors.map(s => (
              <button
                key={s}
                onClick={() => toggleSector(s)}
                className={`px-2 py-1 text-[10px] rounded-md border transition-all ${
                  selectedSectors.includes(s)
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-border'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onRun}
        disabled={isRunning}
        className="h-10 px-6 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-medium text-sm flex items-center gap-2 transition-all disabled:opacity-50 hover:glow-cyan"
      >
        <Play className="w-4 h-4" />
        {isRunning ? 'Simulation en cours...' : 'Lancer la Simulation'}
      </button>

      {isRunning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-primary font-mono mt-2 animate-pulse">{loadingMessage}</p>
        </motion.div>
      )}
    </div>
  );
}
