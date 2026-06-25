export function percentage(part, total) {
  if (!total) return 0;
  return ((part / total) * 100).toFixed(1);
}