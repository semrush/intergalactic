import { connect } from '../../src/connect';
import type { ConnectSettings } from '../../src/connect';

const shadow =
  connect.getBoolean('fader ↑') ||
  connect.getBoolean('fader ↓') ||
  connect.getBoolean('fader ->') ||
  connect.getBoolean('<- fader')
    ? 'shadow'
    : undefined;

const shadowAttr = shadow ? ` ${shadow}` : '';

const example = `
<ScrollArea${shadowAttr}>
  {/* content */}
</ScrollArea>
`;
export const settings: ConnectSettings = {
  example,
  id: 'ScrollArea',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57142-1488',
  imports: ['import { ScrollArea } from "@semcore/ui/base-components"'],
};
