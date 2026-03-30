import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SimulationResult } from '@/types';

export default function ImpactChart({ result }: { result: SimulationResult }) {
  const data = [
    {
      metric: 'CA Impacté (%)',
      Pessimiste: Math.abs(result.pessimistic.revenueImpact),
      Réaliste: Math.abs(result.realistic.revenueImpact),
      Optimiste: Math.abs(result.optimistic.revenueImpact),
    },
    {
      metric: 'Projets à risque',
      Pessimiste: result.pessimistic.projectsAtRisk,
      Réaliste: result.realistic.projectsAtRisk,
      Optimiste: result.optimistic.projectsAtRisk,
    },
    {
      metric: 'Employés affectés',
      Pessimiste: result.pessimistic.employeesAffected,
      Réaliste: result.realistic.employeesAffected,
      Optimiste: result.optimistic.employeesAffected,
    },
    {
      metric: 'Récupération (mois)',
      Pessimiste: result.pessimistic.recoveryMonths,
      Réaliste: result.realistic.recoveryMonths,
      Optimiste: result.optimistic.recoveryMonths,
    },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 30%, 18%, 0.8)" />
          <XAxis dataKey="metric" tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
          <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
          <Tooltip
            contentStyle={{
              background: 'hsl(220, 35%, 10%)',
              border: '1px solid hsla(190, 100%, 50%, 0.2)',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="Pessimiste" fill="hsla(355, 100%, 64%, 0.7)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Réaliste" fill="hsla(38, 100%, 50%, 0.7)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Optimiste" fill="hsla(157, 100%, 50%, 0.7)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
