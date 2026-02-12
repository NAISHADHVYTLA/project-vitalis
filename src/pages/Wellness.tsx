import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Brain, Wind, SmilePlus, BookOpen } from "lucide-react";

const tools = [
  { icon: Wind, title: "Breathing Exercise", desc: "Guided 4-7-8 breathing for calm and focus", action: "Start Session" },
  { icon: SmilePlus, title: "Mood Check-in", desc: "Log how you're feeling today and track patterns", action: "Log Mood" },
  { icon: BookOpen, title: "Gratitude Journal", desc: "Write down 3 things you're grateful for", action: "Open Journal" },
  { icon: Brain, title: "Meditation", desc: "5-minute guided mindfulness meditation", action: "Begin" },
];

const Wellness = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Mental Wellness</h1>
              <p className="text-sm text-muted-foreground">Tools for your mind and spirit</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-gradient rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 mb-4">
                <tool.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">{tool.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tool.desc}</p>
              <span className="text-sm font-medium text-primary group-hover:underline">{tool.action} →</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Wellness;
