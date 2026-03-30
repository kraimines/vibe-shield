import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '@/hooks/useRole';
import { User, Users, Building2, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { UserRole } from '@/types';

const roles: { value: UserRole; label: string; desc: string; icon: typeof User }[] = [
  { value: 'employee', label: 'Employé', desc: 'Accès projets, congés, performance', icon: User },
  { value: 'manager', label: 'Manager', desc: 'Gestion équipe, charge, approbations', icon: Users },
  { value: 'direction', label: 'Direction', desc: 'Vision stratégique, CA, pipeline', icon: Building2 },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setRole } = useRole();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRole(selectedRole);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background dot-grid flex items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 scanline" />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1400),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, Math.random() * -200, Math.random() * 200],
            x: [null, Math.random() * -100, Math.random() * 100],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 glow-cyan">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-gradient-cyan">TALAN.AI</h1>
          </div>
          <p className="text-xs text-muted-foreground text-center mb-8">Intelligence Augmentée pour Talan Tunisie</p>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map(role => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all duration-200 ${
                  selectedRole === role.value
                    ? 'border-primary/50 bg-primary/10 glow-cyan'
                    : 'border-border hover:border-border bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <role.icon className={`w-5 h-5 ${selectedRole === role.value ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-medium ${selectedRole === role.value ? 'text-primary' : 'text-foreground'}`}>{role.label}</span>
                <span className="text-[9px] text-muted-foreground leading-tight">{role.desc}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nom@talan.com"
                className="w-full h-10 px-3 text-sm bg-muted/30 rounded-lg border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 px-3 text-sm bg-muted/30 rounded-lg border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 relative overflow-hidden group"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Connexion
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
