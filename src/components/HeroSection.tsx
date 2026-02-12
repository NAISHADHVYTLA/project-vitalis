import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Heart, Brain } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Zap, label: "AI-Powered Plans", desc: "Personalized workout & diet recommendations" },
  { icon: Heart, label: "Health Tracking", desc: "BMI, calories, water & sleep tracking" },
  { icon: Brain, label: "Mental Wellness", desc: "Meditation, breathing & mood tools" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />

      <div className="container relative z-10 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">AI-Powered Wellness</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-6">
            Your Health,{" "}
            <span className="text-gradient">Reimagined</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            One intelligent assistant for fitness, nutrition, and mental wellness.
            Track everything. Achieve anything.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="text-base px-8">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/workouts">
              <Button variant="heroOutline" size="lg" className="text-base px-8">
                Explore Workouts
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20 max-w-4xl mx-auto"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="card-gradient rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{f.label}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
