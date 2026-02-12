import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Heart, Brain, Activity, Shield, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const features = [
  { icon: Zap, label: "AI-Powered Plans", desc: "Personalized workout & diet recommendations powered by machine learning" },
  { icon: Heart, label: "Health Tracking", desc: "BMI, calories, water, sleep & heart rate — all in one dashboard" },
  { icon: Brain, label: "Mental Wellness", desc: "Meditation, breathing exercises & mood tracking for holistic health" },
];

const metrics = [
  { value: 50000, suffix: "+", label: "Active Users", icon: Users },
  { value: 2, suffix: "M+", label: "Workouts Logged", icon: TrendingUp },
  { value: 98, suffix: "%", label: "User Satisfaction", icon: Heart },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const display = value >= 1000 ? `${Math.floor(count / 1000)}K` : count.toString();
  return <span>{display}{suffix}</span>;
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Multi-layered background */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/6 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] animate-float-slower" />
      <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] rounded-full bg-primary/4 blur-[80px] animate-pulse-glow" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container relative z-10 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 glass-border px-5 py-2 mb-10"
          >
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary tracking-wide">NOW IN PUBLIC BETA — JOIN 50K+ USERS</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.05] mb-7">
            Your Health,{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient">Reimagined</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            The all-in-one AI-powered platform for fitness, nutrition, and mental wellness. 
            Track everything. Achieve anything. <span className="text-foreground/80 font-medium">No more guesswork.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="text-base px-10 h-13 rounded-xl glow-lg">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/workouts">
              <Button variant="heroOutline" size="lg" className="text-base px-10 h-13 rounded-xl">
                Explore Workouts
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mb-16">
            Free forever for individuals · No credit card required
          </p>
        </motion.div>

        {/* Metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center gap-12 md:gap-20 mb-20"
        >
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <m.icon className="h-4 w-4 text-primary/60" />
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </p>
              </div>
              <p className="text-xs text-muted-foreground tracking-wide">{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, borderColor: "hsl(160 84% 44% / 0.3)" }}
              transition={{ duration: 0.2 }}
              className="glass glass-border rounded-2xl p-7 group cursor-default"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex items-center justify-center gap-6 mt-16 text-muted-foreground/50"
        >
          <div className="flex items-center gap-1.5 text-xs">
            <Shield className="h-3.5 w-3.5" />
            <span>HIPAA Ready</span>
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-xs">
            <Activity className="h-3.5 w-3.5" />
            <span>99.9% Uptime</span>
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-xs">
            <Shield className="h-3.5 w-3.5" />
            <span>SOC 2 Certified</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
