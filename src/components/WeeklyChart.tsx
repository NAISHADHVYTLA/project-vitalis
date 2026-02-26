import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3 } from "lucide-react";

const emptyData = [
  { day: "Mon", calories: 0, steps: 0 },
  { day: "Tue", calories: 0, steps: 0 },
  { day: "Wed", calories: 0, steps: 0 },
  { day: "Thu", calories: 0, steps: 0 },
  { day: "Fri", calories: 0, steps: 0 },
  { day: "Sat", calories: 0, steps: 0 },
  { day: "Sun", calories: 0, steps: 0 },
];

const WeeklyChart = () => {
  const hasData = emptyData.some(d => d.calories > 0 || d.steps > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-gradient rounded-xl border border-border/50 p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-lg">Weekly Overview</h3>
          <p className="text-xs text-muted-foreground">Your activity this week</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground">Calories</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-400" />
            <span className="text-[10px] text-muted-foreground">Steps</span>
          </div>
        </div>
      </div>

      <div className="h-[200px] relative">
        {!hasData && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <BarChart3 className="h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground/60">Start logging to see your trends</p>
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={emptyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 67%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(217, 91%, 67%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "hsl(220, 18%, 12%)",
                border: "1px solid hsl(220, 14%, 22%)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "hsl(210, 20%, 95%)",
                boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)",
              }}
              itemStyle={{ color: "hsl(210, 20%, 85%)" }}
            />
            <Area type="monotone" dataKey="calories" stroke="hsl(160, 84%, 44%)" strokeWidth={2} fill="url(#colorCalories)" dot={false} />
            <Area type="monotone" dataKey="steps" stroke="hsl(217, 91%, 67%)" strokeWidth={2} fill="url(#colorSteps)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WeeklyChart;
