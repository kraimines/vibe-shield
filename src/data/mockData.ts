import type { Employee, Project, Client, Activity, Alert, LeaveRequest, Opportunity, PropagationNode, MonthlyProjection, SimulationResult } from '@/types';

export const employees: Employee[] = [
  { id: '1', firstName: 'Ahmed', lastName: 'Ben Salah', department: 'Engineering', position: 'Senior Developer', projects: ['proj-1', 'proj-3'], performance: 8.4, hoursThisMonth: 142, leaveBalance: 18, skills: [{ name: 'React', score: 90 }, { name: 'Python', score: 85 }, { name: 'DevOps', score: 70 }, { name: 'SQL', score: 80 }, { name: 'Cloud', score: 75 }, { name: 'Agile', score: 88 }] },
  { id: '2', firstName: 'Fatma', lastName: 'Khelifi', department: 'Engineering', position: 'Tech Lead', projects: ['proj-2'], performance: 9.1, hoursThisMonth: 156, leaveBalance: 12, skills: [{ name: 'React', score: 95 }, { name: 'Python', score: 90 }, { name: 'DevOps', score: 85 }, { name: 'SQL', score: 88 }, { name: 'Cloud', score: 80 }, { name: 'Agile', score: 92 }] },
  { id: '3', firstName: 'Mohamed', lastName: 'Trabelsi', department: 'Data', position: 'Data Scientist', projects: ['proj-4'], performance: 7.8, hoursThisMonth: 138, leaveBalance: 22, skills: [{ name: 'React', score: 40 }, { name: 'Python', score: 95 }, { name: 'DevOps', score: 50 }, { name: 'SQL', score: 92 }, { name: 'Cloud', score: 70 }, { name: 'Agile', score: 75 }] },
  { id: '4', firstName: 'Amira', lastName: 'Bouazizi', department: 'Engineering', position: 'Full Stack Developer', projects: ['proj-1', 'proj-5'], performance: 8.7, hoursThisMonth: 148, leaveBalance: 15, skills: [{ name: 'React', score: 88 }, { name: 'Python', score: 75 }, { name: 'DevOps', score: 65 }, { name: 'SQL', score: 82 }, { name: 'Cloud', score: 78 }, { name: 'Agile', score: 85 }] },
  { id: '5', firstName: 'Youssef', lastName: 'Gharbi', department: 'Cloud', position: 'Cloud Architect', projects: ['proj-3', 'proj-6'], performance: 8.9, hoursThisMonth: 152, leaveBalance: 10, skills: [{ name: 'React', score: 60 }, { name: 'Python', score: 70 }, { name: 'DevOps', score: 95 }, { name: 'SQL', score: 75 }, { name: 'Cloud', score: 98 }, { name: 'Agile', score: 80 }] },
  { id: '6', firstName: 'Ines', lastName: 'Maalej', department: 'Design', position: 'UX Designer', projects: ['proj-2', 'proj-4'], performance: 8.2, hoursThisMonth: 140, leaveBalance: 20, skills: [{ name: 'React', score: 50 }, { name: 'Python', score: 30 }, { name: 'DevOps', score: 20 }, { name: 'SQL', score: 35 }, { name: 'Cloud', score: 25 }, { name: 'Agile', score: 90 }] },
  { id: '7', firstName: 'Slim', lastName: 'Hannachi', department: 'Engineering', position: 'Backend Developer', projects: ['proj-5'], performance: 7.5, hoursThisMonth: 160, leaveBalance: 8, skills: [{ name: 'React', score: 45 }, { name: 'Python', score: 88 }, { name: 'DevOps', score: 72 }, { name: 'SQL', score: 90 }, { name: 'Cloud', score: 65 }, { name: 'Agile', score: 78 }] },
  { id: '8', firstName: 'Rim', lastName: 'Chaabane', department: 'PM', position: 'Project Manager', projects: ['proj-1', 'proj-6'], performance: 8.6, hoursThisMonth: 145, leaveBalance: 14, skills: [{ name: 'React', score: 30 }, { name: 'Python', score: 25 }, { name: 'DevOps', score: 35 }, { name: 'SQL', score: 50 }, { name: 'Cloud', score: 40 }, { name: 'Agile', score: 95 }] },
  { id: '9', firstName: 'Karim', lastName: 'Jebali', department: 'Engineering', position: 'DevOps Engineer', projects: ['proj-3'], performance: 8.1, hoursThisMonth: 150, leaveBalance: 16, skills: [{ name: 'React', score: 35 }, { name: 'Python', score: 72 }, { name: 'DevOps', score: 96 }, { name: 'SQL', score: 65 }, { name: 'Cloud', score: 92 }, { name: 'Agile', score: 82 }] },
  { id: '10', firstName: 'Sarra', lastName: 'Ferjani', department: 'Data', position: 'Data Analyst', projects: ['proj-4', 'proj-7'], performance: 7.9, hoursThisMonth: 136, leaveBalance: 19, skills: [{ name: 'React', score: 30 }, { name: 'Python', score: 82 }, { name: 'DevOps', score: 25 }, { name: 'SQL', score: 94 }, { name: 'Cloud', score: 45 }, { name: 'Agile', score: 70 }] },
  { id: '11', firstName: 'Nizar', lastName: 'Bouzid', department: 'Engineering', position: 'Junior Developer', projects: ['proj-2'], performance: 7.2, hoursThisMonth: 155, leaveBalance: 24, skills: [{ name: 'React', score: 70 }, { name: 'Python', score: 55 }, { name: 'DevOps', score: 30 }, { name: 'SQL', score: 60 }, { name: 'Cloud', score: 40 }, { name: 'Agile', score: 65 }] },
  { id: '12', firstName: 'Mariem', lastName: 'Sahli', department: 'Commercial', position: 'Business Analyst', projects: ['proj-7', 'proj-8'], performance: 8.3, hoursThisMonth: 144, leaveBalance: 11, skills: [{ name: 'React', score: 20 }, { name: 'Python', score: 40 }, { name: 'DevOps', score: 15 }, { name: 'SQL', score: 75 }, { name: 'Cloud', score: 30 }, { name: 'Agile', score: 88 }] },
];

