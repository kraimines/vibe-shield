import { useState, useCallback, useRef } from 'react';
import type { ChatMessage } from '@/types';
import { chatResponses } from '@/data/mockData';

function matchIntent(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('congé') || lower.includes('solde')) return 'congés';
  if (lower.includes('projet') || lower.includes('actif')) return 'projets';
  if (lower.includes('client') || lower.includes('revenu') || lower.includes('chiffre')) return 'clients';
  if (lower.includes('performance') || lower.includes('évaluation')) return 'performance';
  if (lower.includes('facture') || lower.includes('impayé') || lower.includes('recouvrement')) return 'factures';
  return 'default';
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sendMessage = useCallback((text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const intent = matchIntent(text);
    const response = chatResponses[intent] || chatResponses['default'];
    const delay = 800 + Math.random() * 1200;

    setTimeout(() => {
      setIsTyping(false);
      const aiMsgId = (Date.now() + 1).toString();
      const fullContent = response.content;
      let charIndex = 0;

      setMessages(prev => [...prev, {
        id: aiMsgId,
        role: 'assistant',
        content: '',
        agent: response.agent,
        timestamp: new Date(),
        isStreaming: true,
      }]);

      streamRef.current = setInterval(() => {
        charIndex += 2 + Math.floor(Math.random() * 3);
        if (charIndex >= fullContent.length) {
          charIndex = fullContent.length;
          if (streamRef.current) clearInterval(streamRef.current);
          setMessages(prev => prev.map(m =>
            m.id === aiMsgId ? { ...m, content: fullContent, isStreaming: false } : m
          ));
        } else {
          setMessages(prev => prev.map(m =>
            m.id === aiMsgId ? { ...m, content: fullContent.slice(0, charIndex) } : m
          ));
        }
      }, 25);
    }, delay);
  }, []);

  const clearChat = useCallback(() => {
    if (streamRef.current) clearInterval(streamRef.current);
    setMessages([]);
    setIsTyping(false);
  }, []);

  return { messages, isTyping, sendMessage, clearChat };
}
