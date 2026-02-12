import Header from "@/components/Header";
import WorkoutCard from "@/components/WorkoutCard";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";

const allWorkouts = [
  { title: "Morning HIIT Blast", category: "Cardio", duration: "25 min", calories: "320 kcal", difficulty: "Intermediate" },
  { title: "Full Body Strength", category: "Strength", duration: "45 min", calories: "450 kcal", difficulty: "Advanced" },
  { title: "Yoga Flow", category: "Flexibility", duration: "30 min", calories: "150 kcal", difficulty: "Beginner" },
  { title: "Core Crusher", category: "Strength", duration: "20 min", calories: "200 kcal", difficulty: "Intermediate" },
  { title: "5K Run Training", category: "Cardio", duration: "35 min", calories: "380 kcal", difficulty: "Beginner" },
  { title: "Power Lifting", category: "Strength", duration: "50 min", calories: "500 kcal", difficulty: "Advanced" },
];

const Workouts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <Dumbbell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Workout Plans</h1>
              <p className="text-sm text-muted-foreground">AI-curated exercise routines</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allWorkouts.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <WorkoutCard {...w} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Workouts;
