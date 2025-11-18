import type { ConnectSettings } from '../../src/connect';

const example = `<ColorPicker>
  <ColorPicker.Trigger />
  <ColorPicker.Popper>
  {/* ColorPicker.Popper content */}
  </ColorPicker.Popper>
</ColorPicker>`;

export const settings: ConnectSettings = {
  example,
  id: 'ColorPicker.Trigger',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-294977',
  imports: ['import ColorPicker from "@semcore/ui/color-picker"'],
};
