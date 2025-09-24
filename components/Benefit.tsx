import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Benefit({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3 text-slate-700">
          <span className="inline-flex items-center justify-center size-9 rounded-xl bg-slate-100">
            {icon}
          </span>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-slate-600 text-sm">{desc}</CardContent>
    </Card>
  );
}
