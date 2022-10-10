export default function hasNull(item, dataKey?: string) {
  const { x, y, payload } = item;
  return (
    x === null ||
    y === null ||
    (dataKey && Object.hasOwnProperty.call(payload, dataKey) && payload[dataKey] === null)
  );
}
