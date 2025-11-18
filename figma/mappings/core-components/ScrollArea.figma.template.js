// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55695-2026
// import {ScrollArea} from '@semcore/ui/base-components'
const figma = require('figma');
const instance = figma.selectedInstance;

let shadow;
if (
  instance.getBoolean('fader ↑') ||
  instance.getBoolean('fader ↓') ||
  instance.getBoolean('fader ->') ||
  instance.getBoolean('<- fader')
) {
  shadow = 'shadow';
};

export default {
  example: figma.tsx`<ScrollArea ${shadow}>
  {/* content */}
</ScrollArea>
  `,
  id: 'ScrollArea',
};
