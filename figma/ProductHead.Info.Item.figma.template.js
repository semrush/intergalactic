// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=14188-117046
// import { Info } from '@semcore/ui/product-head'
const figma = require('figma');
const instance = figma.selectedInstance;

const textOnly = instance.getBoolean('text only');
const label = instance.getBoolean('label', {
  true: textOnly
    ? ` label="${instance.findText('Info.Item.Label')?.textContent}"`
    : `<Info.Item.Label>${instance.findText('Info.Item.Label')?.textContent}</Info.Item.Label>`,
});

let children = instance.findLayers(() => true);
if (label) children = children.slice(1);
const infoItem = layerArrayCode(children);

let labelWarning;
if (!textOnly && label) labelWarning = '{/* make sure to connect the label with the control appropriately */}';
if (!textOnly && !label) labelWarning = '{/* make sure to label the control appropriately */}';

export default {
  example: figma.tsx`
<Info.Item${textOnly ? label : ''}>
  ${labelWarning}${!textOnly ? label : ''}${infoItem}
</Info.Item>
  `,
  id: 'Info.Item',
};
