import { motion } from "framer-motion";
import { Sparkles, ChevronRight, Clock, Flame, Dumbbell } from "lucide-react";
import { Button } from "./ui/button";

const recommendations = [
  {
    title: "Power HIIT Circuit",
    reason: "Based on your calorie goals",
    duration: "20 min",
    calories: "280 kcal",
    intensity: 85,
    muscles: ["Full Body"],
    badge: "AI Pick",
  },
  {
    title: "Recovery Yoga Flow",
    reason: "You trained hard yesterday",
    duration: "25 min",
    calories: "120 kcal",
    intensity: 35,
    muscles: ["Flexibility"],
    badge: "Recovery",
  },
  {
    title: "Core & Abs Blast",
    reason: "Targets your weakest area",
    duration: "15 min",
    calories: "180 kcal",
    intensity: 70,
    muscles: ["Core", "Abs"],
    badge: "Recommended",
  },
];

const AIRecommendations = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card-gradient rounded-xl border border-border/50 p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20">
            <Sparkles className="h-4 w-4 text-violet-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg">AI Recommendations</h3>
            <p className="text-xs text-muted-foreground">Personalized for your goals</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-4 p-3.5 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/20 transition-all cursor-pointer group"
          >
            {/* Intensity indicator */}
            <div className="relative flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              {/* Intensity bar */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${rec.intensity}%` }}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm font-semibold truncate">{rec.title}</h4>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 shrink-0">
                  {rec.badge}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-1">{rec.reason}</p>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {rec.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="h-3 w-3" /> {rec.calories}
                </span>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </motion.div>
        ))}
      </div>

      <Button variant="ghost" className="w-full mt-4 text-xs text-muted-foreground hover:text-primary gap-2">
        <Sparkles className="h-3 w-3" />
        Generate More Recommendations
      </Button>
    </motion.div>
  );
};

export default AIRecommendations;
