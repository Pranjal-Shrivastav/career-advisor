import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, CheckCircle2 } from "lucide-react";

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const state =
    (location.state as { stream?: string; description?: string }) || {};
  const saved = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("career-advisor-result") || "null",
      );
    } catch {
      return null;
    }
  })();
  const stream = state.stream || saved?.stream;
  const description = state.description || saved?.description;

  useEffect(() => {
    if (!stream) navigate("/quiz");
  }, [navigate, stream]);
  if (!stream) return null;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-tight">
              Recommended Stream: {stream}
            </h1>
            <p className="text-sm text-muted-foreground">
              Based on your quiz responses
            </p>
          </div>
        </div>
        <p className="mt-5 text-base leading-relaxed text-foreground/90">
          {description}
        </p>

        <div className="mt-6 grid gap-2 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent" /> Personalised
            guidance
          </div>
          <div className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent" /> Nearby government
            college suggestions
          </div>
          <div className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent" /> Admission &
            scholarship deadlines
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="rounded-full px-6">
            <Link to={`/colleges?stream=${encodeURIComponent(stream)}`}>
              See Colleges
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-6"
            onClick={() => navigate("/quiz")}
          >
            Retake Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
