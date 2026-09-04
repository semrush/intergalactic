// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55882-8656
// import ProductHead from '@semcore/ui/product-head'
const figma = require('figma');
const instance = figma.selectedInstance;

const mobileFeedback = instance.getBoolean('mobile', {
  true: instanceCode(instance, 'Send feedback'),
});

const breadcrumbs = instanceCode(instance, 'Breadcrumbs');

const links = instance.findConnectedInstances(() => true, { path: ['ProductHead.Row', 'ProductHead.Links'] });
const linksCode = layerArrayCode(links, 'ProductHead.Links');

const buttons = instance.findConnectedInstances(() => true, { path: ['ProductHead.Row', 'ProductHead.Buttons'] });
const buttonsCode = layerArrayCode(buttons, 'ProductHead.Buttons');

const info = instance.findConnectedInstances(() => true, { path: ['ProductHead.Row', 'Info'] });
const infoCode = layerArrayCode(info, 'Info');

const toolName = instance.findText('tool name')?.textContent?.replace(/.*/, 'toolName="$&"');

export default {
  example: figma.tsx`
<ProductHead>
  ${breadcrumbs || linksCode || mobileFeedback ? '<ProductHead.Row>' : undefined}
    ${breadcrumbs}
    ${linksCode}
    ${mobileFeedback}
  ${breadcrumbs || linksCode || mobileFeedback ? '</ProductHead.Row>' : undefined}

  <ProductHead.Row>
    <Title ${toolName}>
      {/* title content */}
    </Title>
    ${buttonsCode}
  </ProductHead.Row>

  ${infoCode ? '<ProductHead.Row>' : undefined}
  ${infoCode}
  ${infoCode ? '</ProductHead.Row>' : undefined}
</ProductHead>
  `,
  id: 'ProductHead',
};