export const projects: Project[] = [
  { id: 'proj-1', name: 'Migration Cloud STB', client: 'STB', progress: 72, deadline: '2026-06-30', status: 'on-track', budget: 320000, consumed: 218000, manager: 'Rim Chaabane', team: ['Ahmed Ben Salah', 'Amira Bouazizi'], startDate: '2025-09-01' },
  { id: 'proj-2', name: 'CRM Bancaire BIAT', client: 'BIAT', progress: 45, deadline: '2026-04-15', status: 'at-risk', budget: 280000, consumed: 195000, manager: 'Fatma Khelifi', team: ['Ines Maalej', 'Nizar Bouzid'], startDate: '2025-11-01' },
  { id: 'proj-3', name: 'Infra DevOps Poulina', client: 'Poulina', progress: 88, deadline: '2026-05-01', status: 'on-track', budget: 195000, consumed: 168000, manager: 'Youssef Gharbi', team: ['Karim Jebali', 'Ahmed Ben Salah'], startDate: '2025-07-15' },
  { id: 'proj-4', name: 'Analytics Retail Carrefour', client: 'Carrefour', progress: 35, deadline: '2026-08-30', status: 'on-track', budget: 240000, consumed: 82000, manager: 'Mohamed Trabelsi', team: ['Sarra Ferjani', 'Ines Maalej'], startDate: '2026-01-10' },
  { id: 'proj-5', name: 'ERP Manufacturing CFG', client: 'CFG Group', progress: 60, deadline: '2026-05-20', status: 'delayed', budget: 410000, consumed: 310000, manager: 'Slim Hannachi', team: ['Amira Bouazizi'], startDate: '2025-06-01' },
  { id: 'proj-6', name: 'Portail Digital OTE', client: 'OTE', progress: 92, deadline: '2026-04-10', status: 'on-track', budget: 175000, consumed: 158000, manager: 'Rim Chaabane', team: ['Youssef Gharbi'], startDate: '2025-08-20' },
  { id: 'proj-7', name: 'BI Dashboard Amen Bank', client: 'Amen Bank', progress: 18, deadline: '2026-10-15', status: 'on-track', budget: 190000, consumed: 32000, manager: 'Sarra Ferjani', team: ['Mohamed Trabelsi', 'Mariem Sahli'], startDate: '2026-02-01' },
  { id: 'proj-8', name: 'App Mobile Attijari', client: 'Attijari Bank', progress: 55, deadline: '2026-07-01', status: 'at-risk', budget: 350000, consumed: 220000, manager: 'Mariem Sahli', team: ['Fatma Khelifi'], startDate: '2025-10-15' },
];

