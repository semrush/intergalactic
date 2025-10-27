// https://www.figma.com/design/kCYNeNYB7h2p5U3ZAWkMiI/Card-for-table?node-id=55480-2824
// update URL and republish when branch merged in Figma
// import Card from '@semcore/ui/card'
const figma = require('figma');
const instance = figma.selectedInstance;

const header = instance.findConnectedInstance('Card.Header');
const headerCode = header.type === 'INSTANCE' ? header.executeTemplate().example : undefined;

const topControls = instance.getBoolean('top controls');
const bottomControls = instance.getBoolean('bottom controls');

let paddings = '';

if (!topControls)
  paddings += ' pt={0}';

if (!bottomControls)
  paddings += ' pb={1}';

export default {
  example: figma.tsx`
<Card>
  ${headerCode}
  <Card.Body tag={Flex} gap={5} direction='column' px={0} ${paddings}>
    {/* content */}
  </Card.Body>
</Card>
  `,
  id: 'Card',
};
