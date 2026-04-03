import { useState, useEffect, useMemo, useCallback } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, BarChart, Bar } from 'recharts';
import SimCard, { MetricGrid, Metric, SectionLabel, ScenarioRow, ScenarioBox, CodeBlock } from './SimCard';

// Prophet forecast data
const prophetData = [
  { month: 'Jan 25', yhat: 3.10, lower: 2.60, upper: 3.65 },
  { month: 'Fév 25', yhat: 3.20, lower: 2.55, upper: 3.85 },
  { month: 'Mar 25', yhat: 3.45, lower: 2.70, upper: 4.15 },
  { month: 'Avr 25', yhat: 3.35, lower: 2.65, upper: 4.05 },
  { month: 'Mai 25', yhat: 3.30, lower: 2.60, upper: 4.00 },
  { month: 'Jun 25', yhat: 3.15, lower: 2.50, upper: 3.80 },
  { month: 'Jul 25', yhat: 3.10, lower: 2.45, upper: 3.75 },
  { month: 'Aoû 25', yhat: 2.90, lower: 2.30, upper: 3.55 },
  { month: 'Sep 25', yhat: 3.40, lower: 2.70, upper: 4.10 },
  { month: 'Oct 25', yhat: 3.55, lower: 2.80, upper: 4.30 },
  { month: 'Nov 25', yhat: 3.30, lower: 2.60, upper: 4.05 },
  { month: 'Déc 25', yhat: 3.20, lower: 2.50, upper: 3.90 },
];

// CRM Pipeline stages for Monte Carlo
const pipelineStages = [
  { stage: 'Négociation (75%)', amount: 97.6, prob: 75 },
  { stage: 'Proposal (50%)', amount: 85.1, prob: 50 },
  { stage: 'Qualification (25%)', amount: 120.7, prob: 25 },
  { stage: 'Prospection (10%)', amount: 108.1, prob: 10 },
];

function runMonteCarlo(n: number = 10000) {
  const results: number[] = [];
  for (let i = 0; i < n; i++) {
    let total = 0;
    for (const stage of pipelineStages) {
      if (Math.random() < stage.prob / 100) total += stage.amount;
    }
    results.push(total);
  }
  results.sort((a, b) => a - b);
  const p10 = results[Math.floor(n * 0.1)];
  const p50 = results[Math.floor(n * 0.5)];
  const p90 = results[Math.floor(n * 0.9)];

  // Build histogram
  const min = Math.floor(results[0] / 20) * 20;
  const max = Math.ceil(results[n - 1] / 20) * 20;
  const bins: { range: string; count: number }[] = [];
  for (let b = min; b < max; b += 20) {
    const count = results.filter(r => r >= b && r < b + 20).length;
    bins.push({ range: `${b}`, count });
  }

  return { p10: Math.round(p10), p50: Math.round(p50), p90: Math.round(p90), bins };
}

