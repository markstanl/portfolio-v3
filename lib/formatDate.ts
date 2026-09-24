export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Abbreviated caps date, LessWrong-style: "SEP 23" for this year, "SEP 24, 2025" otherwise. */
export function formatShortDate(date: string): string {
  const d = new Date(date);
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();

  if (d.getFullYear() !== new Date().getFullYear()) {
    return `${month} ${day}, ${d.getFullYear()}`;
  }
  return `${month} ${day}`;
}
