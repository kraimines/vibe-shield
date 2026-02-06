import { Button } from "@/components/ui/button";
import { Shield, Zap, Heart, Trophy, ChevronRight, Star, MessageSquare, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { GlassCard } from "@/components/GlassCard";
import heroBg from "@/assets/hero-bg.jpg";

const steps = [
  { icon: Shield, title: "Detect", desc: "Extension detects hate/toxicity in real time across your socials" },
  { icon: BarChart3, title: "Track", desc: "Web app tracks your vibe score and emotional patterns" },
  { icon: Zap, title: "Level Up", desc: "Stay positive, earn XP, and climb the leaderboard" },
];

const features = [
  { icon: Shield, title: "Toxicity Detector", desc: "AI-powered real-time hate speech detection", glow: "cyan" as const },
  { icon: Heart, title: "Mood Insights", desc: "Spotify Wrapped-style weekly mental health reports", glow: "pink" as const },
  { icon: MessageSquare, title: "Safe Community", desc: "Moderated feed with positivity filters", glow: "purple" as const },
  { icon: Trophy, title: "Points + Ranking", desc: "Gamified leaderboard and achievement system", glow: "cyan" as const },
];

const testimonials = [
  { name: "Maya", handle: "@mayavibes", text: "VibeGuard literally changed my online experience. My anxiety dropped so much 😌", avatar: "🧑‍🎤" },
  { name: "Jay", handle: "@jaykeeps", text: "The vibe journey is addicting fr. I'm level 18 now and a Peacekeeper 🕊️", avatar: "🧑‍💻" },
  { name: "Sam", handle: "@samchill", text: "The rewrite feature is genius. Helped me think before posting something toxic 💀", avatar: "🎨" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-bold">VibeGuard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-6">
              <Zap className="w-3 h-3" /> Now protecting 50K+ users
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
              Protect your vibe.
              <br />
              <span className="text-gradient-primary">Block the hate.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              AI-powered toxicity detection meets gamified well-being. Stay safe online, 
              level up your kindness, and join a community that actually cares.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="hero" size="xl">Get Started <ChevronRight className="w-5 h-5" /></Button>
              </Link>
              <Link to="/extension">
                <Button variant="neon" size="xl">Download Extension</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-4">How It Works</h2>
            <p className="text-muted-foreground text-center mb-14 max-w-lg mx-auto">Three steps to a safer internet experience</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <GlassCard className="text-center group hover:glow-cyan transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-2">STEP {i + 1}</div>
                  <h3 className="text-xl font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-14">
              Features that <span className="text-gradient-primary">hit different</span>
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <GlassCard glow={f.glow} className="hover:scale-[1.02] transition-transform duration-300 h-full">
                  <f.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-14">
              What the community says
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{t.avatar}</div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.handle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
                  <div className="flex gap-0.5 mt-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-10 sm:p-14 glow-cyan">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Ready to protect your vibe?</h2>
            <p className="text-muted-foreground mb-8">Join thousands building a safer internet. It's free to start.</p>
            <Link to="/signup">
              <Button variant="hero" size="xl">Join VibeGuard <ChevronRight className="w-5 h-5" /></Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display font-bold">VibeGuard</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 VibeGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
