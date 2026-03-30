import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickActions from './QuickActions';

export default function ChatInterface() {
  const { messages, isTyping, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-3 border-b border-border">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">IA</span>
        </div>
        <div>
          <h2 className="text-sm font-display font-semibold text-foreground">Assistant Cognitif Talan</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] text-muted-foreground">Connecté · Multi-agent</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 glow-cyan">
              <span className="text-2xl font-display font-bold text-gradient-cyan">AI</span>
            </div>
            <h3 className="text-lg font-display font-semibold text-foreground mb-1">Comment puis-je vous aider ?</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Je peux accéder à vos données RH, projets, CRM et ERP. Posez-moi une question ou choisissez une suggestion.
            </p>
            <QuickActions onSelect={sendMessage} />
          </div>
        )}
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {messages.length > 0 && (
        <div className="px-6 py-2">
          <QuickActions onSelect={sendMessage} />
        </div>
      )}

      <div className="px-6 py-3 border-t border-border">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Posez votre question..."
            className="flex-1 h-10 px-4 text-sm bg-muted/50 rounded-lg border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-10 w-10 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center text-primary disabled:opacity-30 transition-all hover:glow-cyan"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
