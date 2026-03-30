import { DollarSign, TrendingUp, Target, ThumbsUp, BarChart3 } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, ScatterChart, Scatter, ZAxis,
} from 'recharts';
import KPICard from '@/components/dashboard/KPICard';
import { revenueData, clients, opportunities, sectorRevenue, profitabilityData } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function DirectionDashboard() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Hero metric */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6 mb-6 text-center glow-cyan"
      >
        <p className="text-xs text-muted-foreground mb-1">Chiffre d'Affaires YTD</p>
        <h1 className="text-4xl font-mono font-bold text-gradient-cyan">4.2M TND</h1>
        <span className="text-sm text-secondary font-mono">↑ +12.3% vs N-1</span>
      </motion.div>

      {/* 5 KPIs */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        <KPICard title="CA Total" value={4.2} suffix="M" icon={DollarSign} color="cyan" delay={0.1} decimals={1} />
        <KPICard title="Taux recouvrement" value={78} suffix="%" icon={TrendingUp} color="amber" delay={0.15} />
        <KPICard title="Pipeline" value={24} suffix=" opps" icon={Target} color="green" delay={0.2} />
        <KPICard title="NPS Clients" value={72} icon={ThumbsUp} color="cyan" delay={0.25} />
        <KPICard title="Rentabilité moy." value={23} suffix="%" icon={BarChart3} color="green" delay={0.3} />
      </div>

      {/* Revenue chart */}
      <div className="glass-card rounded-xl p-4 mb-6">
        <h3 className="text-sm font-display font-semibold text-foreground mb-4">Évolution CA Mensuel (k TND)</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="facture" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="encaisse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(157, 100%, 50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(157, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 30%, 18%, 0.8)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
              <Tooltip contentStyle={{ background: 'hsl(220, 35%, 10%)', border: '1px solid hsla(190, 100%, 50%, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="facture" stroke="hsl(190, 100%, 50%)" fill="url(#facture)" strokeWidth={2} name="Facturé" />
              <Area type="monotone" dataKey="encaisse" stroke="hsl(157, 100%, 50%)" fill="url(#encaisse)" strokeWidth={2} name="Encaissé" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3 columns */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Top clients */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Top 5 Clients</h3>
          <div className="space-y-3">
            {clients.map(client => (
              <div key={client.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {client.name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-foreground">{client.name}</span>
                    <span className="text-xs font-mono text-foreground">{(client.revenue / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted mt-1">
                    <div className="h-full rounded-full bg-primary/60" style={{ width: `${(client.revenue / 850000) * 100}%` }} />
                  </div>
                  <span className={`text-[10px] font-mono ${client.trend >= 0 ? 'text-secondary' : 'text-destructive'}`}>
                    {client.trend >= 0 ? '↑' : '↓'} {Math.abs(client.trend)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Pipeline CRM</h3>
          <div className="space-y-2">
            {opportunities.map((opp, i) => {
              const maxValue = opportunities[0].value;
              return (
                <div key={opp.stage} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{opp.stage}</span>
                    <span className="font-mono text-foreground">{opp.count} · {opp.value}k</span>
                  </div>
                  <div className="h-6 rounded bg-muted/20 overflow-hidden flex items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(opp.value / maxValue) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded bg-gradient-to-r from-primary/40 to-secondary/40 flex items-center justify-end pr-2"
                    >
                      <span className="text-[10px] font-mono text-foreground">{((opp.value / maxValue) * 100).toFixed(0)}%</span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sector pie */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Répartition CA par secteur</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorRevenue}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  dataKey="value"
                  stroke="none"
                >
                  {sectorRevenue.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.8} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(220, 35%, 10%)', border: '1px solid hsla(190, 100%, 50%, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {sectorRevenue.map(s => (
              <div key={s.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[10px] text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Rentabilité Projets (k TND)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 30%, 18%, 0.8)" />
                <XAxis type="number" dataKey="budget" name="Budget" tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
                <YAxis type="number" dataKey="actual" name="Réalisé" tick={{ fontSize: 10, fill: 'hsl(220, 15%, 55%)' }} />
                <ZAxis type="number" dataKey="team" range={[40, 200]} />
                <Tooltip contentStyle={{ background: 'hsl(220, 35%, 10%)', border: '1px solid hsla(190, 100%, 50%, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
                <Scatter data={profitabilityData} fill="hsla(190, 100%, 50%, 0.6)" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Indicateurs RH</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Turnover', value: '8.2%', trend: '-1.3%', good: true },
              { label: 'Satisfaction', value: '7.8/10', trend: '+0.4', good: true },
              { label: 'Recrutements', value: '4 en cours', trend: '2 postes', good: false },
              { label: 'Formations', value: '23 heures', trend: 'moy/emp', good: true },
            ].map(metric => (
              <div key={metric.label} className="p-3 rounded-lg bg-muted/20 border border-border/50">
                <span className="text-[10px] text-muted-foreground">{metric.label}</span>
                <p className="text-lg font-mono font-bold text-foreground mt-1">{metric.value}</p>
                <span className={`text-[10px] font-mono ${metric.good ? 'text-secondary' : 'text-muted-foreground'}`}>{metric.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
