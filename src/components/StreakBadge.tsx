import { useState, useEffect } from "react";
import { Trophy, Flame, Star, Zap, Target, Crown } from "lucide-react";
import { motion } from "framer-motion";

const STREAK_KEY = "vitalis-streak";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalXP: number;
  level: number;
  achievements: string[];
}

const defaultStreak: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: "",
  totalXP: 0,
  level: 1,
  achievements: [],
};

const ACHIEVEMENTS = [
  { id: "first_login", label: "First Steps", desc: "Log in for the first time", icon: Star, xp: 50 },
  { id: "streak_3", label: "On Fire", desc: "3-day streak", icon: Flame, xp: 100 },
  { id: "streak_7", label: "Unstoppable", desc: "7-day streak", icon: Zap, xp: 250 },
  { id: "streak_30", label: "Legend", desc: "30-day streak", icon: Crown, xp: 1000 },
  { id: "xp_500", label: "Rising Star", desc: "Earn 500 XP", icon: Target, xp: 0 },
  { id: "xp_2000", label: "Elite", desc: "Earn 2,000 XP", icon: Trophy, xp: 0 },
];

const getLevel = (xp: number) => Math.floor(xp / 200) + 1;
const getXPForLevel = (level: number) => (level - 1) * 200;
const getXPProgress = (xp: number) => {
  const level = getLevel(xp);
  const current = xp - getXPForLevel(level);
  return (current / 200) * 100;
};

export const useStreak = () => {
  const [streak, setStreak] = useState<StreakData>(defaultStreak);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STREAK_KEY);
      if (saved) {
        const data: StreakData = JSON.parse(saved);
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (data.lastActiveDate === today) {
          setStreak(data);
        } else if (data.lastActiveDate === yesterday) {
          const updated = {
            ...data,
            currentStreak: data.currentStreak + 1,
            longestStreak: Math.max(data.longestStreak, data.currentStreak + 1),
            lastActiveDate: today,
            totalXP: data.totalXP + 25,
            level: getLevel(data.totalXP + 25),
          };
          // Check streak achievements
          if (updated.currentStreak >= 3 && !updated.achievements.includes("streak_3")) {
            updated.achievements.push("streak_3");
            updated.totalXP += 100;
          }
          if (updated.currentStreak >= 7 && !updated.achievements.includes("streak_7")) {
            updated.achievements.push("streak_7");
            updated.totalXP += 250;
          }
          if (updated.currentStreak >= 30 && !updated.achievements.includes("streak_30")) {
            updated.achievements.push("streak_30");
            updated.totalXP += 1000;
          }
          updated.level = getLevel(updated.totalXP);
          setStreak(updated);
          localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
        } else {
          // Streak broken
          const updated = {
            ...data,
            currentStreak: 1,
            lastActiveDate: today,
            totalXP: data.totalXP + 10,
            level: getLevel(data.totalXP + 10),
          };
          setStreak(updated);
          localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
        }
      } else {
        const initial: StreakData = {
          currentStreak: 1,
          longestStreak: 1,
          lastActiveDate: new Date().toDateString(),
          totalXP: 50,
          level: 1,
          achievements: ["first_login"],
        };
        setStreak(initial);
        localStorage.setItem(STREAK_KEY, JSON.stringify(initial));
      }
    } catch {
      // silent fail
    }
  }, []);

  const addXP = (amount: number) => {
    setStreak((prev) => {
      const updated = {
        ...prev,
        totalXP: prev.totalXP + amount,
        level: getLevel(prev.totalXP + amount),
      };
      // Check XP achievements
      if (updated.totalXP >= 500 && !updated.achievements.includes("xp_500")) {
        updated.achievements.push("xp_500");
      }
      if (updated.totalXP >= 2000 && !updated.achievements.includes("xp_2000")) {
        updated.achievements.push("xp_2000");
      }
      localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { streak, addXP };
};

const StreakBadge = ({ streak }: { streak: StreakData }) => {
  const xpProgress = getXPProgress(streak.totalXP);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-4"
    >
      {/* Streak flame */}
      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20">
          <Flame className="h-7 w-7 text-orange-400" />
        </div>
        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
          {streak.currentStreak}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold">{streak.currentStreak}-day streak</span>
          <span className="text-[10px] text-muted-foreground">Best: {streak.longestStreak}</span>
        </div>
        {/* XP bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <span className="text-[10px] font-medium text-primary">Lv.{streak.level}</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">{streak.totalXP} XP total</p>
      </div>
    </motion.div>
  );
};

export const AchievementGrid = ({ achievements }: { achievements: string[] }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {ACHIEVEMENTS.map((a) => {
        const unlocked = achievements.includes(a.id);
        return (
          <motion.div
            key={a.id}
            whileHover={{ scale: 1.05 }}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
              unlocked
                ? "border-primary/30 bg-primary/5"
                : "border-border/30 bg-secondary/20 opacity-40"
            }`}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              unlocked ? "bg-primary/15" : "bg-secondary/50"
            }`}>
              <a.icon className={`h-4 w-4 ${unlocked ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <span className="text-[10px] font-medium text-center leading-tight">{a.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StreakBadge;