export default function SimPredictions() {
  const [mcResult, setMcResult] = useState<{ p10: number; p50: number; p90: number; bins: { range: string; count: number }[] } | null>(null);

  const runSim = useCallback(() => {
    setMcResult(runMonteCarlo());
  }, []);

  useEffect(() => { runSim(); }, [runSim]);

  const tooltipStyle = {
    background: 'hsl(220, 35%, 10%)',
    border: '1px solid hsla(190, 100%, 50%, 0.2)',
    borderRadius: '8px',
    fontSize: '11px',
  };

  return (
    <div className="space-y-0">
      {/* Prophet Forecast */}
      <SimCard title="Prophet — Prévision CA mensuel 2025" subtitle="Input : 36 mois de crm_revenue_history (2022-01 → 2024-12) · CAGR réel = 20%/an">
        <div className="h-[260px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={prophetData}>
              <defs>
                <linearGradient id="prophetArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 30%, 18%, 0.8)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} unit="B" />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="upper" stroke="none" fill="hsla(190, 100%, 50%, 0.06)" />
              <Area type="monotone" dataKey="lower" stroke="none" fill="hsla(190, 100%, 50%, 0.06)" />
              <Area type="monotone" dataKey="yhat" stroke="hsl(190, 100%, 50%)" strokeWidth={2} fill="url(#prophetArea)" dot={false} name="Prévision (yhat)" />
              <Line type="monotone" dataKey="upper" stroke="hsl(157, 100%, 50%)" strokeWidth={1} strokeDasharray="4 4" dot={false} name="P90 upper" />
              <Line type="monotone" dataKey="lower" stroke="hsl(355, 100%, 64%)" strokeWidth={1} strokeDasharray="4 4" dot={false} name="P10 lower" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <ScenarioRow>
          <ScenarioBox variant="pessimistic" label="P10 — yhat_lower" value="~28B TND" desc="scénario Prophet pessimiste 2025" />
          <ScenarioBox variant="realistic" label="P50 — yhat" value="~39.9B TND" desc="projection CAGR 20% maintenu" />
          <ScenarioBox variant="optimistic" label="P90 — yhat_upper" value="~48B TND" desc="accélération + nouveaux clients" />
        </ScenarioRow>

        <SectionLabel>Code Prophet (extrait)</SectionLabel>
        <CodeBlock>{`from prophet import Prophet

df = revenue_history.groupby('year_month')['revenue'].sum()
df = df.rename(columns={'year_month':'ds', 'revenue':'y'})

m = Prophet(yearly_seasonality=True)  # saisonnalité détectée
forecast = m.predict(future_12m)
# → yhat, yhat_lower, yhat_upper par mois 2025`}</CodeBlock>
      </SimCard>

      {/* Monte Carlo */}
      <SimCard title="Monte Carlo — Pipeline CRM (10 000 simulations)" subtitle="Input : 323 opportunités ouvertes · amount total 411M TND · prob. 10%→75% par stage">
        <MetricGrid>
          {pipelineStages.map(s => (
            <Metric key={s.stage} label={s.stage} value={`${s.amount}M TND`} color="blue" />
          ))}
        </MetricGrid>

        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Distribution Monte Carlo (simulations)</SectionLabel>
          <button onClick={runSim} className="text-[10px] px-3 py-1 rounded-md border border-border text-muted-foreground hover:bg-muted/50 transition-colors">
            ▶ Relancer simulation
          </button>
        </div>

        {mcResult && (
          <>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mcResult.bins}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 30%, 18%, 0.8)" />
                  <XAxis dataKey="range" tick={{ fontSize: 9, fill: 'hsl(220, 15%, 55%)' }} interval={2} />
                  <YAxis tick={{ fontSize: 9, fill: 'hsl(220, 15%, 55%)' }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="hsl(190, 100%, 50%)" opacity={0.6} radius={[2, 2, 0, 0]} name="Fréquence" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <ScenarioRow>
              <ScenarioBox variant="pessimistic" label="P10" value={`${mcResult.p10}M`} desc="seuil bas" />
              <ScenarioBox variant="realistic" label="MÉDIANE" value={`${mcResult.p50}M`} desc="résultat probable" />
              <ScenarioBox variant="optimistic" label="P90" value={`${mcResult.p90}M`} desc="scénario haut" />
            </ScenarioRow>
          </>
        )}

        <SectionLabel>Code Monte Carlo</SectionLabel>
        <CodeBlock>{`for _ in range(10_000):
  sim = opp.apply(lambda r: r.amount if rand() < r.prob/100 else 0, axis=1)
  results.append(sim.sum())
P10, P50, P90 = np.percentile(results, [10, 50, 90])`}</CodeBlock>
      </SimCard>

      {/* ML Attrition */}
      <SimCard title="Régression / ML — Prédiction attrition & charge de travail" subtitle="Input : hr_performance_reviews (348 avis) · hr_employees · hr_timesheets">
        <MetricGrid>
          <Metric label="Score moyen employés" value="3.49 / 5" />
          <Metric label="Promotion eligible" value="68 (45%)" color="green" />
          <Metric label="Under Review (risque)" value="110 (32%)" color="red" />
          <Metric label="Goals achieved avg" value="75.5%" color="amber" />
        </MetricGrid>

        <SectionLabel>Features pour modèle attrition (RandomForest)</SectionLabel>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1.5 px-2 text-muted-foreground font-medium">Feature</th>
                <th className="text-left py-1.5 px-2 text-muted-foreground font-medium">Source table</th>
                <th className="text-left py-1.5 px-2 text-muted-foreground font-medium">Signal attendu</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['overall_score', 'performance_reviews', 'Score < 2.5 → risque élevé'],
                ['salary_vs_dept_median', 'employees', 'Sous-payé → risque départ'],
                ['overtime_ratio', 'timesheets', 'Heures sup chroniques → burnout'],
                ['months_no_review', 'performance_reviews', 'Manque suivi → démotivation'],
                ['promotion_eligible=No', 'performance_reviews', 'Blocage carrière → départ'],
                ['contract_type', 'employees', 'Contractor vs Permanent'],
              ].map(([feat, src, signal], i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-1.5 px-2"><code className="text-[10px] font-mono bg-muted/50 px-1.5 py-0.5 rounded">{feat}</code></td>
                  <td className="py-1.5 px-2 text-muted-foreground">{src}</td>
                  <td className="py-1.5 px-2 text-muted-foreground">{signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SimCard>
    </div>
  );
}
