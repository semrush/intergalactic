// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=21801-151060
// import ColorPicker, { PaletteManager } from '@semcore/ui/color-picker';
const figma = require('figma');
const instance = figma.selectedInstance;

const displayLabel = instance.findLayers((child) => child.getBoolean('text color')).length
  ? 'displayLabel'
  : undefined;

const popperCode = instance.getBoolean('custom colors', {
  true: `<ColorPicker.Popper>
  <ColorPicker.Colors />
  <PaletteManager />
</ColorPicker.Popper>`,
  false: '<ColorPicker.Popper />',
});

export default {
  example: figma.tsx`<ColorPicker ${displayLabel}>
  <ColorPicker.Trigger />
  ${popperCode}
</ColorPicker>`,
  id: 'ColorPicker.Popper',
};
