export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
        <span className="text-[10px] font-bold text-primary">IA</span>
      </div>
      <div className="flex gap-1 ml-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/60 animate-bounce-dot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
