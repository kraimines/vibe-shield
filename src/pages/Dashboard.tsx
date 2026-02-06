import { FadeIn } from "@/components/FadeIn";
import { GlassCard } from "@/components/GlassCard";
import { Heart, Flame, TrendingUp, Brain, Smile, Sun, Moon, CloudRain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const moodData = [
  { day: "Mon", score: 82 },
  { day: "Tue", score: 75 },
  { day: "Wed", score: 90 },
  { day: "Thu", score: 68 },
  { day: "Fri", score: 85 },
  { day: "Sat", score: 92 },
  { day: "Sun", score: 88 },
];

const maxScore = Math.max(...moodData.map((d) => d.score));

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Your vibe is safe today 😌</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
            <Flame className="w-5 h-5 text-accent" />
            <span className="font-display font-bold text-lg">7</span>
            <span className="text-xs text-muted-foreground">day streak 🔥</span>
          </div>
        </div>
      </FadeIn>

      {/* Vibe Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FadeIn delay={0}>
          <GlassCard glow="cyan">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Kindness Score</span>
              <Heart className="w-4 h-4 text-accent" />
            </div>
            <p className="text-3xl font-display font-bold text-primary">87</p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-primary to-neon-pink h-2 rounded-full" style={{ width: "87%" }} />
            </div>
          </GlassCard>
        </FadeIn>
        <FadeIn delay={0.05}>
          <GlassCard>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Toxicity Score</span>
              <Zap className="w-4 h-4 text-warning" />
            </div>
            <p className="text-3xl font-display font-bold text-success">12</p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-success h-2 rounded-full" style={{ width: "12%" }} />
            </div>
          </GlassCard>
        </FadeIn>
        <FadeIn delay={0.1}>
          <GlassCard>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Most Positive</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xl font-display font-bold">Instagram</p>
            <p className="text-xs text-muted-foreground mt-1">92% positive interactions</p>
          </GlassCard>
        </FadeIn>
        <FadeIn delay={0.15}>
          <GlassCard>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Most Toxic</span>
              <CloudRain className="w-4 h-4 text-destructive" />
            </div>
            <p className="text-xl font-display font-bold">Twitter/X</p>
            <p className="text-xs text-muted-foreground mt-1">34% negative content</p>
          </GlassCard>
        </FadeIn>
      </div>

      {/* Weekly Mood Chart */}
      <FadeIn delay={0.2}>
        <GlassCard className="overflow-hidden">
          <h2 className="text-lg font-display font-semibold mb-4">Weekly Mood Trend 📊</h2>
          <div className="flex items-end gap-3 h-40">
            {moodData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-primary">{d.score}</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary/60 to-primary transition-all duration-500"
                  style={{ height: `${(d.score / maxScore) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </FadeIn>

      {/* Spotify Wrapped Style Mood Report */}
      <FadeIn delay={0.25}>
        <div className="gradient-border">
          <div className="bg-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-neon-purple" />
              <h2 className="text-lg font-display font-semibold">Weekly Mood Report ✨</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Dominant Mood</p>
                <div className="flex items-center gap-2">
                  <Smile className="w-5 h-5 text-primary" />
                  <span className="font-display font-bold text-lg">Calm</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Most Common Words</p>
                <div className="flex flex-wrap gap-1.5">
                  {["love", "chill", "grateful", "peace"].map((w) => (
                    <span key={w} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">{w}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Most Positive Day</p>
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-warning" />
                  <span className="font-display font-bold">Saturday</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Suggestion</p>
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-neon-purple" />
                  <span className="text-sm">Try journaling tonight 📝</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={0.3}>
        <div className="flex flex-wrap gap-3">
          <Button variant="neon" size="sm">View Full Report</Button>
          <Button variant="outline" size="sm">Export as PDF</Button>
          <Button variant="ghost" size="sm">Share Vibe Score</Button>
        </div>
      </FadeIn>
    </div>
  );
}
