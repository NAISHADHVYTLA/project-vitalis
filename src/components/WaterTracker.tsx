import { useState, useEffect } from "react";
import { Droplets, Plus, Minus, RotateCcw, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const STORAGE_KEY = "vitalis-water";

const WaterTracker = () => {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(8);
  const [isEditing, setIsEditing] = useState(false);
  const [editGoal, setEditGoal] = useState("8");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setGlasses(data.glasses ?? 0);
        setGoal(data.goal ?? 8);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ glasses, goal }));
  }, [glasses, goal]);

  const pct = Math.min((glasses / goal) * 100, 100);

  const saveGoal = () => {
    const g = parseInt(editGoal);
    if (g > 0) setGoal(g);
    setIsEditing(false);
  };

  const reset = () => {
    setGlasses(0);
  };

  return (
    <div className="card-gradient rounded-xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
            <Droplets className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-lg">Water Intake</h3>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditGoal(String(goal)); setIsEditing(!isEditing); }}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {isEditing && (
        <div className="flex items-end gap-2 mb-4">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">Daily Goal (glasses)</label>
            <Input type="number" value={editGoal} onChange={(e) => setEditGoal(e.target.value)} className="bg-secondary/50 border-border/50" />
          </div>
          <Button size="sm" onClick={saveGoal}>Save</Button>
        </div>
      )}

      <div className="flex items-center justify-center gap-6 mb-4">
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setGlasses(Math.max(0, glasses - 1))}>
          <Minus className="h-3 w-3" />
        </Button>
        <div className="text-center">
          <p className="text-4xl font-display font-bold text-primary">{glasses}</p>
          <p className="text-xs text-muted-foreground">of {goal} glasses</p>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setGlasses(glasses + 1)}>
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">{Math.round(pct)}% of daily goal</p>
    </div>
  );
};

export default WaterTracker;
