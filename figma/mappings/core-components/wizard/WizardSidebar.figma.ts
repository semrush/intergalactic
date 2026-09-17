import { connect } from '../../../src/connect';
import type { ConnectSettings } from '../../../src/connect';

const title = connect.formatProp('title', connect.childCode('title'));

const example = `
<Wizard.Sidebar ${title}>
  ${connect.childrenCode({ filter: (child) => child.type === 'INSTANCE' })}
</Wizard.Sidebar>`;

export const settings: ConnectSettings = {
  example,
  id: 'Wizard',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56133-3353',
  imports: ['import Wizard from "@semcore/ui/wizard"'],
};
