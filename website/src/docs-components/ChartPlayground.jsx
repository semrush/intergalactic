export function chartPlayground(previewData, defaults = {}) {
  const { select, radio, label, bool } = previewData;

  label({ label: 'Common chart props', key: 'commonChartProps' });

  const direction = select({
    key: 'direction',
    defaultValue: defaults.direction ?? 'column',
    label: 'Direction',
    options: ['row', 'column', 'row-reverse', 'column-reverse'],
  });

  const alignItems = select({
    key: 'alignItems',
    defaultValue: defaults.alignItems ?? 'flex-start',
    label: 'Align items',
    options: ['flex-start', 'center', 'flex-end'],
  });

  const showXAxis = bool({
    key: 'showXAxis',
    defaultValue: defaults.showXAxis ?? true,
    label: 'X axis',
  });

  const showYAxis = bool({
    key: 'showYAxis',
    defaultValue: defaults.showYAxis ?? true,
    label: 'Y axis',
  });

  const showTooltip = bool({
    key: 'showTooltip',
    defaultValue: defaults.showTooltip ?? true,
    label: 'Tooltip',
  });

  const showTotalInTooltip = bool({
    key: 'showTotalInTooltip',
    defaultValue: defaults.showTotalInTooltip ?? false,
    label: 'Total in tooltip',
  });

  const showLegend = bool({
    key: 'showLegend',
    defaultValue: defaults.showLegend ?? true,
    label: 'Legend',
  });

  label({ label: 'Legend props', key: 'legendProps' });

  const legendDirection = radio({
    key: 'legendDirection',
    defaultValue: defaults.legendDirection ?? 'row',
    label: 'Direction',
    options: ['row', 'column'],
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
    shape,
    size,
    disableSelectItems: disableSelect,
    disableHoverItems: disableHover,
    patterns,
  };

  return {
    direction,
    alignItems,
    showXAxis,
    showYAxis,
    showTooltip,
    showTotalInTooltip,
    showLegend,
    legendProps,
    patterns,
  };
}
