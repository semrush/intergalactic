export const chartPaletteLines = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  ...Object.fromEntries(
    Array.from({ length: 24 }, (_, lineIndex) => [
      `line${lineIndex + 1}`,
      Math.abs(Math.sin(Math.exp(i) + lineIndex * 0.7)) * 10,
    ]),
  ),
}));
