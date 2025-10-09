export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
// utils/getSessions.ts

// utils/getRotatingSessions.ts
type Session = { id: number; month: string; date: string };

/**
 * Returns 3 sessions based on the rotating start months [Nov, Feb, May, Aug].
 * Each session's `date` is the first Friday of that month.
 */
export function getRotatingSessions(referenceDate: Date = new Date()): Session[] {
  const startMonths = [11, 2, 5, 8]; // 1-based month numbers: Nov, Feb, May, Aug
  const now = referenceDate;
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentYear = now.getFullYear();

  // pick the next start month strictly after the current month (cyclic)
  let chosenStart = startMonths[0];
  let bestDelta = 13;
  for (const s of startMonths) {
    let delta = (s - currentMonth + 12) % 12;
    if (delta === 0) delta = 12; // same month -> treat as full cycle (pick next)
    if (delta < bestDelta) {
      bestDelta = delta;
      chosenStart = s;
    }
  }

  // If chosenStart is <= currentMonth, it's in the next year
  const baseYear = currentYear + (chosenStart <= currentMonth ? 1 : 0);

  const sessions: Session[] = [];
  for (let i = 0; i < 3; i++) {
    const monthNumber1 = chosenStart + i;               // 1-based (may exceed 12)
    const year = baseYear + Math.floor((monthNumber1 - 1) / 12);
    const month0 = ((monthNumber1 - 1) % 12);           // 0-based for JS Date

    const firstFriday = getFirstFriday(year, month0);
    const monthName = firstFriday.toLocaleString("en-US", { month: "long" });
    const formatted = firstFriday.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    sessions.push({ id: i + 1, month: `${monthName} ${year}`, date: formatted });
  }

  return sessions;
}

function getFirstFriday(year: number, month0: number): Date {
  const d = new Date(year, month0, 1);
  const day = d.getDay(); // 0 = Sun, 5 = Fri
  const daysUntilFriday = (5 - day + 7) % 7;
  d.setDate(d.getDate() + daysUntilFriday);
  return d;
}

