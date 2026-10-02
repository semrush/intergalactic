import type { ListData, ObjectData } from '@semcore/d3-chart';

export const withAddedData =
  <P extends ObjectData>(payload: P, at?: number) =>
    (base: ListData): ListData => {
      if (at === undefined) return [...base, payload];

      return [...base.slice(0, at), { ...payload }, ...base.slice(at)];
    };
