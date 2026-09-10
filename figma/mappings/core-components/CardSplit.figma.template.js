// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=13578-112637
const figma = require('figma');
const children = figma.selectedInstance.findLayers(() => true);

let code;

children.forEach((child) => code = figma.tsx`${code}${child.executeTemplate().example}`);

export default {
  example: figma.tsx`
<Flex>
  ${code}
</Flex>
  `,
  id: 'Card (split)',
};
