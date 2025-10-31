// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=21448-126726
// import Wizard from '@semcore/ui/wizard'
const figma = require('figma');
const instance = figma.selectedInstance;

const sideBar = instance.findConnectedInstance('Wizard.Sidebar').executeTemplate().example;

let content = '{/* step content */}';
const scrollArea = instance.findConnectedInstance('ScrollArea');
if (
  scrollArea.getBoolean('fader ↑') ||
  scrollArea.getBoolean('fader ↓') ||
  scrollArea.getBoolean('fader ->') ||
  scrollArea.getBoolean('<- fader') ||
  scrollArea.getBoolean('vertical scroll') ||
  scrollArea.getBoolean('horizontal scroll')
) {
  content = `<ScrollArea shadow>${content}</ScrollArea>`;
}

const footer = instance.findConnectedInstance('Wizard.Footer').executeTemplate().example;

export default {
  example: figma.tsx`
<Wizard step={/* current step */}>
  ${sideBar}
  <Wizard.Content>
    <Wizard.Step step={/* number */}>
      {/* previous step content... */}
    </Wizard.Step>
    <Wizard.Step step={/* number */}>
      {/* this is the current step content */}
      ${content}
    </Wizard.Step>
    <Wizard.Step step={/* number */}>
      {/* next step content... */}
    </Wizard.Step>
    ${footer}
  </Wizard.Content>
</Wizard>
  `,
  id: 'Wizard',
};
