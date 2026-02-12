import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import BMICalculator from "@/components/BMICalculator";
import WaterTracker from "@/components/WaterTracker";
import WorkoutCard from "@/components/WorkoutCard";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const workouts = [
  { title: "Morning HIIT Blast", category: "Cardio", duration: "25 min", calories: "320 kcal", difficulty: "Intermediate" },
  { title: "Full Body Strength", category: "Strength", duration: "45 min", calories: "450 kcal", difficulty: "Advanced" },
  { title: "Yoga Flow", category: "Flexibility", duration: "30 min", calories: "150 kcal", difficulty: "Beginner" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Your daily health overview</p>
            </div>
          </div>
        </motion.div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          <BMICalculator />
          <WaterTracker />
        </div>

        <div className="mt-8">
          <h2 className="font-display font-semibold text-lg mb-4">Today's Workouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workouts.map((w, i) => (
              <WorkoutCard key={i} {...w} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
