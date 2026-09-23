import type { ListData, ObjectData } from '@semcore/ui/d3-chart';

export const withUpdatedKeyAt =
  <P extends ObjectData>(index: number, payload: P) =>
    (base: ListData): ListData => [...base.slice(0, index), { ...base[index], ...payload }, ...base.slice(index + 1)];
