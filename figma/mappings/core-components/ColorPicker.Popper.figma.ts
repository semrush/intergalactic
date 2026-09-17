import { connect } from '../../src/connect';
import type { ConnectSettings } from '../../src/connect';

const displayLabel = connect.children({ prop: 'text color', value: true }).length
  ? 'displayLabel'
  : undefined;

const popperCode = connect.getBoolean('custom colors', {
  true: `<ColorPicker.Popper>
  <ColorPicker.Colors />
  <PaletteManager />
</ColorPicker.Popper>`,
  false: '<ColorPicker.Popper />',
});

const example = `
<ColorPicker ${displayLabel}>
  <ColorPicker.Trigger />
  ${popperCode}
</ColorPicker>`;

export const settings: ConnectSettings = {
  example,
  id: 'ColorPicker.Popper',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-296347',
  imports: ['import ColorPicker, { PaletteManager } from "@semcore/ui/color-picker"'],
};
