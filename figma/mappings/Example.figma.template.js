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
const labelText = instance.getString('PropertyName'); // for text properties
const helperText = instance.findText('LayerName').textContent; // to directly get text layers
const isDisabled = instance.getBoolean('PropertyName'); // also accepts boolean-like variant properties

// api docs: https://developers.figma.com/docs/code-connect/template-v2-api/
// and also: https://developers.figma.com/docs/code-connect/custom-parsers/#example-template-implementation

// default findInstance() can be inconvenient (you have to check if the layer
// is hidden and generate code by adding '.executeTemplate().example'),
// so here's a much more convenient custom function:
const someNestedInstanceCode = instanceCode(instance, 'LayerName');

export default {
  example: figma.tsx`
<ComponentName>
  ${items} ${result}
  ${someNestedInstanceCode}
</ComponentName>
  `,
  id: 'ComponentName',
};
// the id property is required, it can be used to find children using findConnectedInstance('component-id') instead of findInstance('layerName') - it helps if layer has been renamed
