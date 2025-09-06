import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Lightweight progress component (fallback if not present)
function LocalProgress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

const Bar = (props: { value: number }) => {
  // Prefer shadcn Progress if available
  // @ts-ignore
  return Progress ? <Progress {...props} /> : <LocalProgress value={props.value} />;
};

export type Stream = "Science" | "Arts" | "Commerce" | "Vocational";

type Question =
  | {
      id: string;
      prompt: string;
      type: "yesno";
      effects: { yes: Partial<Record<Stream, number>>; no: Partial<Record<Stream, number>> };
    }
  | {
      id: string;
      prompt: string;
      type: "mc";
      options: { label: string; value: string; effects: Partial<Record<Stream, number>> }[];
    };

const QUESTIONS: Question[] = [
  {
    id: "maths",
    prompt: "Do you enjoy Mathematics and problem solving?",
    type: "yesno",
    effects: {
      yes: { Science: 2, Commerce: 1 },
      no: { Arts: 1, Vocational: 1 },
    },
  },
  {
    id: "creative",
    prompt: "Which activity sounds most exciting to you?",
    type: "mc",
    options: [
      { label: "Designing posters or writing", value: "arts", effects: { Arts: 2 } },
      { label: "Building a robot or app", value: "science", effects: { Science: 2 } },
      { label: "Running a small business", value: "commerce", effects: { Commerce: 2 } },
      { label: "Learning a hands-on trade", value: "voc", effects: { Vocational: 2 } },
    ],
  },
  {
    id: "people",
    prompt: "Do you enjoy understanding society, cultures and people?",
    type: "yesno",
    effects: {
      yes: { Arts: 2 },
      no: { Science: 1, Commerce: 1 },
    },
  },
  {
    id: "business",
    prompt: "How interested are you in finance, markets or entrepreneurship?",
    type: "mc",
    options: [
      { label: "Very interested", value: "high", effects: { Commerce: 2 } },
      { label: "Somewhat", value: "mid", effects: { Commerce: 1 } },
      { label: "Not really", value: "low", effects: { Arts: 1, Vocational: 1 } },
    ],
  },
  {
    id: "labs",
    prompt: "Do you like experiments, labs and scientific inquiry?",
    type: "yesno",
    effects: {
      yes: { Science: 2 },
      no: { Arts: 1, Commerce: 1, Vocational: 1 },
    },
  },
  {
    id: "hands",
    prompt: "Do you prefer hands-on practical learning over theory?",
    type: "yesno",
    effects: {
      yes: { Vocational: 2, Science: 1 },
      no: { Arts: 1, Commerce: 1 },
    },
  },
  {
    id: "subjects",
    prompt: "Pick a favourite subject group",
    type: "mc",
    options: [
      { label: "Physics/Chemistry/Maths", value: "pcm", effects: { Science: 2 } },
      { label: "Economics/Accounts/Business", value: "com", effects: { Commerce: 2 } },
      { label: "History/Political Science/English", value: "arts", effects: { Arts: 2 } },
      { label: "IT/Automobile/Electrical", value: "voc", effects: { Vocational: 2 } },
    ],
  },
  {
    id: "future",
    prompt: "Which future appeals to you most?",
    type: "mc",
    options: [
      { label: "Engineer, doctor, researcher", value: "sci", effects: { Science: 2 } },
      { label: "Designer, writer, social sciences", value: "art", effects: { Arts: 2 } },
      { label: "CA, analyst, entrepreneur", value: "com", effects: { Commerce: 2 } },
      { label: "Skilled technician, ITI, polytechnic", value: "voc", effects: { Vocational: 2 } },
    ],
  },
];

const DESCRIPTIONS: Record<Stream, string> = {
  Science:
    "You show strong analytical and scientific interests. Science offers pathways like Engineering, Medicine, Research and Technology.",
  Arts:
    "You value creativity, society and expression. Arts opens up Humanities, Design, Media, Law and Social Sciences.",
  Commerce:
    "You lean towards business, numbers and markets. Commerce leads to Finance, Accounting, Management and Entrepreneurship.",
  Vocational:
    "You enjoy practical, hands-on learning. Vocational tracks prepare you for in-demand technical careers with early industry exposure.",
};

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Record<Stream, number>>({
    Science: 0,
    Arts: 0,
    Commerce: 0,
    Vocational: 0,
  });
  const navigate = useNavigate();
  const total = QUESTIONS.length;
  const current = QUESTIONS[index];

  const progress = useMemo(() => ((index) / total) * 100, [index, total]);

  function applyEffects(effects: Partial<Record<Stream, number>>) {
    setScores((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(effects)) {
        next[k as Stream] = (next[k as Stream] || 0) + (v || 0);
      }
      return next;
    });
  }

  function nextQuestion() {
    if (index + 1 < total) setIndex(index + 1);
    else finish();
  }

  function answerYesNo(ans: "yes" | "no") {
    const q = current as Extract<Question, { type: "yesno" }>;
    applyEffects(q.effects[ans]);
    nextQuestion();
  }

  function answerMC(optEffects: Partial<Record<Stream, number>>) {
    applyEffects(optEffects);
    nextQuestion();
  }

  function finish() {
    const [stream] = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([k]) => k as Stream);
    const result = stream || ("Science" as Stream);
    const payload = { stream: result, description: DESCRIPTIONS[result] };
    localStorage.setItem("career-advisor-result", JSON.stringify(payload));
    navigate("/results", { state: payload });
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Career Stream Quiz</h1>
          <p className="text-sm text-muted-foreground">Question {index + 1} of {total}</p>
        </div>
        <div className="w-40">
          <Bar value={progress} />
        </div>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <p className="text-lg font-semibold leading-snug">{current.prompt}</p>
        {current.type === "yesno" ? (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button className="h-12 rounded-xl" onClick={() => answerYesNo("yes")}>Yes</Button>
            <Button variant="outline" className="h-12 rounded-xl" onClick={() => answerYesNo("no")}>
              No
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            {(current as Extract<Question, { type: "mc" }>).options.map((o) => (
              <button
                key={o.value}
                onClick={() => answerMC(o.effects)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border bg-white p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/5",
                )}
              >
                <span className="font-medium">{o.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <span>Progress: {Math.round(progress)}%</span>
        <span>Streams: Science, Arts, Commerce, Vocational</span>
      </div>
    </div>
  );
}
