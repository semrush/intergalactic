export const makeBezier = (
  points: { x: number; y: number; weight?: number }[],
  bounds: { width: number; height: number },
) => {
  const yPoints = points.map((point) => point.y);
  const noPoints = points.map(() => 1);
  const weightPoints = points.map((point) => point.weight ?? 1);
  const process = (t: number, points: number[]) => {
    let result = 0;
    for (let i = 0; i < points.length; i++) {
      const tPower = i;
      const reversedTPower = points.length - 1 - i;
      const edge = i === 0 || i === points.length - 1;
      const factor = edge ? 1 : points.length - 1;
      const point = points[i];
      const weight = weightPoints[i];
      result += factor * t ** tPower * (1 - t) ** reversedTPower * point * weight;
    }
    return result;
  };

  return (x: number) => {
    const t = x / bounds.width;
    return process(t, yPoints) / process(t, noPoints);
  };
};
