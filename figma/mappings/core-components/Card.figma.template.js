// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10257-114780
// import Card from '@semcore/ui/card'
const figma = require('figma');
const instance = figma.selectedInstance;

const header = instance.findConnectedInstance('Card.Header');
const headerCode = header.type === 'INSTANCE' ? header.executeTemplate().example : undefined;

const layout = instance.getPropertyValue('layout');

let content = '{/* content */}';
if (layout === 'two sections') {
  content = `<Flex gap={5}>${content}</Flex>`;
}

export default {
  example: figma.tsx`
<Card>
  ${headerCode}
  <Card.Body tag={Flex} gap={5} direction='column'>
    ${content}
  </Card.Body>
</Card>
  `,
  id: 'Card',
};
