import { quickSuggestions } from '@/data/mockData';

interface QuickActionsProps {
  onSelect: (text: string) => void;
}

export default function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {quickSuggestions.map(s => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="flex-shrink-0 px-3 py-1.5 text-xs rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
