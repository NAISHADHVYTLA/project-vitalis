import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calculator } from "lucide-react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; bmr: number; tdee: number; category: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return;

    const bmi = w / (h * h);
    const bmr = 10 * w + 6.25 * (h * 100) - 5 * 25 + 5; // Mifflin-St Jeor (male default, age 25)
    const tdee = bmr * 1.55;

    let category = "Normal";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    setResult({ bmi: Math.round(bmi * 10) / 10, bmr: Math.round(bmr), tdee: Math.round(tdee), category });
  };

  return (
    <div className="card-gradient rounded-xl border border-border/50 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
          <Calculator className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-lg">Health Calculator</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Weight (kg)</label>
          <Input
            type="number"
            placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-secondary/50 border-border/50"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Height (cm)</label>
          <Input
            type="number"
            placeholder="175"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-secondary/50 border-border/50"
          />
        </div>
      </div>

      <Button onClick={calculate} className="w-full" variant="hero" size="sm">
        Calculate
      </Button>

      {result && (
        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="rounded-lg bg-secondary/50 p-3 text-center">
            <p className="text-2xl font-display font-bold text-primary">{result.bmi}</p>
            <p className="text-xs text-muted-foreground">BMI</p>
            <p className="text-[10px] text-primary/80 mt-0.5">{result.category}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3 text-center">
            <p className="text-2xl font-display font-bold text-foreground">{result.bmr}</p>
            <p className="text-xs text-muted-foreground">BMR</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3 text-center">
            <p className="text-2xl font-display font-bold text-foreground">{result.tdee}</p>
            <p className="text-xs text-muted-foreground">TDEE</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
