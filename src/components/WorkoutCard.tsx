import { Clock, Flame, ChevronRight } from "lucide-react";

interface WorkoutCardProps {
  title: string;
  category: string;
  duration: string;
  calories: string;
  difficulty: string;
}

const WorkoutCard = ({ title, category, duration, calories, difficulty }: WorkoutCardProps) => {
  return (
    <div className="card-gradient rounded-xl border border-border/50 p-5 hover:border-primary/30 transition-colors cursor-pointer group">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">{category}</span>
          <h4 className="font-display font-semibold text-base mt-1">{title}</h4>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {duration}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Flame className="h-3 w-3" /> {calories}
            </span>
          </div>
          <span className="inline-block mt-2 text-[10px] uppercase tracking-wider rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
            {difficulty}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
      </div>
    </div>
  );
};

export default WorkoutCard;
