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
