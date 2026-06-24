export function formatCurrency(amount: number, locale = "en-IN", currency = "INR"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

export function formatDate(date: string | Date, locale = "en-IN"): string {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}

export function attendanceColor(pct: number): "success" | "warning" | "danger" {
  if (pct >= 85) return "success";
  if (pct >= 75) return "warning";
  return "danger";
}

export function gradeFromPercentage(pct: number): string {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  if (pct >= 50) return "C";
  if (pct >= 35) return "D";
  return "F";
}

export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function paginate<T>(items: T[], page: number, pageSize: number): { data: T[]; total: number } {
  const start = (page - 1) * pageSize;
  return { data: items.slice(start, start + pageSize), total: items.length };
}
