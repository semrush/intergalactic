export function chartPlayground(previewData, defaults = {}) {
  const { select, radio, label, bool } = previewData;

  label({ label: 'Common chart props', key: 'commonChartProps' });

  const direction = select({
    key: 'direction',
    defaultValue: defaults.direction,
    label: 'Direction',
    options: ['row', 'column', 'row-reverse', 'column-reverse'],
  });

  const alignItems = select({
    key: 'alignItems',
    defaultValue: defaults.alignItems,
    label: 'Align items',
    options: ['flex-start', 'center', 'flex-end'],
  });

  const justifyContent = select({
    key: 'justifyContent',
    defaultValue: defaults.justifyContent,
    label: 'Justify content',
    options: ['flex-start', 'center', 'flex-end', 'space-between'],
  });

  const showXAxis = bool({
    key: 'showXAxis',
    defaultValue: defaults.showXAxis ?? true,
    label: 'Show X axis',
  });

  const showYAxis = bool({
    key: 'showYAxis',
    defaultValue: defaults.showYAxis ?? true,
    label: 'Show Y axis',
  });

  const showTooltip = bool({
    key: 'showTooltip',
    defaultValue: defaults.showTooltip ?? true,
    label: 'Show tooltip',
  });

  const showTotalInTooltip = bool({
    key: 'showTotalInTooltip',
    defaultValue: defaults.showTotalInTooltip ?? false,
    label: 'Show total in tooltip',
  });

  const showLegend = bool({
    key: 'showLegend',
    defaultValue: defaults.showLegend ?? true,
    label: 'Show legend',
  });

  label({ label: 'Legend props', key: 'legendProps' });

  const legendDirection = select({
    key: 'legendDirection',
    defaultValue: defaults.legendDirection ?? 'row',
    label: 'Direction',
    options: ['row', 'column', 'row-reverse', 'column-reverse'],
  });

  const legendAlignItems = select({
    key: 'legendAlignItems',
    defaultValue: defaults.alignItems ?? 'flex-start',
    label: 'Align items',
    options: ['flex-start', 'center', 'flex-end'],
  });

  const legendJustifyContent = select({
    key: 'legendJustifyContent',
    defaultValue: defaults.justifyContent ?? 'space-between',
    label: 'Justify content',
    options: ['flex-start', 'center', 'flex-end', 'space-between'],
  });

  const size = radio({
    key: 'size',
    defaultValue: defaults.size ?? 'm',
    label: 'Size',
    options: ['m', 'l'],
  });

  const shape = select({
    key: 'shape',
    defaultValue: defaults.shape ?? 'Checkbox',
    label: 'Shape',
    options: ['Checkbox', 'Line', 'Circle', 'Square', 'Pattern'],
  });

  const disableSelect = bool({
    key: 'disableSelect',
    defaultValue: defaults.disableSelect ?? false,
    label: 'Disable select',
  });

  const disableHover = bool({
    key: 'disableHover',
    defaultValue: defaults.disableHover ?? false,
    label: 'Disable hover',
  });

  const patterns = bool({
    key: 'patterns',
    defaultValue: defaults.patterns ?? false,
    label: 'Patterns',
  });

  const legendProps = {
    direction: legendDirection,
    alignItems: legendAlignItems,
    justifyContent: legendJustifyContent,
    shape,
    size,
    disableSelectItems: disableSelect,
    disableHoverItems: disableHover,
    patterns,
  };

  return {
    direction,
    alignItems,
    justifyContent,
    showXAxis,
    showYAxis,
    showTooltip,
    showTotalInTooltip,
    showLegend,
    legendProps,
    patterns,
  };
}
