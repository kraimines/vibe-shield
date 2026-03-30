import { Users, Percent, AlertTriangle, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import KPICard from '@/components/dashboard/KPICard';
import AlertPanel from '@/components/dashboard/AlertPanel';
import { teamWorkload, leaveRequests, projects } from '@/data/mockData';
import { motion } from 'framer-motion';
import { useState } from 'react';

const getLoadColor = (load: number) => {
  if (load > 100) return 'hsla(355, 100%, 64%, 0.7)';
  if (load > 80) return 'hsla(38, 100%, 50%, 0.7)';
  return 'hsla(157, 100%, 50%, 0.7)';
};

export default function ManagerDashboard() {
  const [requests, setRequests] = useState(leaveRequests);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-xl font-display font-bold text-foreground">Dashboard Manager</h1>
        <p className="text-sm text-muted-foreground">Vue d'ensemble de votre équipe</p>
      </motion.div>

      <AlertPanel />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard title="Taille équipe" value={12} icon={Users} color="cyan" delay={0.1} />
        <KPICard title="Taux occupation" value={87} suffix="%" icon={Percent} color="green" delay={0.2} />
        <KPICard title="Projets en retard" value={2} icon={AlertTriangle} color="red" delay={0.3} />
        <KPICard title="Budget consommé" value={64} suffix="%" icon={Wallet} color="amber" delay={0.4} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Charge de l'équipe</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamWorkload} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 30%, 18%, 0.8)" />
                <XAxis type="number" domain={[0, 120]} tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} width={70} />
                <Tooltip contentStyle={{ background: 'hsl(220, 35%, 10%)', border: '1px solid hsla(190, 100%, 50%, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="load" radius={[0, 4, 4, 0]}>
                  {teamWorkload.map((entry, i) => (
                    <Cell key={i} fill={getLoadColor(entry.load)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Demandes en attente</h3>
          <div className="space-y-3">
            {requests.map(req => (
              <div key={req.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {req.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{req.employeeName}</p>
                    <p className="text-[10px] text-muted-foreground">{req.type} · {req.days} jours · {req.startDate}</p>
                  </div>
                </div>
                {req.status === 'pending' ? (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleAction(req.id, 'approved')}
                      className="px-2.5 py-1 rounded text-[10px] font-medium bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors"
                    >
                      ✓ Approuver
                    </button>
                    <button
                      onClick={() => handleAction(req.id, 'rejected')}
                      className="px-2.5 py-1 rounded text-[10px] font-medium bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                    >
                      ✗ Refuser
                    </button>
                  </div>
                ) : (
                  <span className={`text-[10px] px-2 py-0.5 rounded ${
                    req.status === 'approved' ? 'bg-secondary/20 text-secondary' : 'bg-destructive/20 text-destructive'
                  }`}>
                    {req.status === 'approved' ? 'Approuvé' : 'Refusé'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects timeline */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-sm font-display font-semibold text-foreground mb-4">Avancement Projets</h3>
        <div className="space-y-3">
          {projects.map(project => (
            <div key={project.id} className="flex items-center gap-4">
              <div className="w-40 flex-shrink-0">
                <p className="text-xs font-medium text-foreground truncate">{project.name}</p>
                <p className="text-[10px] text-muted-foreground">{project.client}</p>
              </div>
              <div className="flex-1 relative">
                <div className="h-6 rounded bg-muted/30 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded flex items-center justify-end pr-2 ${
                      project.status === 'delayed' ? 'bg-destructive/30' :
                      project.status === 'at-risk' ? 'bg-amber-400/30' :
                      'bg-primary/30'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-foreground">{project.progress}%</span>
                  </motion.div>
                </div>
              </div>
              <div className="w-20 text-right">
                <span className="text-[10px] text-muted-foreground font-mono">
                  {new Date(project.deadline).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
