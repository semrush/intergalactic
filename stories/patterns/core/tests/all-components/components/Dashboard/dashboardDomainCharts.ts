import LineMockData from '../../../../../../components/d3-chart/__mocks__/line';
import StackAreaMockData from '../../../../../../components/d3-chart/__mocks__/stacked-area';

export const DASHBOARD_DOMAIN_OPTIONS = Array.from({ length: 16 }, (_, i) => {
  const v = `domain${i + 1}`;
  return { value: v, label: v, children: v };
});

type ActiveDomainSlot = { slotIndex: number; name: string };

function slotSeriesKey(slotIndex: number) {
  return `slot_${slotIndex}`;
}

function getActiveDomainSlots(domains: (string | undefined)[]): ActiveDomainSlot[] {
  return domains
    .map((d, slotIndex) => (typeof d === 'string' && d.trim() !== '' ? { slotIndex, name: d } : null))
    .filter((x): x is ActiveDomainSlot => x != null);
}

export function buildDashboardLineChart(domains: (string | undefined)[]) {
  const slots = getActiveDomainSlots(domains);
  const templateRows = LineMockData.TwoLines;
  if (slots.length === 0) {
    const data = templateRows.map((row) => ({
      x: row.x,
      placeholder: row.line1,
    }));
    return {
      data,
      legendProps: { legendMap: { placeholder: { label: 'Select domain' } } },
    };
  }
  const data = templateRows.map((row) => {
    const point: Record<string, number> = { x: row.x };
    slots.forEach((s, j) => {
      const vBase = j % 2 === 0 ? row.line1 : row.line2;
      point[slotSeriesKey(s.slotIndex)] = vBase + s.slotIndex * 0.35 + j * 0.25;
    });
    return point;
  });
  const legendMap = Object.fromEntries(slots.map((s) => [slotSeriesKey(s.slotIndex), { label: s.name }]));
  return { data, legendProps: { legendMap } };
}

export function buildDashboardAreaChart(domains: (string | undefined)[]) {
  const slots = getActiveDomainSlots(domains);
  const templateRows = StackAreaMockData.Default;
  if (slots.length === 0) {
    const data = templateRows.map((row) => ({
      time: row.time,
      placeholder: 0.2,
    }));
    return {
      data,
      legendProps: { legendMap: { placeholder: { label: 'Select domain' } } },
    };
  }
  const data = templateRows.map((row) => {
    const point: Record<string, unknown> = { time: row.time };
    slots.forEach((s, j) => {
      const stackNum = (j % 3) + 1;
      const src = row[`stack${stackNum}` as 'stack1'];
      const v = typeof src === 'number' ? Math.max(0.1, src + s.slotIndex * 0.12 + j * 0.08) : 0.1;
      point[slotSeriesKey(s.slotIndex)] = v;
    });
    return point;
  });
  const legendMap = Object.fromEntries(slots.map((s) => [slotSeriesKey(s.slotIndex), { label: s.name }]));
  return { data, legendProps: { legendMap } };
}
