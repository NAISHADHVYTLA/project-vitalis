import { motion } from "framer-motion";
import { Sparkles, Dumbbell } from "lucide-react";
import { Button } from "./ui/button";

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

      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Dumbbell className="h-10 w-10 text-muted-foreground/20 mb-3" />
        <p className="text-sm text-muted-foreground/60 max-w-xs mb-4">
          Log a few workouts and set your goals to get personalized AI recommendations.
        </p>
        <Button variant="ghost" className="text-xs text-muted-foreground hover:text-primary gap-2" disabled>
          <Sparkles className="h-3 w-3" />
          Recommendations unlock after first workout
        </Button>
      </div>
    </motion.div>
  );
};

export default AIRecommendations;
