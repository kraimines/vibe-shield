import { Briefcase, CalendarDays, Clock, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import KPICard from '@/components/dashboard/KPICard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { employees, projects, timesheetData } from '@/data/mockData';
import { useRole } from '@/hooks/useRole';
import { motion } from 'framer-motion';

const statusColors: Record<string, string> = {
  'on-track': 'text-secondary bg-secondary/10',
  'at-risk': 'text-amber-400 bg-amber-400/10',
  'completed': 'text-primary bg-primary/10',
  'delayed': 'text-destructive bg-destructive/10',
};

const statusLabels: Record<string, string> = {
  'on-track': 'En cours',
  'at-risk': 'À risque',
  'completed': 'Terminé',
  'delayed': 'En retard',
};

export default function EmployeeDashboard() {
  const { user } = useRole();
  const employee = employees[0];
  const myProjects = projects.slice(0, 3);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-xl font-display font-bold text-foreground">
          Bonjour, {user?.name?.split(' ')[0] || 'Ahmed'} 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} · En poste
        </p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard title="Projets actifs" value={3} icon={Briefcase} color="cyan" delay={0.1} />
        <KPICard title="Congés restants" value={employee.leaveBalance} suffix=" jours" icon={CalendarDays} color="green" delay={0.2} />
        <KPICard title="Heures ce mois" value={employee.hoursThisMonth} suffix="/160h" icon={Clock} color="amber" delay={0.3} />
        <KPICard title="Score performance" value={employee.performance} suffix="/10" icon={Star} color="cyan" delay={0.4} decimals={1} />
      </div>

      {/* Projects + Activity */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="col-span-3 glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Mes Projets Actifs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Projet</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Client</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Avancement</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Deadline</th>
                  <th className="text-left py-2 text-muted-foreground font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {myProjects.map(project => (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-2.5 text-foreground font-medium">{project.name}</td>
                    <td className="py-2.5 text-muted-foreground">{project.client}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground font-mono">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-muted-foreground font-mono">
                      {new Date(project.deadline).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${statusColors[project.status]}`}>
                        {statusLabels[project.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-2">
          <ActivityFeed />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Heures cette semaine</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timesheetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 30%, 18%, 0.8)" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} domain={[0, 10]} />
                <Tooltip contentStyle={{ background: 'hsl(220, 35%, 10%)', border: '1px solid hsla(190, 100%, 50%, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="hours" fill="hsla(190, 100%, 50%, 0.6)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Compétences</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={employee.skills}>
                <PolarGrid stroke="hsla(220, 30%, 25%, 0.6)" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 9, fill: 'hsl(220, 15%, 55%)' }} />
                <PolarRadiusAxis tick={false} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="hsl(190, 100%, 50%)" fill="hsla(190, 100%, 50%, 0.15)" strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Prochains événements</h3>
          <div className="space-y-3">
            {[
              { date: '31 Mar', title: 'Sprint Review — Cloud STB', type: 'meeting' },
              { date: '02 Avr', title: 'Formation React Avancé', type: 'training' },
              { date: '05 Avr', title: 'Code Review — Module Auth', type: 'review' },
              { date: '10 Avr', title: 'Deadline livrable Sprint 15', type: 'deadline' },
            ].map((event, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors">
                <div className="w-10 text-center">
                  <span className="text-[10px] text-muted-foreground block">{event.date.split(' ')[1]}</span>
                  <span className="text-sm font-mono font-bold text-foreground">{event.date.split(' ')[0]}</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <span className="text-xs text-foreground">{event.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
