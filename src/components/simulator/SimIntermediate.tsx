import { useState } from 'react';
import SimCard, { MetricGrid, Metric, SectionLabel, ScenarioRow, ScenarioBox, StepList } from './SimCard';

export default function SimIntermediate() {
  const [clientLossPercent, setClientLossPercent] = useState(20);
  const [projectBudget, setProjectBudget] = useState(669);
  const [projectDuration, setProjectDuration] = useState(9);

  const caFinance2024 = 8.67;
  const lostRevenue = (caFinance2024 * clientLossPercent / 100).toFixed(2);
  const projectsAtRisk = Math.round(clientLossPercent / 5);
  const employeesAffected = Math.round(clientLossPercent * 0.7);

  const etpNeeded = Math.round(projectBudget / 130);
  const weeklyHours = etpNeeded * 40;
  const margin = Math.round(38 + (projectBudget - 669) * 0.01);

  return (
    <div className="space-y-0">
      {/* Simulation 3: Client loss */}
      <SimCard title="Simulation 3 : Perte d'un client majeur secteur Finance" subtitle="Source : crm_revenue_history · crm_accounts · hr_projects · Neo4j propagation cascade">
        <MetricGrid>
          <Metric label="Finance = % du CA total" value="27.8%" color="blue" />
          <Metric label="CA Finance 2024" value="8.67B TND" />
          <Metric label="Clients Finance actifs" value="~18 comptes" />
          <Metric label="CA moyen / client Finance" value="481M TND" />
        </MetricGrid>

        <div className="flex items-center gap-2.5 mb-4">
          <label className="text-[11px] text-muted-foreground w-[145px] shrink-0">% clients Finance perdus</label>
          <input type="range" min={5} max={50} value={clientLossPercent} onChange={e => setClientLossPercent(+e.target.value)} className="flex-1 accent-primary" />
          <span className="text-xs font-mono font-medium w-[75px] text-right">{clientLossPercent}%</span>
        </div>

        <ScenarioRow>
          <ScenarioBox variant="pessimistic" label="IMPACT REVENUS" value={`-${lostRevenue}B TND`} desc="sur CA annuel 2024" />
          <ScenarioBox variant="realistic" label="PROJETS À RISQUE" value={`~${projectsAtRisk} projets`} desc="arrêt ou gel immédiat" />
          <ScenarioBox variant="optimistic" label="EMPLOYÉS AFFECTÉS" value={`~${employeesAffected} ETP`} desc="réaffectation nécessaire" />
        </ScenarioRow>

        <SectionLabel>Propagation Neo4j — chaîne causale</SectionLabel>
        <div className="overflow-x-auto mb-2">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1.5 px-2 text-muted-foreground font-medium">Nœud Neo4j</th>
                <th className="text-left py-1.5 px-2 text-muted-foreground font-medium">Requête Cypher</th>
                <th className="text-left py-1.5 px-2 text-muted-foreground font-medium">Résultat estimé</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Account Finance', "MATCH (a:Account {industry:'Finance'}) WHERE a.churn=true", '3-4 comptes affectés'],
                ['Project liés', 'MATCH (p:Project)-[:FOR_CLIENT]->(a)', '3-5 projets gelés'],
                ['Employee assignés', 'MATCH (e:Employee)-[:ASSIGNED_TO]->(p)', '12-16 ETP à réaffecter'],
                ['Opportunity CRM', "MATCH (o:Opportunity {stage:'Negotiation'})-[:WITH]->(a)", 'deals en pipeline à risque'],
                ['Impact récurrent', 'recurring_revenue = 69.2% du CA', 'perte durable, pas ponctuelle'],
              ].map(([node, query, result], i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-1.5 px-2 text-foreground">{node}</td>
                  <td className="py-1.5 px-2"><code className="text-[10px] font-mono bg-muted/50 px-1.5 py-0.5 rounded">{query}</code></td>
                  <td className="py-1.5 px-2 text-muted-foreground">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SimCard>

      {/* Simulation 4: New project */}
      <SimCard title="Simulation 4 : Ajout d'un nouveau projet Technology" subtitle="Source : hr_projects budget avg 669K TND · hr_employee_projects · hr_timesheets">
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-2.5">
            <label className="text-[11px] text-muted-foreground w-[145px] shrink-0">Budget projet (K TND)</label>
            <input type="range" min={200} max={1500} step={50} value={projectBudget} onChange={e => setProjectBudget(+e.target.value)} className="flex-1 accent-primary" />
            <span className="text-xs font-mono font-medium w-[75px] text-right">{projectBudget}K</span>
          </div>
          <div className="flex items-center gap-2.5">
            <label className="text-[11px] text-muted-foreground w-[145px] shrink-0">Durée (mois)</label>
            <input type="range" min={3} max={24} value={projectDuration} onChange={e => setProjectDuration(+e.target.value)} className="flex-1 accent-primary" />
            <span className="text-xs font-mono font-medium w-[75px] text-right">{projectDuration} mois</span>
          </div>
        </div>

        <MetricGrid>
          <Metric label="Revenus générés" value={`+${projectBudget}K TND`} color="green" />
          <Metric label="ETP nécessaires" value={`~${etpNeeded} ETP`} color="blue" />
          <Metric label="Charge hebdo ajoutée" value={`+${weeklyHours}h/sem`} color="amber" />
          <Metric label="Marge estimée" value={`~${margin}%`} color="green" />
        </MetricGrid>

        <StepList steps={[
          { title: 'Vérification capacité disponible :', desc: 'comparer charge actuelle (planned_hours vs capacity_hours_per_week) par département → identifier ETP disponibles.' },
          { title: 'Matching compétences :', desc: 'hr_skills (606 entrées) × projects.required_skills (ex: "AWS; Python; Kubernetes") → score de compatibilité.' },
          { title: 'Alerte surcharge :', desc: 'si charge ajoutée > 85% capacité dept → recommandation recrutement ou sous-traitance (coût hourly_cost × heures manquantes).' },
        ]} />
      </SimCard>
    </div>
  );
}
