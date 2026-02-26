import { motion } from "framer-motion";

interface GoalRingProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
  size?: number;
}

const GoalRing = ({ label, value, max, unit, color, size = 80 }: GoalRingProps) => {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(220, 14%, 16%)"
            strokeWidth={4}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-display font-bold">{Math.round(pct)}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-medium">{label}</p>
        <p className="text-[10px] text-muted-foreground">
          {value.toLocaleString()}/{max.toLocaleString()} {unit}
        </p>
      </div>
    </div>
  );
};

const GoalRings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-gradient rounded-xl border border-border/50 p-6"
    >
      <h3 className="font-display font-semibold text-lg mb-1">Daily Goals</h3>
      <p className="text-xs text-muted-foreground mb-5">Log your stats to track progress</p>
      <div className="flex justify-around">
        <GoalRing label="Calories" value={0} max={2200} unit="kcal" color="hsl(160, 84%, 44%)" />
        <GoalRing label="Steps" value={0} max={10000} unit="steps" color="hsl(217, 91%, 67%)" />
        <GoalRing label="Water" value={0} max={8} unit="glasses" color="hsl(199, 89%, 48%)" />
        <GoalRing label="Sleep" value={0} max={8} unit="hrs" color="hsl(263, 70%, 58%)" />
      </div>
    </motion.div>
  );
};

export default GoalRings;