export const clients: Client[] = [
  { id: 'c1', name: 'STB', sector: 'Banque', revenue: 850000, trend: 12.3, projects: 2 },
  { id: 'c2', name: 'BIAT', sector: 'Banque', revenue: 620000, trend: 8.7, projects: 1 },
  { id: 'c3', name: 'Poulina', sector: 'Industrie', revenue: 480000, trend: -2.1, projects: 1 },
  { id: 'c4', name: 'Carrefour', sector: 'Retail', revenue: 390000, trend: 15.4, projects: 1 },
  { id: 'c5', name: 'OTE', sector: 'Telecom', revenue: 320000, trend: 5.8, projects: 1 },
];

export const revenueData = [
  { month: 'Jan', facture: 310, encaisse: 280 },
  { month: 'Fév', facture: 340, encaisse: 310 },
  { month: 'Mar', facture: 420, encaisse: 370 },
  { month: 'Avr', facture: 380, encaisse: 350 },
  { month: 'Mai', facture: 395, encaisse: 360 },
  { month: 'Jun', facture: 365, encaisse: 340 },
  { month: 'Jul', facture: 350, encaisse: 330 },
  { month: 'Aoû', facture: 310, encaisse: 290 },
  { month: 'Sep', facture: 390, encaisse: 365 },
  { month: 'Oct', facture: 410, encaisse: 380 },
  { month: 'Nov', facture: 370, encaisse: 345 },
  { month: 'Déc', facture: 360, encaisse: 330 },
];

export const timesheetData = [
  { day: 'Lun', hours: 8.5 },
  { day: 'Mar', hours: 7.0 },
  { day: 'Mer', hours: 9.0 },
  { day: 'Jeu', hours: 8.0 },
  { day: 'Ven', hours: 6.5 },
];

export const activities: Activity[] = [
  { id: 'a1', type: 'commit', text: 'Push sur branch feature/auth-module', time: 'Il y a 25 min' },
  { id: 'a2', type: 'meeting', text: 'Daily standup — Équipe Cloud', time: 'Il y a 2h' },
  { id: 'a3', type: 'delivery', text: 'Livrable Sprint 14 validé par le client STB', time: 'Il y a 4h' },
  { id: 'a4', type: 'leave', text: 'Congé approuvé : 15-17 Avril', time: 'Hier' },
  { id: 'a5', type: 'commit', text: 'Merge PR #142 — Fix pagination API', time: 'Hier' },
  { id: 'a6', type: 'meeting', text: 'Rétrospective Sprint 13', time: 'Il y a 2 jours' },
];

