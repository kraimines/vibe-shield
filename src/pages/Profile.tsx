import { FadeIn } from "@/components/FadeIn";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Edit3, Trophy, Flame, Star, Shield, Heart } from "lucide-react";

const badges = [
  { name: "Peacekeeper 🕊️", rarity: "Epic" },
  { name: "Kind Soul 🌱", rarity: "Rare" },
  { name: "Community Helper 🤝", rarity: "Rare" },
];

export default function Profile() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <FadeIn>
        <GlassCard glow="cyan" className="text-center relative">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4">
            <Edit3 className="w-4 h-4" />
          </Button>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center text-4xl mb-4">
            ⭐
          </div>
          <h1 className="text-2xl font-display font-bold">VibeUser</h1>
          <p className="text-sm text-primary font-medium">Kind Soul 🌱 · Level 12</p>
          <p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto">
            Spreading good vibes one post at a time ✨ Anti-hate advocate.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="font-display font-bold text-lg">3,800</p>
              <p className="text-[10px] text-muted-foreground">XP</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-lg">7</p>
              <p className="text-[10px] text-muted-foreground">Streak 🔥</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-lg">#7</p>
              <p className="text-[10px] text-muted-foreground">Rank</p>
            </div>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Heart, label: "Kindness", value: "87%" },
            { icon: Shield, label: "Toxicity", value: "12%" },
            { icon: Flame, label: "Streak", value: "7 days" },
            { icon: Trophy, label: "Missions", value: "24" },
          ].map((s) => (
            <GlassCard key={s.label} className="text-center py-3">
              <s.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="font-display font-bold text-lg">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </GlassCard>
          ))}
        </div>
      </FadeIn>

      {/* Badges */}
      <FadeIn delay={0.15}>
        <h2 className="text-lg font-display font-semibold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" /> Badges
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((b) => (
            <GlassCard key={b.name} className="text-center py-3">
              <p className="text-sm font-semibold">{b.name}</p>
              <p className="text-[10px] text-neon-purple mt-1">{b.rarity}</p>
            </GlassCard>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
