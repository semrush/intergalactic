// Config lines for the parser:
// - keep them commented
// - order doesn't matter, but they should be before the "require" statement

// https://www.figma.com/design/yzZPyF0Rk2TddifXf6kovg/Card?node-id=11793-136767
// ^ node URL is required
// import Card from '@semcore/ui/card'
// import { Flex } from '@semcore/ui/base-components'
// ^ imports are optional, just put the ones you want to show in Code Connect

const figma = require('figma');
const instance = figma.selectedInstance;

// you can write any JS code here, like loops, if-s, etc:
const items = [1, 2, 3].map((item) => 'Option' + item).join();

let result = '';
const two = 2;
if (two + two === 4) {
  result = 'true!';
}

// to parse these files, run with the alternative config file:
// npx figma connect publish --config figma-custom.config.json

// some API examples:
// const labelText = instance.getString('Label')  // Gets the value of a text property
// const isDisabled = instance.getBoolean('Disabled')  // Gets the value of a boolean property
// const iconInstance = instance.findInstance('Icon')  // Find a nested icon component
// const helperText = instance.findText('HelperText')  // Find a text layer
// api docs: https://developers.figma.com/docs/code-connect/template-v2-api/
// and also: https://developers.figma.com/docs/code-connect/custom-parsers/#example-template-implementation

export default {
  example: figma.tsx`
<Card.Header>
  ${items} ${result}
</Card.Header>
  `,
  id: 'card-header', // I didn't really understand why this id is needed, but it's required
};
