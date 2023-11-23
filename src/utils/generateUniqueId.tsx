export function generateUniqueId(label: string): string {
  return `name-${new Date().getTime()}-${label}`;
}