export const alerts: Alert[] = [
  { id: 'al1', type: 'warning', text: '3 demandes de congés en attente d\'approbation', action: 'Traiter' },
  { id: 'al2', type: 'danger', text: 'Projet CRM BIAT en retard de 12 jours', action: 'Voir détails' },
  { id: 'al3', type: 'danger', text: 'Slim Hannachi à 107% de capacité cette semaine', action: 'Réaffecter' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'lr1', employeeName: 'Ahmed Ben Salah', type: 'Congé annuel', startDate: '2026-04-15', endDate: '2026-04-17', days: 3, status: 'pending' },
  { id: 'lr2', employeeName: 'Ines Maalej', type: 'Congé maladie', startDate: '2026-04-10', endDate: '2026-04-11', days: 2, status: 'pending' },
  { id: 'lr3', employeeName: 'Nizar Bouzid', type: 'Congé annuel', startDate: '2026-04-20', endDate: '2026-04-25', days: 5, status: 'pending' },
];

export const teamWorkload = [
  { name: 'A. Ben Salah', load: 85 },
  { name: 'F. Khelifi', load: 92 },
  { name: 'M. Trabelsi', load: 68 },
  { name: 'A. Bouazizi', load: 78 },
  { name: 'Y. Gharbi', load: 95 },
  { name: 'I. Maalej', load: 72 },
  { name: 'S. Hannachi', load: 107 },
  { name: 'R. Chaabane', load: 88 },
  { name: 'K. Jebali', load: 80 },
  { name: 'S. Ferjani', load: 65 },
  { name: 'N. Bouzid', load: 74 },
  { name: 'M. Sahli', load: 83 },
];

export const opportunities: Opportunity[] = [
  { stage: 'Lead', count: 24, value: 1800 },
  { stage: 'Qualifié', count: 15, value: 1200 },
  { stage: 'Proposition', count: 8, value: 780 },
  { stage: 'Négociation', count: 5, value: 520 },
  { stage: 'Gagné', count: 3, value: 340 },
];

export const sectorRevenue = [
  { name: 'Banque', value: 1470, color: 'hsl(190, 100%, 50%)' },
  { name: 'Industrie', value: 480, color: 'hsl(157, 100%, 50%)' },
  { name: 'Retail', value: 390, color: 'hsl(38, 100%, 50%)' },
  { name: 'Telecom', value: 320, color: 'hsl(280, 80%, 60%)' },
  { name: 'Autres', value: 540, color: 'hsl(220, 15%, 45%)' },
];

export const profitabilityData = [
  { name: 'Cloud STB', budget: 320, actual: 218, team: 4 },
  { name: 'CRM BIAT', budget: 280, actual: 195, team: 3 },
  { name: 'DevOps Poulina', budget: 195, actual: 168, team: 3 },
  { name: 'Analytics Carrefour', budget: 240, actual: 82, team: 3 },
  { name: 'ERP CFG', budget: 410, actual: 310, team: 2 },
  { name: 'Digital OTE', budget: 175, actual: 158, team: 2 },
  { name: 'BI Amen', budget: 190, actual: 32, team: 3 },
  { name: 'Mobile Attijari', budget: 350, actual: 220, team: 2 },
];

export const propagationNodes: PropagationNode[] = [
  { id: 'n1', label: 'STB', type: 'client', x: 400, y: 80, impacted: true, connections: ['n3', 'n4'] },
  { id: 'n2', label: 'BIAT', type: 'client', x: 600, y: 120, impacted: false, connections: ['n5'] },
  { id: 'n3', label: 'Migration Cloud', type: 'project', x: 250, y: 180, impacted: true, connections: ['n7', 'n8'] },
  { id: 'n4', label: 'Support STB', type: 'project', x: 500, y: 200, impacted: true, connections: ['n9'] },
  { id: 'n5', label: 'CRM BIAT', type: 'project', x: 650, y: 220, impacted: false, connections: ['n10'] },
  { id: 'n6', label: 'Dept. Engineering', type: 'department', x: 150, y: 300, impacted: true, connections: ['n11'] },
  { id: 'n7', label: 'Ahmed B.S.', type: 'employee', x: 200, y: 300, impacted: true, connections: ['n6'] },
  { id: 'n8', label: 'Amira B.', type: 'employee', x: 320, y: 320, impacted: true, connections: ['n6'] },
  { id: 'n9', label: 'Rim C.', type: 'employee', x: 480, y: 310, impacted: true, connections: [] },
  { id: 'n10', label: 'Fatma K.', type: 'employee', x: 620, y: 330, impacted: false, connections: [] },
  { id: 'n11', label: 'Impact CA', type: 'finance', x: 300, y: 400, impacted: true, connections: [] },
];

