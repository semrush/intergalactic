// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55817-4777
// import ColorPicker from '@semcore/ui/color-picker';
const figma = require('figma');

export default {
  example: figma.tsx`<ColorPicker>
  <ColorPicker.Trigger />
  <ColorPicker.Popper>
  {/* ColorPicker.Popper content */}
  </ColorPicker.Popper>
</ColorPicker>`,
  id: 'ColorPicker.Trigger',
};
