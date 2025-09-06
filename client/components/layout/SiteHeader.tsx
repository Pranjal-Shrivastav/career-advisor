import { Link, NavLink, useLocation } from "react-router-dom";
import { GraduationCap, School2, Bell, Home, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NavItem = ({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<any>;
}) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors",
          isActive || active
            ? "bg-secondary text-foreground"
            : "text-foreground/70 hover:text-foreground hover:bg-muted",
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </NavLink>
  );
};

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight">Career Advisor</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          <NavItem to="/" label="Home" icon={Home} />
          <NavItem to="/quiz" label="Quiz" icon={ListTodo} />
          <NavItem to="/colleges" label="Colleges" icon={School2} />
          <NavItem to="/notifications" label="Notifications" icon={Bell} />
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="rounded-full px-4">
            <Link to="/quiz">Start Quiz</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
