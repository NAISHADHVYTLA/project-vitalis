import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Wind, SmilePlus, BookOpen, Play, Pause, RotateCcw, CheckCircle2, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const moods = [
  { emoji: "😊", label: "Great", color: "bg-primary/15 border-primary/30" },
  { emoji: "🙂", label: "Good", color: "bg-blue-500/15 border-blue-500/30" },
  { emoji: "😐", label: "Okay", color: "bg-amber-500/15 border-amber-500/30" },
  { emoji: "😔", label: "Low", color: "bg-orange-500/15 border-orange-500/30" },
  { emoji: "😢", label: "Bad", color: "bg-destructive/15 border-destructive/30" },
];

const MOOD_STORAGE = "vitalis-moods";

const BreathingExercise = () => {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">("idle");
  const [seconds, setSeconds] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setPhase("inhale");
    setSeconds(4);
    setCycles(0);
  };

  const stop = () => {
    setPhase("idle");
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (phase === "idle") return;

    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          if (phase === "inhale") { setPhase("hold"); return 7; }
          if (phase === "hold") { setPhase("exhale"); return 8; }
          if (phase === "exhale") {
            setCycles((c) => c + 1);
            setPhase("inhale");
            return 4;
          }
        }
        return s - 1;
      });
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase]);

  const scale = phase === "inhale" ? 1.3 : phase === "hold" ? 1.3 : phase === "exhale" ? 1 : 1;

  return (
    <div className="flex flex-col items-center py-6">
      <motion.div
        animate={{ scale }}
        transition={{ duration: phase === "inhale" ? 4 : phase === "exhale" ? 8 : 0.3 }}
        className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30 mb-6"
      >
        <div className="absolute inset-2 rounded-full bg-primary/5" />
        <div className="text-center z-10">
          {phase === "idle" ? (
            <Wind className="h-8 w-8 text-primary mx-auto" />
          ) : (
            <>
              <p className="text-2xl font-display font-bold text-primary">{seconds}</p>
              <p className="text-[10px] uppercase tracking-wider text-primary/70">{phase}</p>
            </>
          )}
        </div>
      </motion.div>

      {phase !== "idle" && (
        <p className="text-xs text-muted-foreground mb-4">{cycles} cycles completed</p>
      )}

      <div className="flex gap-2">
        {phase === "idle" ? (
          <Button variant="hero" size="sm" className="gap-2" onClick={start}>
            <Play className="h-3.5 w-3.5" /> Start 4-7-8 Breathing
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="gap-2" onClick={stop}>
            <Pause className="h-3.5 w-3.5" /> Stop
          </Button>
        )}
      </div>
    </div>
  );
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<{ mood: string; date: string }[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(MOOD_STORAGE);
      if (saved) {
        const data = JSON.parse(saved);
        setMoodHistory(data);
        const today = data.find((m: any) => m.date === new Date().toDateString());
        if (today) setSelectedMood(today.mood);
      }
    } catch {}
  }, []);

  const logMood = (mood: string) => {
    setSelectedMood(mood);
    const today = new Date().toDateString();
    const updated = [...moodHistory.filter((m) => m.date !== today), { mood, date: today }];
    setMoodHistory(updated);
    localStorage.setItem(MOOD_STORAGE, JSON.stringify(updated));
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">How are you feeling right now?</p>
      <div className="flex justify-center gap-3 mb-4">
        {moods.map((m) => (
          <motion.button
            key={m.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => logMood(m.label)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
              selectedMood === m.label ? m.color : "border-border/30 bg-secondary/20 hover:bg-secondary/40"
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-[10px] font-medium">{m.label}</span>
          </motion.button>
        ))}
      </div>
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-xs text-primary"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Mood logged for today</span>
        </motion.div>
      )}

      {/* Mini history */}
      {moodHistory.length > 1 && (
        <div className="mt-4 pt-4 border-t border-border/30">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Recent</p>
          <div className="flex gap-1">
            {moodHistory.slice(-7).map((m, i) => {
              const mood = moods.find((mo) => mo.label === m.mood);
              return (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="text-sm">{mood?.emoji}</span>
                  <span className="text-[8px] text-muted-foreground">
                    {new Date(m.date).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const tools = [
  { 
    id: "breathing",
    icon: Wind, 
    title: "Breathing Exercise", 
    desc: "Guided 4-7-8 technique for calm & focus",
    component: BreathingExercise,
  },
  { 
    id: "mood",
    icon: SmilePlus, 
    title: "Mood Check-in", 
    desc: "Track your emotional patterns over time",
    component: MoodTracker,
  },
];

const quickTips = [
  "Take 5 deep breaths when feeling overwhelmed",
  "Practice gratitude — write 3 things you're thankful for",
  "Step outside for 10 minutes of natural light",
  "Drink a glass of water before your next meal",
];

const Wellness = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTipIndex((i) => (i + 1) % quickTips.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Mental Wellness</h1>
              <p className="text-sm text-muted-foreground">
                Tools for your mind and spirit · <Sparkles className="h-3 w-3 inline text-primary" /> Personalized
              </p>
            </div>
          </div>
        </motion.div>

        {/* Daily tip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass glass-border rounded-2xl p-5 mb-6"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-primary uppercase tracking-wider mb-1">Daily Tip</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm text-foreground/80"
                >
                  {quickTips[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Interactive wellness tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tools.map((tool, i) => {
            const isActive = activeToolId === tool.id;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card-gradient rounded-xl border transition-all ${
                  isActive ? "border-primary/30" : "border-border/50 hover:border-primary/20"
                } p-6`}
              >
                <div 
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => setActiveToolId(isActive ? null : tool.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.desc}</p>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 border-t border-border/30 mt-5">
                        <tool.component />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isActive && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-4 text-primary text-xs"
                    onClick={() => setActiveToolId(tool.id)}
                  >
                    Open Tool →
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Meditation & Journal placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-gradient rounded-xl border border-border/50 p-6 hover:border-primary/20 transition-all group cursor-pointer"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-1">Meditation</h3>
            <p className="text-sm text-muted-foreground mb-4">5-minute guided mindfulness sessions</p>
            <span className="text-sm font-medium text-primary group-hover:underline">Coming Soon →</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-gradient rounded-xl border border-border/50 p-6 hover:border-primary/20 transition-all group cursor-pointer"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-1">Gratitude Journal</h3>
            <p className="text-sm text-muted-foreground mb-4">Write 3 things you're grateful for daily</p>
            <span className="text-sm font-medium text-primary group-hover:underline">Coming Soon →</span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Wellness;
