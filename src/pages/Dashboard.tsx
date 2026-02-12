import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import BMICalculator from "@/components/BMICalculator";
import WaterTracker from "@/components/WaterTracker";
import CalorieTracker from "@/components/CalorieTracker";
import WorkoutCard from "@/components/WorkoutCard";
import WeeklyChart from "@/components/WeeklyChart";
import GoalRings from "@/components/GoalRings";
import AIRecommendations from "@/components/AIRecommendations";
import HealthInsights from "@/components/HealthInsights";
import StreakBadge, { AchievementGrid, useStreak } from "@/components/StreakBadge";
import { motion } from "framer-motion";
import { Trophy, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const workouts = [
  { title: "Morning HIIT Blast", category: "Cardio", duration: "25 min", calories: "320 kcal", difficulty: "Intermediate" },
  { title: "Full Body Strength", category: "Strength", duration: "45 min", calories: "450 kcal", difficulty: "Advanced" },
  { title: "Yoga Flow", category: "Flexibility", duration: "30 min", calories: "150 kcal", difficulty: "Beginner" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { streak } = useStreak();

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-16">
        {/* Personalized greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold mb-1">
                {greeting}, <span className="text-gradient">{displayName}</span> 👋
              </h1>
              <p className="text-muted-foreground">
                Here's your health overview for today. Keep up the great work!
              </p>
            </div>
            <div className="glass glass-border rounded-2xl p-4 min-w-[280px]">
              <StreakBadge streak={streak} />
            </div>
          </div>
        </motion.div>

        {/* Goal Rings */}
        <GoalRings />

        {/* Stats Cards */}
        <div className="mt-6">
          <StatsCards />
        </div>

        {/* Weekly Chart + AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          <WeeklyChart />
          <AIRecommendations />
        </div>

        {/* BMI + Water */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          <BMICalculator />
          <WaterTracker />
        </div>

        {/* Calorie Tracker */}
        <div className="mt-6">
          <CalorieTracker />
        </div>

        {/* Health Insights */}
        <div className="mt-6">
          <HealthInsights />
        </div>

        {/* Today's Workouts */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Today's Workouts</h2>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary" /> AI-curated for you
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workouts.map((w, i) => (
              <WorkoutCard key={i} {...w} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 card-gradient rounded-xl border border-border/50 p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20">
              <Trophy className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">Achievements</h3>
              <p className="text-xs text-muted-foreground">
                {streak.achievements.length} of 6 unlocked
              </p>
            </div>
          </div>
          <AchievementGrid achievements={streak.achievements} />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
