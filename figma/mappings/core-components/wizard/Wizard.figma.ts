import { connect } from '../../../src/connect';
import type { ConnectSettings } from '../../../src/connect';

const sideBar = connect.childCode('Wizard.Sidebar');

let content = '{/* step content */}';
if (
  connect.getProp('fader ↑', true, 'ScrollArea') ||
  connect.getProp('fader ↓', true, 'ScrollArea') ||
  connect.getProp('fader ->', true, 'ScrollArea') ||
  connect.getProp('<- fader', true, 'ScrollArea') ||
  connect.getProp('vertical scroll', true, 'ScrollArea') ||
  connect.getProp('horizontal scroll', true, 'ScrollArea')
) {
  content = `<ScrollArea shadow>${content}</ScrollArea>`;
}

const footer = connect.childCode('Wizard.Footer');

const example = `
<Wizard step={/* current step */}>
  ${sideBar}
  <Wizard.Content>
    <Wizard.Step step={/* number */}>
      {/* previous step content... */}
    </Wizard.Step>
    <Wizard.Step step={/* number */}>
      {/* this is the current step */}
      ${content}
    </Wizard.Step>
    <Wizard.Step step={/* number */}>
      {/* next step content... */}
    </Wizard.Step>
    ${footer}
  </Wizard.Content>
</Wizard>
  `;

export const settings: ConnectSettings = {
  example,
  id: 'Wizard',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56368-720',
  imports: ['import Wizard from "@semcore/ui/wizard"'],
};
