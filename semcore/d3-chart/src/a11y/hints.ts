import { SerializableDataType } from './insights';
import reactToText from '@semcore/core/lib/utils/reactToText';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type DataStructureHints = {
  fields: {
    verticalAxes: Set<string | number>;
    horizontalAxes: Set<string | number>;
    valueAxes: Set<string | number>;
    values: Set<string | number>;
  };
  groups: Set<string | number>;
  axesTitle: {
    vertical: string | null;
    horizontal: string | null;
  };
  titles: {
    verticalAxes: {
      [dataKey: string | number]: string;
    };
    getVerticalAxesTitle: null | ((dataKey: string | number) => string);
    horizontalAxes: {
      [dataKey: string | number]: string;
    };
    getHorizontalAxesTitle: null | ((dataKey: string | number) => string);
    valuesAxes: {
      [dataKey: string | number]: string;
    };
    getValueAxesTitle: null | ((dataKey: string | number) => string);
  };
  grid: {
    verticalAxes: number | null;
    horizontalAxes: number | null;
  };
  pointsDensity: {
    verticalAxes: number;
    horizontalAxes: number;
  } | null;
  dataType: SerializableDataType | null;
};
export type DataSummarizationConfig = {
  trendTangens: {
    static: number;
    weak: number;
    medium: number;
    strong: number;
  };
  movingAverage: {
    longSize: number | undefined;
    shortSize: number | undefined;
    notableDiff: number | undefined;
  };
  dataType: SerializableDataType | undefined;
  clustersGridSize: number | undefined;
  maxListSymbols: number;
  datesWithTime: boolean | undefined;
  clustersLimit: number;
  valuesLimit: number;
  groupsLimit: number;
  disable: boolean;
  override: string | undefined;
  additionalFields: string[];
  titlesFormatter?: (key: string | number | null) => string | undefined;
  valuesFormatter?: (value: unknown, key: string | number | null) => string | undefined;
};
export type PartialDataSummarizationConfig = DeepPartial<
  Omit<DataSummarizationConfig, 'titlesFormatter' | 'valuesFormatter'>
> & {
  titlesFormatter?: (key: string | number | null) => string | undefined;
  valuesFormatter?: (value: unknown, key: string | number | null) => string | undefined;
};

export const makeDataHintsContainer = (): DataStructureHints => ({
  fields: {
    verticalAxes: new Set(),
    horizontalAxes: new Set(),
    valueAxes: new Set(),
    values: new Set(),
  },
  groups: new Set(),
  axesTitle: {
    vertical: null,
    horizontal: null,
  },
  titles: {
    verticalAxes: {},
    getVerticalAxesTitle: null,
    horizontalAxes: {},
    getHorizontalAxesTitle: null,
    valuesAxes: {},
    getValueAxesTitle: null,
  },
  grid: {
    verticalAxes: null,
    horizontalAxes: null,
  },
  dataType: null,
  pointsDensity: null,
});

export const makeDataHintsHandlers = (mutableContainer: DataStructureHints) => {
  const handler = {
    specifyDataRowFields: (x?: string, y?: string, value?: string) => {
      if (y) mutableContainer.fields.verticalAxes.add(y);
      if (x) mutableContainer.fields.horizontalAxes.add(x);
      if (value) mutableContainer.fields.valueAxes.add(value);
    },
    setupGrid: (direction: 'vertical' | 'horizontal', size: number) => {
      if (direction === 'horizontal') {
        mutableContainer.grid.horizontalAxes = size;
      } else if (direction === 'vertical') {
        mutableContainer.grid.verticalAxes = size;
      }
    },
    establishDataType: (dataType: SerializableDataType) => {
      mutableContainer.dataType = dataType;
    },
    describeValueEntity: (dataKey: string | number, readableName: string) => {
      mutableContainer.fields.values.add(dataKey);
      handler.labelKey('value', dataKey, readableName);
    },
    describeGroupedValues: (groupKey: string | number, dataKey: string | number) => {
      mutableContainer.groups.add(groupKey);
      mutableContainer.fields.values.add(dataKey);
    },
    labelKey: (
      axes: 'vertical' | 'horizontal' | 'value',
      dataKey: string | number,
      label: string,
    ) => {
      if (axes === 'vertical') mutableContainer.titles.verticalAxes[dataKey] = label;
      if (axes === 'horizontal') mutableContainer.titles.horizontalAxes[dataKey] = label;
      if (axes === 'value') mutableContainer.titles.valuesAxes[dataKey] = label;
    },
    addKeyLabelGetter: (
      axes: 'vertical' | 'horizontal' | 'value',
      getter: (dataKey: string | number) => string,
    ) => {
      if (axes === 'vertical') mutableContainer.titles.getVerticalAxesTitle = getter;
      if (axes === 'horizontal') mutableContainer.titles.getHorizontalAxesTitle = getter;
      if (axes === 'value') mutableContainer.titles.getValueAxesTitle = getter;
    },
    setTitle: (describedDataAxes: 'vertical' | 'horizontal', title: string) => {
      if (
        typeof title === 'number' ||
        typeof title === 'bigint' ||
        (typeof title === 'object' && (title as any) instanceof Date)
      ) {
        title = String(title);
      }
      if (typeof title !== 'string') {
        title = reactToText(title);
      }
      if (describedDataAxes === 'horizontal') {
        mutableContainer.axesTitle.horizontal = title;
      } else if (describedDataAxes === 'vertical') {
        mutableContainer.axesTitle.vertical = title;
      }
    },
    setPointsDensity: (horizontalAxes: number, verticalAxes: number) => {
      mutableContainer.pointsDensity = { verticalAxes, horizontalAxes };
    },
  };
  return handler;
};

export type DataHintsHandler = ReturnType<typeof makeDataHintsHandlers>;

export const makeDataSummarizationConfig = (
  config?: PartialDataSummarizationConfig,
): DataSummarizationConfig => ({
  clustersGridSize: undefined,
  maxListSymbols: 100,
  datesWithTime: undefined,
  clustersLimit: 5,
  valuesLimit: 5,
  groupsLimit: 5,
  dataType: undefined,
  disable: false,
  override: undefined,
  ...(config ?? {}),
  trendTangens: {
    static: 1 / 15,
    weak: 1 / 10,
    medium: 1 / 5,
    strong: Infinity,
    ...(config?.trendTangens ?? {}),
  },
  movingAverage: {
    longSize: undefined,
    shortSize: undefined,
    notableDiff: undefined,
    ...(config?.movingAverage ?? {}),
  },
  additionalFields: [...(config?.additionalFields ?? [])] as string[],
});
