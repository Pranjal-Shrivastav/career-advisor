import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Compass, School2, BellRing, Brain, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:gap-12 md:py-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/80">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Smart guidance for Classes 9–12</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              One-Stop Career & Education Advisor
            </h1>
            <p className="max-w-prose text-base text-muted-foreground md:text-lg">
              Discover the right stream and colleges for you. Take a quick quiz
              to get personalized recommendations across Science, Arts, Commerce
              and Vocational tracks.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/quiz">Start Quiz</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link to="#how-it-works">How it works</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> No signup</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Free to use</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Privacy-first</span>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md md:max-w-none">
            <div className="relative rounded-3xl border bg-white p-6 shadow-xl">
              <div className="absolute -top-3 -right-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow">Live</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-4">
                  <Compass className="h-6 w-6 text-primary" />
                  <p className="mt-2 text-sm font-semibold">Stream Finder</p>
                  <p className="text-xs text-muted-foreground">Personalized recommendations</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 p-4">
                  <School2 className="h-6 w-6 text-accent" />
                  <p className="mt-2 text-sm font-semibold">Govt. Colleges</p>
                  <p className="text-xs text-muted-foreground">Trusted & affordable</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-4">
                  <BellRing className="h-6 w-6 text-primary" />
                  <p className="mt-2 text-sm font-semibold">Deadlines</p>
                  <p className="text-xs text-muted-foreground">Admissions & scholarships</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-transparent p-4">
                  <Brain className="h-6 w-6 text-accent" />
                  <p className="mt-2 text-sm font-semibold">Easy Quiz</p>
                  <p className="text-xs text-muted-foreground">Takes under 2 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-center text-2xl font-bold md:text-3xl">How it works</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          Answer a few questions, get your recommended stream, explore nearby
          government colleges and never miss important dates.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Take the Quiz",
              desc: "Simple Yes/No and multiple choice questions.",
              icon: CheckCircle2,
            },
            {
              title: "See Your Stream",
              desc: "Science, Arts, Commerce or Vocational — with reasons.",
              icon: Compass,
            },
            {
              title: "Explore Colleges",
              desc: "Find nearby government colleges, courses and facilities.",
              icon: School2,
            },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border bg-card p-6 shadow-sm">
              <f.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-8 text-white">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-black/10 blur-3xl" />
          <div className="relative z-10 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Ready to plan your future?</h3>
              <p className="text-sm opacity-90">Take the quiz and get your personalized roadmap today.</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90">
              <Link to="/quiz">Start Quiz</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
