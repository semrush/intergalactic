import type { ControlsType } from '../../../types/Controls';

const Direction = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
const AlignItems = ['flex-start', 'center', 'flex-end'] as const;
const LegendDirection = ['row', 'column'] as const;
const Size = ['m', 'l'] as const;
const Shape = ['Checkbox', 'Line', 'Circle', 'Square', 'Pattern'] as const;

export type CommonChartProps = {
  direction: (typeof Direction)[number];
  alignItems: (typeof AlignItems)[number];
  showXAxis: boolean;
  showYAxis: boolean;
  showTooltip: boolean;
  showTotalInTooltip: boolean;
  showLegend: boolean;
};

export type LegendChartProps = {
  direction: (typeof LegendDirection)[number];
  size: (typeof Size)[number];
  shape: (typeof Shape)[number];
  disableSelectItems: boolean;
  disableHoverItems: boolean;
  patterns: boolean;
};

const defaultControls = {
  commonChartProps: {
    type: 'group',
    groupName: 'Common chart props',
    controls: {
      direction: {
        type: 'select',
        value: 'column',
        options: [...Direction],
        displayName: 'Direction',
      },
      alignItems: {
        type: 'select',
        value: 'flex-start',
        options: [...AlignItems],
        displayName: 'Align items',
      },
      showXAxis: {
        type: 'boolean',
        value: true,
        displayName: 'X axis',
      },
      showYAxis: {
        type: 'boolean',
        value: true,
        displayName: 'Y axis',
      },
      showTooltip: {
        type: 'boolean',
        value: true,
        displayName: 'Tooltip',
      },
      showTotalInTooltip: {
        type: 'boolean',
        value: false,
        displayName: 'Total in tooltip',
      },
      showLegend: {
        type: 'boolean',
        value: true,
        displayName: 'Legend',
      },
    },
  },
  legendProps: {
    type: 'group',
    groupName: 'Legend props',
    visibleIf: [{ dependsOn: 'showLegend.commonChartProps', equals: true }],
    controls: {
      direction: {
        type: 'inline-radio',
        value: 'row',
        options: [...LegendDirection],
        displayName: 'Direction',
      },
      size: {
        type: 'inline-radio',
        value: 'm',
        options: [...Size],
        displayName: 'Size',
      },
      shape: {
        type: 'select',
        value: 'Checkbox',
        options: [...Shape],
        displayName: 'Shape',
      },
      disableSelectItems: {
        type: 'boolean',
        value: false,
        displayName: 'Disable select',
      },
      disableHoverItems: {
        type: 'boolean',
        value: false,
        displayName: 'Disable hover',
      },
      patterns: {
        type: 'boolean',
        value: false,
        displayName: 'Patterns',
      },
    },
  },
};

interface ChartControlsOptions {
  skip?: {
    legendProps?: (keyof LegendChartProps)[];
    commonChartProps?: (keyof CommonChartProps)[];
  };
  add?: {
    commonChartProps?: ControlsType<Record<string, unknown>>;
    legendProps?: ControlsType<Record<string, unknown>>;
  };
}

export function getDefaultChartControls(options?: ChartControlsOptions) {
  if (!options) return defaultControls;

  const { skip, add } = options;

  const result = JSON.parse(JSON.stringify(defaultControls));

  if (skip) {
    const { commonChartProps: skipCommon = [], legendProps: skipLegend = [] } = skip;
    skipCommon.forEach((prop) => {
      if (result.commonChartProps.controls[prop]) {
        delete result.commonChartProps.controls[prop];
      }
    });
    skipLegend.forEach((prop) => {
      if (result.legendProps.controls[prop]) {
        delete result.legendProps.controls[prop];
      }
    });
  }

  if (add) {
    const { commonChartProps: addCommon = {}, legendProps: addLegend = {} } = add;
    Object.entries(addCommon).forEach(([key, value]) => {
      result.commonChartProps.controls[key] = value;
    });
    Object.entries(addLegend).forEach(([key, value]) => {
      result.legendProps.controls[key] = value;
    });
  }

  return result;
}
