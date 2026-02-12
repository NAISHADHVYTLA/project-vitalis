import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";

const insights = [
  {
    type: "success" as const,
    icon: CheckCircle2,
    title: "Great hydration!",
    desc: "You've been hitting your water goals consistently this week.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    type: "warning" as const,
    icon: AlertCircle,
    title: "Protein intake low",
    desc: "You're averaging 45g/day — aim for 80g+ for muscle recovery.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    type: "tip" as const,
    icon: Lightbulb,
    title: "Try morning workouts",
    desc: "Your data shows 23% better performance before 10 AM.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const HealthInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card-gradient rounded-xl border border-border/50 p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20">
          <Brain className="h-4 w-4 text-blue-400" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg">Health Insights</h3>
          <p className="text-xs text-muted-foreground">AI-analyzed from your data</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex gap-3 p-3 rounded-xl bg-secondary/20 border border-border/20"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${insight.bg} shrink-0`}>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium mb-0.5">{insight.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthInsights;
