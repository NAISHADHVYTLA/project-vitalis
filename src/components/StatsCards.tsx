import { useState, useEffect } from "react";
import { Flame, Footprints, Moon, Heart, RotateCcw, Pencil, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const STORAGE_KEY = "vitalis-stats";

const defaultStats = [
  { icon: "Flame", label: "Calories", value: "1,850", unit: "kcal", color: "text-orange-400" },
  { icon: "Footprints", label: "Steps", value: "8,243", unit: "steps", color: "text-primary" },
  { icon: "Moon", label: "Sleep", value: "7.2", unit: "hours", color: "text-indigo-400" },
  { icon: "Heart", label: "Heart Rate", value: "72", unit: "bpm", color: "text-rose-400" },
];

const iconMap: Record<string, React.ElementType> = { Flame, Footprints, Moon, Heart };

const StatsCards = () => {
  const [stats, setStats] = useState(defaultStats);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editVal, setEditVal] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setStats(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const startEdit = (i: number) => {
    setEditingIdx(i);
    setEditVal(stats[i].value);
  };

  const saveEdit = () => {
    if (editingIdx === null) return;
    setStats((prev) => prev.map((s, i) => (i === editingIdx ? { ...s, value: editVal } : s)));
    setEditingIdx(null);
  };

  const resetAll = () => {
    setStats(defaultStats);
    setEditingIdx(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive gap-1" onClick={resetAll}>
          <RotateCcw className="h-3 w-3" /> Reset All
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || Flame;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-gradient rounded-xl border border-border/50 p-5 group relative"
            >
              <div className="flex items-start justify-between">
                <Icon className={`h-5 w-5 ${stat.color} mb-3`} />
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => startEdit(i)}>
                  <Pencil className="h-3 w-3" />
                </Button>
              </div>
              {editingIdx === i ? (
                <div className="flex items-center gap-1">
                  <Input
                    value={editVal}
                    onChange={(e) => setEditVal(e.target.value)}
                    className="h-8 text-sm bg-secondary/50 border-border/50"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={saveEdit}>
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.unit} · {stat.label}</p>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsCards;
