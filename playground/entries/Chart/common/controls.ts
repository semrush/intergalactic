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

export default {
  commonChartProps: {
    type: 'group' as const,
    groupName: 'Common chart props',
    controls: {
      direction: {
        type: 'select' as const,
        value: 'column',
        options: [...Direction],
        displayName: 'Direction',
      },
      alignItems: {
        type: 'select' as const,
        value: 'flex-start',
        options: [...AlignItems],
        displayName: 'Align items',
      },
      showXAxis: {
        type: 'boolean' as const,
        value: true,
        displayName: 'X axis',
      },
      showYAxis: {
        type: 'boolean' as const,
        value: true,
        displayName: 'Y axis',
      },
      showTooltip: {
        type: 'boolean' as const,
        value: true,
        displayName: 'Tooltip',
      },
      showTotalInTooltip: {
        type: 'boolean' as const,
        value: false,
        displayName: 'Total in tooltip',
      },
      showLegend: {
        type: 'boolean' as const,
        value: true,
        displayName: 'Legend',
      },
    },
  },
  legendProps: {
    type: 'group' as const,
    groupName: 'Legend props',
    visibleIf: [{ dependsOn: 'showLegend.commonChartProps', equals: true }],
    controls: {
      direction: {
        type: 'inline-radio' as const,
        value: 'row',
        options: [...LegendDirection],
        displayName: 'Direction',
      },
      size: {
        type: 'inline-radio' as const,
        value: 'm',
        options: [...Size],
        displayName: 'Size',
      },
      shape: {
        type: 'select' as const,
        value: 'Checkbox',
        options: [...Shape],
        displayName: 'Shape',
      },
      disableSelectItems: {
        type: 'boolean' as const,
        value: false,
        displayName: 'Disable select',
      },
      disableHoverItems: {
        type: 'boolean' as const,
        value: false,
        displayName: 'Disable hover',
      },
      patterns: {
        type: 'boolean' as const,
        value: false,
        displayName: 'Patterns',
      },
    },
  },
};
