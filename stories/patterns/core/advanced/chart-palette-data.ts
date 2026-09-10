export const chartPaletteLines = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  ...Object.fromEntries(
    Array.from({ length: 24 }, (_, lineIndex) => [
      `line${lineIndex + 1}`,
      Math.abs(Math.sin(Math.exp(i) + lineIndex * 0.7)) * 10,
    ]),
  ),
}));

export const chartSemanticLines = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  critical: Math.abs(Math.sin(Math.exp(i) + 0.2)) * 10,
  success: Math.abs(Math.sin(Math.exp(i) + 1.5)) * 10,
  warning: Math.abs(Math.sin(Math.exp(i) + 3)) * 10,
}));

export const chartIntentLines = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  commercial: Math.abs(Math.sin(Math.exp(i) + 0.4)) * 10,
  informational: Math.abs(Math.sin(Math.exp(i) + 1.2)) * 10,
  navigational: Math.abs(Math.sin(Math.exp(i) + 2.1)) * 10,
  task: Math.abs(Math.sin(Math.exp(i) + 2.8)) * 10,
  transactional: Math.abs(Math.sin(Math.exp(i) + 3.6)) * 10,
}));
