import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function DayCard({
  day,
  mode,
  title,
  objective,
  highlights,
}: {
  day: string;
  mode?: string;
  title: string;
  objective: string;
  highlights: string[];
}) {
  return (
    <Card className="rounded-3xl overflow-hidden">
      <CardHeader className="bg-slate-50/60">
        <div className="flex items-center justify-between">
          <div className="font-semibold">
            {day} · {title}
          </div>
          {/* <span className="text-xs rounded-full border px-3 py-1 bg-white">
            {mode}
          </span> */}
        </div>
      </CardHeader>
      <CardContent className="pt-6 text-slate-700 text-sm">
        <p className="mb-3">
          <span className="font-medium text-slate-900">Objective:</span>{" "}
          {objective}
        </p>
        <ul className="space-y-2">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <ChevronRight className="mt-0.5 size-4 text-slate-400" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
