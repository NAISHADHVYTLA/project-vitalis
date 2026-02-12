import { Flame, Footprints, Moon, Heart } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Flame, label: "Calories", value: "1,850", unit: "kcal", color: "text-orange-400" },
  { icon: Footprints, label: "Steps", value: "8,243", unit: "steps", color: "text-primary" },
  { icon: Moon, label: "Sleep", value: "7.2", unit: "hours", color: "text-indigo-400" },
  { icon: Heart, label: "Heart Rate", value: "72", unit: "bpm", color: "text-rose-400" },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="card-gradient rounded-xl border border-border/50 p-5"
        >
          <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
          <p className="text-2xl font-display font-bold">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.unit} · {stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
