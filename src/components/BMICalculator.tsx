import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calculator, RotateCcw, Pencil } from "lucide-react";

const STORAGE_KEY = "vitalis-bmi";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<{
    bmi: number; bmr: number; tdee: number; category: string; bodyFat: number | null;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setWeight(data.weight || "");
        setHeight(data.height || "");
        setAge(data.age || "");
        setNeck(data.neck || "");
        setWaist(data.waist || "");
        setHip(data.hip || "");
        setGender(data.gender || "male");
        if (data.result) {
          setResult(data.result);
          setIsEditing(false);
        }
      }
    } catch {}
  }, []);

  // Save to localStorage when result changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ weight, height, age, neck, waist, hip, gender, result }));
  }, [weight, height, age, neck, waist, hip, gender, result]);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    const a = parseFloat(age) || 25;
    if (!w || !h) return;

    const bmi = w / (h * h);
    // Mifflin-St Jeor
    const bmr = gender === "male"
      ? 10 * w + 6.25 * (h * 100) - 5 * a + 5
      : 10 * w + 6.25 * (h * 100) - 5 * a - 161;
    const tdee = bmr * 1.55;

    let category = "Normal";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    // US Navy body fat estimation
    let bodyFat: number | null = null;
    const neckCm = parseFloat(neck);
    const waistCm = parseFloat(waist);
    const hipCm = parseFloat(hip);
    const heightCm = h * 100;

    if (gender === "male" && neckCm && waistCm) {
      bodyFat = Math.round(
        (495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450) * 10
      ) / 10;
    } else if (gender === "female" && neckCm && waistCm && hipCm) {
      bodyFat = Math.round(
        (495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450) * 10
      ) / 10;
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      category,
      bodyFat,
    });
    setIsEditing(false);
  };

  const reset = () => {
    setWeight(""); setHeight(""); setAge(""); setNeck(""); setWaist(""); setHip("");
    setGender("male"); setResult(null); setIsEditing(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="card-gradient rounded-xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
            <Calculator className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-lg">Health Calculator</h3>
        </div>
        {result && (
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsEditing(true)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <>
          {/* Gender toggle */}
          <div className="flex rounded-lg bg-secondary/50 p-1 mb-4">
            <button
              className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${gender === "male" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setGender("male")}
            >
              Male
            </button>
            <button
              className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${gender === "female" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setGender("female")}
            >
              Female
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Weight (kg)</label>
              <Input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Height (cm)</label>
              <Input type="number" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Age</label>
              <Input type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Neck (cm)</label>
              <Input type="number" placeholder="38" value={neck} onChange={(e) => setNeck(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Waist (cm)</label>
              <Input type="number" placeholder="85" value={waist} onChange={(e) => setWaist(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
          </div>
          {gender === "female" && (
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1 block">Hip (cm)</label>
              <Input type="number" placeholder="95" value={hip} onChange={(e) => setHip(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
          )}
          <Button onClick={calculate} className="w-full" variant="hero" size="sm">Calculate</Button>
        </>
      ) : null}

      {result && !isEditing && (
        <div className="grid grid-cols-2 gap-3">
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
          {result.bodyFat !== null && (
            <div className="rounded-lg bg-secondary/50 p-3 text-center">
              <p className="text-2xl font-display font-bold text-primary">{result.bodyFat}%</p>
              <p className="text-xs text-muted-foreground">Body Fat</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
