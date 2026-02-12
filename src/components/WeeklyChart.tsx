import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface WeeklyData {
  day: string;
  calories: number;
  steps: number;
  water: number;
}

const weeklyData: WeeklyData[] = [
  { day: "Mon", calories: 1750, steps: 6200, water: 5 },
  { day: "Tue", calories: 2100, steps: 8900, water: 7 },
  { day: "Wed", calories: 1900, steps: 7400, water: 6 },
  { day: "Thu", calories: 2300, steps: 10200, water: 8 },
  { day: "Fri", calories: 1600, steps: 5800, water: 4 },
  { day: "Sat", calories: 2050, steps: 9100, water: 7 },
  { day: "Sun", calories: 1850, steps: 8243, water: 6 },
];

const WeeklyChart = () => {
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

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
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
            <Area
              type="monotone"
              dataKey="calories"
              stroke="hsl(160, 84%, 44%)"
              strokeWidth={2}
              fill="url(#colorCalories)"
              dot={false}
              activeDot={{ r: 4, fill: "hsl(160, 84%, 44%)", stroke: "hsl(220, 20%, 7%)", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="steps"
              stroke="hsl(217, 91%, 67%)"
              strokeWidth={2}
              fill="url(#colorSteps)"
              dot={false}
              activeDot={{ r: 4, fill: "hsl(217, 91%, 67%)", stroke: "hsl(220, 20%, 7%)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WeeklyChart;
