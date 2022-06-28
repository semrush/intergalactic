import { SerializableDataType } from './insights';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type DataStructureHints = {
  fields: {
    verticalAxes: Set<string>;
    horizontalAxes: Set<string>;
    values: {
      [fieldName: string]: unknown;
    };
  };
  title: {
    verticalAxes: string | null;
    horizontalAxes: string | null;
    values: {
      [valueDataKey: string]: string;
    };
  };
  grid: {
    verticalAxes: number | null;
    horizontalAxes: number | null;
  };
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
  disable: boolean;
  overrite: string | undefined;
};
export type PartialDataSummarizationConfig = DeepPartial<DataSummarizationConfig>;

export const makeDataHintsContainer = (): DataStructureHints => ({
  fields: {
    verticalAxes: new Set(),
    horizontalAxes: new Set(),
    values: {},
  },
  title: {
    verticalAxes: null,
    horizontalAxes: null,
    values: {},
  },
  grid: {
    verticalAxes: null,
    horizontalAxes: null,
  },
  dataType: null,
});

export const makeDataHintsHandlers = (mutableContainer: DataStructureHints) => {
  const handler = {
    specifyDataRowFields: (x: string, y: string) => {
      mutableContainer.fields.verticalAxes.add(y);
      mutableContainer.fields.horizontalAxes.add(x);
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
    describeValueEntity: (dataKey: string | number, dataValue: unknown, readableName?: string) => {
      mutableContainer.fields.values[dataKey] = dataValue;
      if (readableName !== undefined) {
        handler.labelKey(dataKey, readableName);
      }
    },
    labelKey: (dataKey: string | number, label: string) => {
      mutableContainer.title.values[dataKey] = label;
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
        return;
      }
      if (describedDataAxes === 'horizontal') {
        mutableContainer.title.horizontalAxes = title;
      } else if (describedDataAxes === 'vertical') {
        mutableContainer.title.verticalAxes = title;
      }
    },
  };
  return handler;
};

export type DataHintsHandler = ReturnType<typeof makeDataHintsHandlers>;

export const makeDataSummarizationConfig = (
  config: PartialDataSummarizationConfig,
): DataSummarizationConfig => ({
  clustersGridSize: undefined,
  maxListSymbols: 100,
  datesWithTime: undefined,
  clustersLimit: 5,
  valuesLimit: 5,
  dataType: undefined,
  disable: false,
  overrite: undefined,
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
});
