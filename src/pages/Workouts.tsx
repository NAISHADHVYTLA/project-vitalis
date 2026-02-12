import Header from "@/components/Header";
import WorkoutCard from "@/components/WorkoutCard";
import { motion } from "framer-motion";
import { Dumbbell, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const allWorkouts = [
  { title: "Morning HIIT Blast", category: "Cardio", duration: "25 min", calories: "320 kcal", difficulty: "Intermediate" },
  { title: "Full Body Strength", category: "Strength", duration: "45 min", calories: "450 kcal", difficulty: "Advanced" },
  { title: "Yoga Flow", category: "Flexibility", duration: "30 min", calories: "150 kcal", difficulty: "Beginner" },
  { title: "Core Crusher", category: "Strength", duration: "20 min", calories: "200 kcal", difficulty: "Intermediate" },
  { title: "5K Run Training", category: "Cardio", duration: "35 min", calories: "380 kcal", difficulty: "Beginner" },
  { title: "Power Lifting", category: "Strength", duration: "50 min", calories: "500 kcal", difficulty: "Advanced" },
  { title: "Pilates Basics", category: "Flexibility", duration: "40 min", calories: "180 kcal", difficulty: "Beginner" },
  { title: "Boxing Cardio", category: "Cardio", duration: "30 min", calories: "400 kcal", difficulty: "Intermediate" },
  { title: "Stretching Routine", category: "Flexibility", duration: "15 min", calories: "80 kcal", difficulty: "Beginner" },
];

const categories = ["All", "Cardio", "Strength", "Flexibility"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const Workouts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allWorkouts.filter((w) => {
    const matchCat = selectedCategory === "All" || w.category === selectedCategory;
    const matchDiff = selectedDifficulty === "All" || w.difficulty === selectedDifficulty;
    const matchSearch = w.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">Workout Library</h1>
                <p className="text-sm text-muted-foreground">
                  {filtered.length} workouts available · <Sparkles className="h-3 w-3 inline text-primary" /> AI-curated
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass glass-border rounded-2xl p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                placeholder="Search workouts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/40 border-border/40 rounded-xl"
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex gap-1.5">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "ghost"}
                    size="sm"
                    className={`text-xs rounded-lg h-8 ${
                      selectedCategory === cat ? "glow" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Difficulty chips */}
          <div className="flex gap-1.5 mt-3">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`text-[11px] px-3 py-1 rounded-full border transition-all ${
                  selectedDifficulty === diff
                    ? "border-primary/40 bg-primary/10 text-primary font-medium"
                    : "border-border/30 text-muted-foreground hover:text-foreground hover:border-border/50"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((w, i) => (
            <motion.div
              key={`${w.title}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <WorkoutCard {...w} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Dumbbell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No workouts match your filters</p>
            <Button
              variant="ghost"
              className="mt-2 text-primary"
              onClick={() => { setSelectedCategory("All"); setSelectedDifficulty("All"); setSearch(""); }}
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Workouts;
