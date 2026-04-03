import { useState } from 'react';
import SimCard, { MetricGrid, Metric, SectionLabel, ScenarioRow, ScenarioBox, BarRow, StepList, InfoBox } from './SimCard';

export default function SimMacro() {
  const [growthShock, setGrowthShock] = useState(15);

  const cagr = 20;
  const ca2024 = 33.2;
  const pessCA = (ca2024 * (1 + (cagr - growthShock) / 100)).toFixed(1);
  const baseCA = (ca2024 * (1 + (cagr - growthShock * 0.8) / 100)).toFixed(1);
  const optiCA = (ca2024 * (1 + cagr / 100)).toFixed(1);

  return (
    <div className="space-y-0">
      {/* Simulation 5: Economic crisis */}
      <SimCard title="Simulation 5 : Crise économique — ralentissement marché" subtitle="Modélisation par choc sur le CAGR observé (20%/an → baisse scénarisée) + impact churn pipeline CRM">
        <MetricGrid>
          <Metric label="CAGR historique réel" value="+20.0%/an" color="green" />
          <Metric label="CA 2022" value="22.0B TND" />
          <Metric label="CA 2023" value="26.5B TND" />
          <Metric label="CA 2024" value="33.2B TND" />
        </MetricGrid>

        <div className="flex items-center gap-2.5 mb-4">
          <label className="text-[11px] text-muted-foreground w-[145px] shrink-0">Choc croissance (pts)</label>
          <input type="range" min={0} max={25} value={growthShock} onChange={e => setGrowthShock(+e.target.value)} className="flex-1 accent-primary" />
          <span className="text-xs font-mono font-medium w-[75px] text-right">-{growthShock}pts</span>
        </div>

        <ScenarioRow>
          <ScenarioBox variant="pessimistic" label={`PESSIMISTE (P10)`} value={`${pessCA}B TND`} desc={`CAGR = ${cagr - growthShock}% — crise sévère`} />
          <ScenarioBox variant="realistic" label="BASE (P50)" value={`${baseCA}B TND`} desc={`CAGR = ${Math.round(cagr - growthShock * 0.8)}% — ralentissement`} />
          <ScenarioBox variant="optimistic" label="OPTIMISTE (P90)" value={`${optiCA}B TND`} desc={`CAGR = ${cagr}% — continuité`} />
        </ScenarioRow>

        <SectionLabel>Propagation macro → micro (via Neo4j)</SectionLabel>
        <BarRow label="Finance (27.8%)" percent={95} value="Impact +++" color="bg-destructive" />
        <BarRow label="Technology (17.7%)" percent={70} value="Impact ++" color="bg-warning" />
        <BarRow label="Consulting (8.6%)" percent={40} value="Impact +" color="bg-warning" />
        <BarRow label="Secteur Public (8.0%)" percent={15} value="Résilient" color="bg-secondary" />

        <div className="mt-3">
          <InfoBox>
            Agents IA : Gemini 2.5 Pro reçoit les paramètres numériques + génère un rapport narratif qualitatif : secteurs à pivoter, clients à prioriser, postes à geler, opportunités de diversification.
          </InfoBox>
        </div>
      </SimCard>

      {/* Simulation 6: Regulation */}
      <SimCard title="Simulation 6 : Nouvelle régulation — conformité obligatoire (ex: RGPD local)" subtitle="Impact sur coûts opérationnels, projets en cours, compétences requises">
        <MetricGrid>
          <Metric label="COÛT CONFORMITÉ" value="+12-18%" color="red" />
          <Metric label="NOUVELLES COMPÉTENCES" value="3-5 profils" color="blue" />
          <Metric label="OPPORTUNITÉ" value="+N projets" color="green" />
        </MetricGrid>
        <div className="text-[10px] text-muted-foreground mb-4">
          <span className="text-destructive">overhead sur projets Finance & Secteur Public</span> · DPO, auditeur SI, juriste IT — pipeline recrutement · conseil conformité = nouveau service Talan
        </div>

        <StepList steps={[
          { title: 'Détection projets impactés :', desc: "requête Cypher sur Project.required_skills contenant \"Security\", \"Compliance\" + client.industry IN ['Finance','SecteurPublic']" },
          { title: 'Gap compétences :', desc: 'hr_skills (606 entrées) → compter profils "RGPD","Audit","Cybersecurity" → identifier manque vs projets futurs' },
          { title: 'Rebudgétisation :', desc: 'hr_projects.budget × 1.15 pour projets impactés → impact sur marge globale → rapport LLM avec recommandations tarifaires' },
        ]} />
      </SimCard>
    </div>
  );
}