export const monthlyProjections: MonthlyProjection[] = [
  { month: 'Avr', current: 380, pessimistic: 340, realistic: 360, optimistic: 375 },
  { month: 'Mai', current: 395, pessimistic: 310, realistic: 345, optimistic: 380 },
  { month: 'Jun', current: 365, pessimistic: 280, realistic: 320, optimistic: 355 },
  { month: 'Jul', current: 350, pessimistic: 260, realistic: 305, optimistic: 340 },
  { month: 'Aoû', current: 310, pessimistic: 240, realistic: 285, optimistic: 305 },
  { month: 'Sep', current: 390, pessimistic: 270, realistic: 320, optimistic: 370 },
  { month: 'Oct', current: 410, pessimistic: 300, realistic: 350, optimistic: 395 },
  { month: 'Nov', current: 370, pessimistic: 310, realistic: 345, optimistic: 365 },
  { month: 'Déc', current: 360, pessimistic: 320, realistic: 350, optimistic: 360 },
  { month: 'Jan', current: 380, pessimistic: 340, realistic: 365, optimistic: 380 },
  { month: 'Fév', current: 390, pessimistic: 355, realistic: 378, optimistic: 390 },
  { month: 'Mar', current: 400, pessimistic: 370, realistic: 390, optimistic: 400 },
];

export const defaultSimulationResult: SimulationResult = {
  scenario: 'Perte du client STB (30%)',
  pessimistic: { revenueImpact: -18, projectsAtRisk: 4, employeesAffected: 8, recoveryMonths: 14 },
  realistic: { revenueImpact: -11, projectsAtRisk: 2, employeesAffected: 5, recoveryMonths: 9 },
  optimistic: { revenueImpact: -6, projectsAtRisk: 1, employeesAffected: 3, recoveryMonths: 5 },
  aiAnalysis: `## Analyse d'Impact — Perte Client STB (30%)

**Résumé exécutif** : La perte de 30% du chiffre d'affaires lié au client STB représente un impact significatif sur l'activité de Talan Tunisie. Le département Engineering serait le plus touché, avec 2 projets directement impactés et une cascade d'effets sur la charge de travail.

### Impact Financier
- **Perte directe estimée** : 255 000 TND sur l'année en cours
- **Marge opérationnelle** : réduction de 3.2 points
- **Trésorerie** : tension à partir du mois 3 sans action corrective

### Impact RH
- **8 collaborateurs** potentiellement impactés en scénario pessimiste
- Risque de sous-charge pour l'équipe Cloud (3 personnes)
- Nécessité de réaffectation sous 45 jours

### Projets à Risque
1. **Migration Cloud STB** — arrêt probable (72% avancement)
2. **Support STB récurrent** — perte contractuelle
3. **Infra DevOps Poulina** — impact indirect (ressources partagées)

### Recommandations
- **Accélérer le pipeline commercial** sur le secteur bancaire (BIAT, Amen Bank)
- **Diversifier les secteurs** : augmenter la part Industrie et Telecom de 15%
- **Plan de réaffectation RH** : redéployer les équipes STB vers le projet Attijari sous 30 jours`,
  recommendations: [
    { scenario: 'Pessimiste', risk: 'critical', actions: ['Gel des recrutements immédiat', 'Réduction budget opérationnel de 20%', 'Plan de sauvegarde des emplois'] },
    { scenario: 'Réaliste', risk: 'high', actions: ['Accélération pipeline CRM (+30% prospection)', 'Réaffectation équipe STB vers Attijari', 'Renégociation contrats fournisseurs'] },
    { scenario: 'Optimiste', risk: 'medium', actions: ['Diversification client secteur Telecom', 'Upsell sur clients existants (BIAT +15%)', 'Investissement formation équipe Data'] },
  ],
  propagationNodes,
  projections: monthlyProjections,
};

