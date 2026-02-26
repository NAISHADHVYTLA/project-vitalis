import { motion } from "framer-motion";
import { Brain, Lightbulb } from "lucide-react";

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
          <p className="text-xs text-muted-foreground">Insights will appear as you log data</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Lightbulb className="h-10 w-10 text-muted-foreground/20 mb-3" />
        <p className="text-sm text-muted-foreground/60 max-w-xs">
          Start tracking your calories, steps, water, and sleep to receive personalized AI-powered insights.
        </p>
      </div>
    </motion.div>
  );
};

export default HealthInsights;
