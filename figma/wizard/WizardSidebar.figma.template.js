// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=21022-133284
// import Wizard from '@semcore/ui/wizard'
const figma = require('figma');
const instance = figma.selectedInstance;

const title = instance.findText('title').textContent;
const titleCode = title ? `title="${title}"` : undefined;

let childrenCode = '';
instance.findConnectedInstances((_) => true).forEach((child) => {
  childrenCode = figma.tsx`${childrenCode}${child.executeTemplate().example}`;
});

export default {
  example: figma.tsx`
<Wizard.Sidebar ${titleCode}>
  ${childrenCode}
</Wizard.Sidebar>
  `,
  id: 'Wizard.Sidebar',
};
