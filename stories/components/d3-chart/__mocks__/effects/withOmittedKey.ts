import type { ListData } from '@semcore/d3-chart';

export const withOmittedKey =
  (key: string) =>
    (base: ListData): ListData =>
      base.map((i) => {
        const { [key]: ommitedKey, ...rest } = i;

        return { ...rest };
      });
