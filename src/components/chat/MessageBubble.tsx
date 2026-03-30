import type { ChatMessage } from '@/types';
import AgentBadge from './AgentBadge';

function renderMarkdown(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    let processed = line
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-primary font-mono text-xs">$1</code>');

    if (line.startsWith('### ')) {
      return <h3 key={i} className="text-sm font-display font-semibold text-foreground mt-3 mb-1" dangerouslySetInnerHTML={{ __html: processed.slice(4) }} />;
    }
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-base font-display font-bold text-foreground mt-3 mb-1" dangerouslySetInnerHTML={{ __html: processed.slice(3) }} />;
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="ml-4 text-sm text-muted-foreground list-disc" dangerouslySetInnerHTML={{ __html: processed.slice(2) }} />;
    }
    if (/^\d+\.\s/.test(line)) {
      return <li key={i} className="ml-4 text-sm text-muted-foreground list-decimal" dangerouslySetInnerHTML={{ __html: processed.replace(/^\d+\.\s/, '') }} />;
    }
    if (line.startsWith('|')) return null;
    if (line.trim() === '') return <br key={i} />;
    return <p key={i} className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: processed }} />;
  });
}

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
        isUser ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
      }`}>
        {isUser ? 'Vous' : 'IA'}
      </div>
      <div className={`max-w-[75%] rounded-xl px-4 py-3 ${
        isUser
          ? 'bg-muted border border-border'
          : 'glass-card'
      }`}>
        {!isUser && message.agent && (
          <div className="mb-2">
            <AgentBadge agent={message.agent} />
          </div>
        )}
        <div className="space-y-0.5">
          {renderMarkdown(message.content)}
        </div>
        {message.isStreaming && (
          <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
        )}
      </div>
    </div>
  );
}
