import { useState } from 'react';
import { PanelRightOpen, PanelRightClose, User, Clock, TrendingUp } from 'lucide-react';
import ChatInterface from '@/components/chat/ChatInterface';
import { useRole } from '@/hooks/useRole';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatPage() {
  const [panelOpen, setPanelOpen] = useState(true);
  const { user } = useRole();
  const [activeTab, setActiveTab] = useState<'context' | 'history' | 'insights'>('context');

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="flex-1 flex flex-col">
        <ChatInterface />
      </div>

      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className="absolute top-16 right-4 z-20 p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      >
        {panelOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {panelOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="border-l border-border bg-sidebar overflow-hidden flex-shrink-0"
          >
            <div className="w-[320px] h-full flex flex-col">
              <div className="flex border-b border-border">
                {(['context', 'history', 'insights'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-xs font-medium transition-colors capitalize ${
                      activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab === 'context' ? 'Contexte' : tab === 'history' ? 'Historique' : 'Insights'}
                  </button>
                ))}
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {activeTab === 'context' && user && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.department}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Rôle', value: user.role },
                        { label: 'Email', value: user.email },
                        { label: 'Département', value: user.department },
                        { label: 'Projets actifs', value: '3' },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between py-1.5 border-b border-border/50">
                          <span className="text-xs text-muted-foreground">{item.label}</span>
                          <span className="text-xs text-foreground capitalize">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'history' && (
                  <div className="space-y-2">
                    {['Solde congés', 'Performance Q1', 'Projets en cours', 'Top clients'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'insights' && (
                  <div className="space-y-3">
                    {[
                      { label: 'Taux occupation', value: '87%', trend: '+3%' },
                      { label: 'Projets on-track', value: '5/8', trend: 'stable' },
                      { label: 'NPS Clients', value: '72', trend: '+5' },
                    ].map(item => (
                      <div key={item.label} className="glass-card rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{item.label}</span>
                          <TrendingUp className="w-3 h-3 text-secondary" />
                        </div>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="text-lg font-mono font-bold text-foreground">{item.value}</span>
                          <span className="text-[10px] text-secondary mb-1">{item.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
