import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Mail, Lock, User, ArrowRight, Shield, Zap, Users, Star, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const testimonials = [
  {
    quote: "Vitalis completely transformed how I approach my health. Down 30lbs and feeling incredible.",
    name: "Sarah Chen",
    role: "Product Manager at Stripe",
    avatar: "SC",
  },
  {
    quote: "The AI-powered insights are unlike anything else. It's like having a personal trainer in your pocket.",
    name: "Marcus Johnson",
    role: "Software Engineer at Google",
    avatar: "MJ",
  },
  {
    quote: "Finally, a wellness app that actually understands my body. The data tracking is phenomenal.",
    name: "Dr. Priya Sharma",
    role: "Sports Medicine Physician",
    avatar: "PS",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "2M+", label: "Workouts Logged" },
  { value: "4.9", label: "App Store Rating" },
];

const features = [
  { icon: Zap, text: "AI-powered health insights" },
  { icon: Shield, text: "Bank-level data encryption" },
  { icon: Users, text: "Community-driven challenges" },
];

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="h-10 w-10 border-2 border-primary/30 rounded-full" />
          <div className="absolute inset-0 h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName },
          },
        });
        if (error) throw error;
        toast({
          title: "Check your email",
          description: "We've sent you a verification link. Please verify your email to sign in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* LEFT PANEL — Branding & Social Proof */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/6 blur-[80px] animate-float-slower" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-accent/10 blur-[60px] animate-pulse-glow" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo & tagline */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-16"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 glow">
                <Activity className="h-7 w-7 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">VITALIS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-4xl xl:text-5xl font-display font-bold tracking-tight leading-[1.1] mb-5">
                Your health journey{" "}
                <span className="text-gradient">starts here.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Join thousands who've transformed their lives with AI-powered fitness, nutrition, and mental wellness tracking.
              </p>
            </motion.div>

            {/* Feature pills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col gap-3 mt-8"
            >
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{f.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Testimonial carousel */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="glass glass-border rounded-2xl p-6 mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                      "{testimonials[activeTestimonial].quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {testimonials[activeTestimonial].avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{testimonials[activeTestimonial].name}</p>
                        <p className="text-xs text-muted-foreground">{testimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="flex gap-1.5 mt-4">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeTestimonial ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="flex gap-8">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl font-display font-bold text-gradient">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — Auth Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Subtle orb for right side */}
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-[420px] relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-3 mb-10 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 glow">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">VITALIS</span>
          </div>

          {/* Form header */}
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Sign in to continue your health journey" 
                : "Start tracking your health with AI-powered insights"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="pl-11 h-12 bg-secondary/40 border-border/40 rounded-xl focus:border-primary/50 focus:bg-secondary/60 transition-all"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 bg-secondary/40 border-border/40 rounded-xl focus:border-primary/50 focus:bg-secondary/60 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 bg-secondary/40 border-border/40 rounded-xl focus:border-primary/50 focus:bg-secondary/60 transition-all"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base font-semibold gap-2 glow-lg" 
              variant="hero" 
              disabled={submitting}
            >
              {submitting ? (
                <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-6 py-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary/60" />
              <span>256-bit SSL</span>
            </div>
            <div className="h-3 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary/60" />
              <span>HIPAA Ready</span>
            </div>
            <div className="h-3 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-primary/60" />
              <span>SOC 2</span>
            </div>
          </div>

          {/* Toggle */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-primary font-semibold hover:underline">{isLogin ? "Sign up" : "Sign in"}</span>
            </button>
          </div>

          {/* Mobile social proof */}
          <div className="mt-8 lg:hidden">
            <div className="flex justify-center gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-display font-bold text-gradient">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
