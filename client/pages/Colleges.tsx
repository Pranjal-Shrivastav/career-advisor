import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, MapPin, School2, Check } from "lucide-react";

type College = {
  name: string;
  city: string;
  streams: ("Science" | "Arts" | "Commerce" | "Vocational")[];
  courses: string[];
  facilities: string[];
  link: string;
};

const COLLEGES: College[] = [
  {
    name: "Govt. Polytechnic Institute",
    city: "Lucknow",
    streams: ["Vocational", "Science"],
    courses: ["Diploma in Mechanical", "Electrical", "Computer Science"],
    facilities: ["Workshops", "Labs", "Placement Cell"],
    link: "https://www.polytechnic.college/",
  },
  {
    name: "Govt. College of Arts & Science",
    city: "Bhopal",
    streams: ["Science", "Arts"],
    courses: ["B.Sc (PCM)", "B.Sc (Bio)", "BA (Hons)"],
    facilities: ["Library", "Research Labs", "Sports"],
    link: "https://www.example.edu/",
  },
  {
    name: "Govt. Commerce College",
    city: "Ahmedabad",
    streams: ["Commerce"],
    courses: ["B.Com (Accounts)", "BBA", "Economics"],
    facilities: ["Incubation Center", "Auditorium", "Wi‑Fi"],
    link: "https://www.example-commerce.ac.in/",
  },
  {
    name: "State Industrial Training Institute (ITI)",
    city: "Pune",
    streams: ["Vocational"],
    courses: ["Fitter", "Electrician", "Welder", "COPA"],
    facilities: ["Industry Tie-ups", "Apprenticeships"],
    link: "https://www.example-iti.gov/",
  },
  {
    name: "Govt. Humanities College",
    city: "Kolkata",
    streams: ["Arts"],
    courses: ["History", "Political Science", "Psychology"],
    facilities: ["Cultural Clubs", "Library"],
    link: "https://www.example-humanities.edu/",
  },
];

export default function Colleges() {
  const [params] = useSearchParams();
  const stream = params.get("stream");

  const list = useMemo(() => {
    if (!stream) return COLLEGES;
    return COLLEGES.filter((c) => c.streams.includes(stream as any));
  }, [stream]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Nearby Government Colleges</h1>
        <p className="text-sm text-muted-foreground">
          Showing colleges{stream ? ` for ${stream}` : " across streams"}. All institutions listed are government/public.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <div key={c.name} className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold leading-tight">{c.name}</h3>
                <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {c.city}
                </div>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                <School2 className="h-3.5 w-3.5 text-primary" /> {c.streams.join(", ")}
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm font-medium">Popular Courses</p>
              <ul className="mt-1 grid grid-cols-1 gap-1 text-sm text-muted-foreground">
                {c.courses.map((course) => (
                  <li key={course} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" /> {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <p className="text-sm font-medium">Facilities</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {c.facilities.map((f) => (
                  <span key={f} className="rounded-full bg-muted px-2 py-1 text-xs text-foreground/80">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5"
            >
              Visit Website <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
