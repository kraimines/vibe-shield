import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

interface SimulationReportProps {
  text: string;
}

export default function SimulationReport({ text }: SimulationReportProps) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    let index = 0;
    const interval = setInterval(() => {
      index += 3 + Math.floor(Math.random() * 4);
      if (index >= text.length) {
        index = text.length;
        clearInterval(interval);
      }
      setDisplayText(text.slice(0, index));
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  const lines = displayText.split('\n');

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center">
          <span className="text-[10px] font-bold text-secondary">DT</span>
        </div>
        <div>
          <h3 className="text-sm font-display font-semibold text-foreground">Analyse de l'Agent Simulateur</h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20">Digital Twin</span>
        </div>
      </div>
      <div className="space-y-1 text-sm leading-relaxed">
        {lines.map((line, i) => {
          let processed = line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
            .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-primary font-mono text-xs">$1</code>');
          if (line.startsWith('## ')) return <h2 key={i} className="text-base font-display font-bold text-foreground mt-3 mb-1" dangerouslySetInnerHTML={{ __html: processed.slice(3) }} />;
          if (line.startsWith('### ')) return <h3 key={i} className="text-sm font-display font-semibold text-foreground mt-3 mb-1" dangerouslySetInnerHTML={{ __html: processed.slice(4) }} />;
          if (line.startsWith('- ')) return <li key={i} className="ml-4 text-muted-foreground list-disc text-xs" dangerouslySetInnerHTML={{ __html: processed.slice(2) }} />;
          if (/^\d+\.\s/.test(line)) return <li key={i} className="ml-4 text-muted-foreground list-decimal text-xs" dangerouslySetInnerHTML={{ __html: processed.replace(/^\d+\.\s/, '') }} />;
          if (line.trim() === '') return <br key={i} />;
          return <p key={i} className="text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: processed }} />;
        })}
        {displayText.length < text.length && (
          <span className="inline-block w-0.5 h-4 bg-primary animate-pulse" />
        )}
      </div>
      <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors">
        <FileText className="w-3.5 h-3.5" />
        Exporter le rapport PDF
      </button>
    </div>
  );
}
