import { Link } from "react-router-dom";
import { Github, Heart } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white/70 dark:bg-background/70">
      <div className="container mx-auto grid gap-4 py-8 text-sm text-muted-foreground md:grid-cols-3">
        <div className="order-2 md:order-1">
          <p>&copy; {new Date().getFullYear()} Career Advisor. All rights reserved.</p>
        </div>
        <div className="order-1 flex items-center justify-center gap-2 md:order-2">
          <Heart className="h-4 w-4 text-accent" />
          <span>Built for students</span>
        </div>
        <div className="order-3 flex items-center justify-end gap-4">
          <Link to="/notifications" className="hover:text-foreground">Notifications</Link>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
