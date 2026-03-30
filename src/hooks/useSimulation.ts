import { useState, useCallback } from 'react';
import type { SimulationResult } from '@/types';
import { defaultSimulationResult } from '@/data/mockData';

const loadingMessages = [
  'Analyse du graphe Neo4j...',
  'Propagation en cascade...',
  'Calcul des scénarios...',
  'Simulation Monte Carlo...',
  'Génération du rapport...',
];

export function useSimulation() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const runSimulation = useCallback(() => {
    setIsRunning(true);
    setResult(null);
    setProgress(0);

    let step = 0;
    const interval = setInterval(() => {
      if (step < loadingMessages.length) {
        setLoadingMessage(loadingMessages[step]);
        setProgress(((step + 1) / loadingMessages.length) * 100);
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setResult(defaultSimulationResult);
      }
    }, 700);
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setIsRunning(false);
    setProgress(0);
  }, []);

  return { result, isRunning, loadingMessage, progress, runSimulation, reset };
}
