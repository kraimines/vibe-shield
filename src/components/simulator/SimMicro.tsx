import { useState } from 'react';
import SimCard, { MetricGrid, Metric, SectionLabel, BarRow, StepList, InfoBox } from './SimCard';

export default function SimMicro() {
  const [recruits, setRecruits] = useState(4);
  const [seniority, setSeniority] = useState<'junior' | 'mid' | 'senior'>('mid');

  const seniorityDays = { junior: 67, mid: 73, senior: 87 };
  const salaryPerRecruit = 93587;
  const recruitCost = Math.round(recruits * 4750);
  const totalSalary = Math.round(recruits * salaryPerRecruit / 1000);
  const capacityAdded = recruits * 160;

  return (
    <div className="space-y-0">
      {/* Simulation 1: Recruitment */}
      <SimCard title="Simulation 1 : Recruter une équipe Data Engineering" subtitle="Paramètres extraits de hr_employees · hr_recruitment_pipeline · hr_timesheets">
        {/* Sliders */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-2.5">
            <label className="text-[11px] text-muted-foreground w-[145px] shrink-0">Nombre de recrues</label>
            <input type="range" min={1} max={10} value={recruits} onChange={e => setRecruits(+e.target.value)} className="flex-1 accent-primary" />
            <span className="text-xs font-mono font-medium w-[75px] text-right">{recruits}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <label className="text-[11px] text-muted-foreground w-[145px] shrink-0">Seniority</label>
            <select
              value={seniority}
              onChange={e => setSeniority(e.target.value as 'junior' | 'mid' | 'senior')}
              className="flex-1 text-xs bg-muted/50 border border-border rounded-lg px-2 py-1 text-foreground"
            >
              <option value="junior">Junior (67 jours avg)</option>
              <option value="mid">Mid (73 jours avg)</option>
              <option value="senior">Senior (87 jours avg)</option>
            </select>
            <span className="text-xs font-mono font-medium w-[75px] text-right">{seniorityDays[seniority]}j</span>
          </div>
        </div>

        <MetricGrid>
          <Metric label="Coût salaires/an" value={`${totalSalary} K TND`} color="blue" />
          <Metric label="Coût recrutement" value={`~${recruitCost / 1000}K TND`} />
          <Metric label="Délai opérationnel" value={`${seniorityDays[seniority]} jours`} color="amber" />
          <Metric label="Capacité ajoutée" value={`+${capacityAdded} h/sem`} color="green" />
        </MetricGrid>

        <SectionLabel>Charge équipes actuelles — avant recrutement (depuis timesheets)</SectionLabel>
        <BarRow label="Dept Data (DEP009)" percent={88} value="88%" />
        <BarRow label="Dept Tech (DEP006)" percent={76} value="76%" />
        <BarRow label="Dept Dev (DEP010)" percent={65} value="65%" />

        <SectionLabel>Chronologie du recrutement</SectionLabel>
        <div className="relative pl-7 border-l border-border/50 ml-2 space-y-3.5 mb-2">
          {[
            { week: 'J+0 — Publication poste', text: `Ouverture hr_recruitment_pipeline · budget salary_budget ≈ ${salaryPerRecruit.toLocaleString()} TND par poste Data Engineer (avg observé)` },
            { week: 'J+30 — Screening', text: 'En moyenne 17 candidats par poste Data Engineer Junior (données réelles pipeline)' },
            { week: `J+${seniorityDays[seniority]} — Recrutés opérationnels`, text: `Capacité +${160} h/semaine par recrue · hourly_cost ≈ 45 TND/h · coût projet facturé au client` },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[29px] top-[3px] w-2.5 h-2.5 rounded-full bg-primary/20 border-2 border-primary/50" />
              <div className="text-[10px] font-medium text-muted-foreground mb-0.5">{item.week}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{item.text}</div>
            </div>
          ))}
        </div>
      </SimCard>

      {/* Simulation 2: Timesheet automation */}
      <SimCard title="Simulation 2 : Automatisation du processus de validation timesheets" subtitle="Source : hr_timesheets — 887 entrées · planned vs actual · overtime analysis">
        <MetricGrid>
          <Metric label="Heures plannifiées/sem" value="25.3h" color="blue" />
          <Metric label="Heures réelles/sem" value="25.3h" />
          <Metric label="Overtime moyen/sem" value="1.5h" color="amber" />
          <Metric label="Écart planned vs actual" value="0.05%" color="green" />
        </MetricGrid>

        <SectionLabel>Impact de l'automatisation — scénario validation auto si écart &lt; 5%</SectionLabel>
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
            <div className="text-[10px] text-destructive font-medium mb-1">SANS automation</div>
            <div className="text-base font-mono font-medium text-foreground">~4.5h</div>
            <div className="text-[10px] text-muted-foreground mt-1">par manager/semaine pour révision manuelle</div>
          </div>
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3">
            <div className="text-[10px] text-secondary font-medium mb-1">AVEC automation</div>
            <div className="text-base font-mono font-medium text-foreground">~0.5h</div>
            <div className="text-[10px] text-muted-foreground mt-1">exception handling seulement</div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <div className="text-[10px] text-primary font-medium mb-1">Gain annuel</div>
            <div className="text-base font-mono font-medium text-foreground">+1 040h</div>
            <div className="text-[10px] text-muted-foreground mt-1">≈ 0.5 ETP libéré par an</div>
          </div>
        </div>

        <StepList steps={[
          { title: 'Règle auto-approbation :', desc: 'si |actual - planned| / planned < 5% ET overtime_hours < 3h → statut Approved automatiquement. Représente ~62% des 887 entrées actuelles.' },
          { title: 'Alerte manager :', desc: 'si overtime > 8h (cas extrêmes dans les données : max 14.2h) → notification push + explication requise.' },
          { title: 'Prédiction dépassement :', desc: 'régression sur historique project_id → estimer les semaines à risque overtime avant qu\'elles arrivent.' },
        ]} />
      </SimCard>
    </div>
  );
}
