const agentConfig = {
  rh: { label: 'Agent RH', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  crm: { label: 'Agent CRM', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  erp: { label: 'Agent ERP', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  rag: { label: 'Agent RAG', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
};

export default function AgentBadge({ agent }: { agent: 'rh' | 'crm' | 'erp' | 'rag' }) {
  const config = agentConfig[agent];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
}
