import { useState, useEffect, useMemo } from "react";
import { UtensilsCrossed, Plus, Trash2, RotateCcw, Apple, Beef, Droplets as Fat, Wheat } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "vitalis-calories";

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

const PRESET_FOODS: Omit<FoodEntry, "id" | "time">[] = [
  { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Brown Rice (1 cup)", calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  { name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: "Eggs (2)", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0.7 },
  { name: "Oatmeal (1 cup)", calories: 154, protein: 5, carbs: 27, fat: 2.6 },
  { name: "Salmon Fillet", calories: 208, protein: 20, carbs: 0, fat: 13 },
  { name: "Avocado (half)", calories: 120, protein: 1.5, carbs: 6, fat: 11 },
];

const DEFAULT_GOAL = 2000;

const CalorieTracker = () => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [showAdd, setShowAdd] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const [customName, setCustomName] = useState("");
  const [customCal, setCustomCal] = useState("");
  const [customProtein, setCustomProtein] = useState("");
  const [customCarbs, setCustomCarbs] = useState("");
  const [customFat, setCustomFat] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setEntries(data.entries || []);
        setGoal(data.goal || DEFAULT_GOAL);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries, goal }));
  }, [entries, goal]);

  const totals = useMemo(() => {
    return entries.reduce(
      (acc, e) => ({
        calories: acc.calories + e.calories,
        protein: acc.protein + e.protein,
        carbs: acc.carbs + e.carbs,
        fat: acc.fat + e.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [entries]);

  const pct = Math.min((totals.calories / goal) * 100, 100);
  const remaining = goal - totals.calories;

  const addPreset = (preset: Omit<FoodEntry, "id" | "time">) => {
    const entry: FoodEntry = {
      ...preset,
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setEntries((prev) => [entry, ...prev]);
  };

  const addCustom = () => {
    if (!customName || !customCal) return;
    const entry: FoodEntry = {
      id: Date.now().toString(),
      name: customName,
      calories: parseFloat(customCal) || 0,
      protein: parseFloat(customProtein) || 0,
      carbs: parseFloat(customCarbs) || 0,
      fat: parseFloat(customFat) || 0,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setEntries((prev) => [entry, ...prev]);
    setCustomName("");
    setCustomCal("");
    setCustomProtein("");
    setCustomCarbs("");
    setCustomFat("");
    setShowPresets(true);
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const resetAll = () => {
    setEntries([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const macroBar = (value: number, color: string, label: string, unit: string) => (
    <div className="flex-1">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-display font-semibold">{Math.round(value)}{unit}</span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${Math.min(value / (label === "Protein" ? 150 : label === "Carbs" ? 300 : 65) * 100, 100)}%` }} />
      </div>
    </div>
  );

  return (
    <div className="card-gradient rounded-xl border border-border/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
            <UtensilsCrossed className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-lg">Calorie Tracker</h3>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowAdd(!showAdd)}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={resetAll}>
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="rounded-lg bg-secondary/30 p-4 mb-4">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-3xl font-display font-bold text-primary">{Math.round(totals.calories)}</p>
            <p className="text-xs text-muted-foreground">of {goal} kcal</p>
          </div>
          <p className={`text-sm font-medium ${remaining >= 0 ? "text-primary" : "text-destructive"}`}>
            {remaining >= 0 ? `${Math.round(remaining)} left` : `${Math.round(Math.abs(remaining))} over`}
          </p>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${pct >= 100 ? "bg-destructive" : "bg-primary"}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Macro breakdown */}
        <div className="flex gap-4">
          {macroBar(totals.protein, "bg-blue-500", "Protein", "g")}
          {macroBar(totals.carbs, "bg-amber-500", "Carbs", "g")}
          {macroBar(totals.fat, "bg-rose-500", "Fat", "g")}
        </div>
      </div>

      {/* Add Food */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mb-4">
              {/* Toggle presets / custom */}
              <div className="flex rounded-lg bg-secondary/50 p-1 mb-3">
                <button
                  className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${showPresets ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setShowPresets(true)}
                >
                  Quick Add
                </button>
                <button
                  className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${!showPresets ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setShowPresets(false)}
                >
                  Custom
                </button>
              </div>

              {showPresets ? (
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {PRESET_FOODS.map((food, i) => (
                    <button
                      key={i}
                      onClick={() => addPreset(food)}
                      className="flex items-center gap-2 rounded-lg bg-secondary/40 hover:bg-secondary/70 border border-border/30 p-2.5 text-left transition-colors group"
                    >
                      <Apple className="h-3.5 w-3.5 text-primary shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate">{food.name}</p>
                        <p className="text-[10px] text-muted-foreground">{food.calories} kcal · P{food.protein}g</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder="Food name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="number" placeholder="Calories" value={customCal} onChange={(e) => setCustomCal(e.target.value)} className="bg-secondary/50 border-border/50" />
                    <Input type="number" placeholder="Protein (g)" value={customProtein} onChange={(e) => setCustomProtein(e.target.value)} className="bg-secondary/50 border-border/50" />
                    <Input type="number" placeholder="Carbs (g)" value={customCarbs} onChange={(e) => setCustomCarbs(e.target.value)} className="bg-secondary/50 border-border/50" />
                    <Input type="number" placeholder="Fat (g)" value={customFat} onChange={(e) => setCustomFat(e.target.value)} className="bg-secondary/50 border-border/50" />
                  </div>
                  <Button onClick={addCustom} className="w-full" variant="hero" size="sm">
                    Add Food
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food Log */}
      {entries.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Today's Log</h4>
          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            <AnimatePresence>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center justify-between rounded-lg bg-secondary/30 px-3 py-2 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{entry.name}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{entry.time}</span>
                    </div>
                    <div className="flex gap-3 text-[10px] text-muted-foreground">
                      <span className="text-primary font-medium">{entry.calories} kcal</span>
                      <span>P {entry.protein}g</span>
                      <span>C {entry.carbs}g</span>
                      <span>F {entry.fat}g</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                    onClick={() => removeEntry(entry.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieTracker;
