import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import ScenarioBuilder from '@/components/simulator/ScenarioBuilder';
import ImpactChart from '@/components/simulator/ImpactChart';
import PropagationMap from '@/components/simulator/PropagationMap';
import SimulationReport from '@/components/simulator/SimulationReport';
import { useSimulation } from '@/hooks/useSimulation';

export default function SimulatorPage() {
  const { result, isRunning, loadingMessage, progress, runSimulation } = useSimulation();
  const [activeTab, setActiveTab] = useState<'comparison' | 'propagation' | 'projections'>('comparison');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <ScenarioBuilder onRun={runSimulation} isRunning={isRunning} progress={progress} loadingMessage={loadingMessage} />

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
            {/* Results: AI Analysis + Charts */}
            <div className="grid grid-cols-2 gap-4">
              <SimulationReport text={result.aiAnalysis} />

              <div className="glass-card rounded-xl p-4">
                <div className="flex border-b border-border mb-4">
                  {(['comparison', 'propagation', 'projections'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 text-xs font-medium transition-colors capitalize ${
                        activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab === 'comparison' ? 'Comparaison' : tab === 'propagation' ? 'Propagation' : 'Projections'}
                    </button>
                  ))}
                </div>

                {activeTab === 'comparison' && <ImpactChart result={result} />}
                {activeTab === 'propagation' && <PropagationMap nodes={result.propagationNodes} />}
                {activeTab === 'projections' && (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.projections}>
                        <defs>
                          <linearGradient id="confidence" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 30%, 18%, 0.8)" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
                        <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
                        <Tooltip contentStyle={{ background: 'hsl(220, 35%, 10%)', border: '1px solid hsla(190, 100%, 50%, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="optimistic" stroke="none" fill="hsla(157, 100%, 50%, 0.08)" />
                        <Area type="monotone" dataKey="pessimistic" stroke="none" fill="hsla(355, 100%, 64%, 0.08)" />
                        <Line type="monotone" dataKey="current" stroke="hsla(220, 15%, 55%, 0.5)" strokeDasharray="5 5" strokeWidth={1} dot={false} name="Tendance actuelle" />
                        <Line type="monotone" dataKey="pessimistic" stroke="hsl(355, 100%, 64%)" strokeWidth={1.5} dot={false} name="Pessimiste" />
                        <Line type="monotone" dataKey="realistic" stroke="hsl(38, 100%, 50%)" strokeWidth={2} dot={false} name="Réaliste" />
                        <Line type="monotone" dataKey="optimistic" stroke="hsl(157, 100%, 50%)" strokeWidth={1.5} dot={false} name="Optimiste" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-3 gap-4">
              {result.recommendations.map((rec, i) => {
                const colors = [
                  'border-destructive/30 bg-destructive/5',
                  'border-amber-400/30 bg-amber-400/5',
                  'border-secondary/30 bg-secondary/5',
                ];
                const riskColors = ['bg-destructive/20 text-destructive', 'bg-amber-400/20 text-amber-400', 'bg-secondary/20 text-secondary'];
                return (
                  <motion.div
                    key={rec.scenario}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className={`rounded-xl border p-4 ${colors[i]}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-display font-semibold text-foreground">{rec.scenario}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${riskColors[i]}`}>
                        {rec.risk}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {rec.actions.map((action, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">→</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
