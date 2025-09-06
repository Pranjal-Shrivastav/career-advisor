import { CalendarDays, Bell, Bookmark } from "lucide-react";

type Item = {
  title: string;
  date: string; // ISO
  type: "admission" | "scholarship";
  org: string;
};

const ITEMS: Item[] = [
  { title: "State Engineering Entrance Application Opens", date: "2025-10-01", type: "admission", org: "State Board" },
  { title: "National Scholarship (Merit) Deadline", date: "2025-11-15", type: "scholarship", org: "Govt. of India" },
  { title: "Polytechnic Admissions Round 1", date: "2025-08-20", type: "admission", org: "DTE" },
  { title: "Arts & Humanities Scholarship Results", date: "2025-09-05", type: "scholarship", org: "Ministry of Education" },
].sort((a,b)=> a.date.localeCompare(b.date));

const badgeStyles: Record<Item["type"], string> = {
  admission: "bg-primary/10 text-primary",
  scholarship: "bg-accent/10 text-accent",
};

export default function Notifications() {
  const today = new Date().toISOString().slice(0,10);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-sm text-muted-foreground">Admission dates and scholarship deadlines in a simple timeline.</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />
        <ul className="space-y-6">
          {ITEMS.map((it, idx) => {
            const upcoming = it.date >= today;
            return (
              <li key={idx} className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-6">
                  <div className="md:col-start-1 md:ml-auto md:text-right">
                    <span className="inline-flex items-center gap-2 rounded-full bg-muted px-2 py-1 text-xs text-foreground/70">
                      <CalendarDays className="h-3.5 w-3.5" /> {new Date(it.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="md:col-start-2 md:mr-auto">
                    <div className="relative rounded-2xl border bg-card p-5 shadow-sm">
                      <div className="absolute left-3 -top-3 inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium md:left-6"
                        style={{}}
                      >
                        <span className={badgeStyles[it.type]}>{it.type === 'admission' ? 'Admission' : 'Scholarship'}</span>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-semibold leading-tight">{it.title}</h3>
                          <p className="text-xs text-muted-foreground">{it.org}</p>
                        </div>
                        {upcoming ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            <Bell className="h-3.5 w-3.5" /> Upcoming
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium text-foreground/70">
                            <Bookmark className="h-3.5 w-3.5" /> Past
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
