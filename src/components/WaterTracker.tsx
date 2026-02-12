import { useState } from "react";
import { Droplets, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";

const GOAL = 8;

const WaterTracker = () => {
  const [glasses, setGlasses] = useState(3);
  const pct = Math.min((glasses / GOAL) * 100, 100);

  return (
    <div className="card-gradient rounded-xl border border-border/50 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
          <Droplets className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-lg">Water Intake</h3>
      </div>

      <div className="flex items-center justify-center gap-6 mb-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setGlasses(Math.max(0, glasses - 1))}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <div className="text-center">
          <p className="text-4xl font-display font-bold text-primary">{glasses}</p>
          <p className="text-xs text-muted-foreground">of {GOAL} glasses</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setGlasses(glasses + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">{Math.round(pct)}% of daily goal</p>
    </div>
  );
};

export default WaterTracker;
