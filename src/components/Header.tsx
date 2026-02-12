import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Dumbbell, Brain, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", label: "Home", icon: Activity },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/workouts", label: "Workouts", icon: Dumbbell },
  { to: "/wellness", label: "Wellness", icon: Brain },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            VITALIS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to}>
                <Button
                  variant="ghost"
                  className={`gap-2 text-sm ${active ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container flex flex-col gap-1 py-4">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 ${active ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