export const chatResponses: Record<string, { content: string; agent: 'rh' | 'crm' | 'erp' | 'rag' }> = {
  congés: {
    agent: 'rh',
    content: `**Solde de congés — Ahmed Ben Salah**\n\n- Congés annuels restants : **18 jours**\n- Congés pris ce trimestre : 5 jours\n- Prochaine période de pointe : Juillet (3 demandes dans l'équipe)\n\nVous pouvez soumettre une demande directement via le portail RH.`,
  },
  projets: {
    agent: 'erp',
    content: `**Vos projets actifs :**\n\n1. **Migration Cloud STB** — Avancement 72%, deadline 30 juin\n   - Statut : ✅ En bonne voie\n   - Prochaine milestone : Livraison module auth\n\n2. **Infra DevOps Poulina** — Avancement 88%, deadline 1er mai\n   - Statut : ✅ Quasi terminé\n   - Reste : tests de charge et documentation\n\n3. **ERP Manufacturing CFG** — Avancement 60%, deadline 20 mai\n   - Statut : ⚠️ En retard\n   - Risque : dépendance API tierce non résolue`,
  },
  clients: {
    agent: 'crm',
    content: `**Top 5 Clients par Chiffre d'Affaires :**\n\n| Client | CA (TND) | Variation |\n|--------|----------|----------|\n| STB | 850 000 | +12.3% |\n| BIAT | 620 000 | +8.7% |\n| Poulina | 480 000 | -2.1% |\n| Carrefour | 390 000 | +15.4% |\n| OTE | 320 000 | +5.8% |\n\n**Total YTD : 4.2M TND** (+12.3% vs N-1)`,
  },
  performance: {
    agent: 'rh',
    content: `**Métriques de Performance — Q1 2026**\n\n- Score global : **8.4 / 10** (+0.3 vs Q4)\n- Objectifs atteints : 87%\n- Feedback manager : "Excellent travail sur le module Cloud"\n- Points forts : Expertise React, collaboration équipe\n- Axes d'amélioration : Documentation technique\n\nProchaine évaluation : 15 Avril 2026`,
  },
  factures: {
    agent: 'erp',
    content: `**Statut Factures :**\n\n- Factures émises ce mois : **12** (total 380 000 TND)\n- Factures impayées > 30 jours : **3** (total 95 000 TND)\n  - STB #F-2026-089 : 42 000 TND (45 jours)\n  - Poulina #F-2026-076 : 28 000 TND (38 jours)\n  - OTE #F-2026-091 : 25 000 TND (32 jours)\n\n**Taux de recouvrement** : 78% (objectif 85%)`,
  },
  default: {
    agent: 'rag',
    content: `Je comprends votre demande. Après analyse de la base documentaire Talan, voici ce que j'ai trouvé :\n\nCette requête nécessite une analyse plus approfondie. Je vous suggère de :\n1. Préciser votre question pour un meilleur résultat\n2. Consulter le dashboard pertinent pour les données en temps réel\n3. Utiliser le simulateur pour des projections stratégiques\n\nPuis-je vous aider autrement ?`,
  },
};

export const quickSuggestions = [
  'Montre-moi mes projets actifs',
  'Solde de congés restants',
  'Performance équipe ce trimestre',
  'Top clients par revenu',
  'Simule la perte du client STB',
  'Statut factures impayées',
];
