// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=20987-123519
// import Wizard from '@semcore/ui/wizard'
// import {Flex} from '@semcore/ui/base-components'
const figma = require('figma');
const instance = figma.selectedInstance;

const cta = instanceCode(instance, 'CTA');
const checkbox = instance.getBoolean('checkbox', {
  true: instanceCode(instance, 'Checkbox'),
});

let wrapperStart, wrapperEnd;
if (checkbox) {
  wrapperStart = '<Flex direction="column" gap={3} alignItems="center">';
  wrapperEnd = '</Flex>';
}

let backStepCode, nextStepCode;
const backStep = instance.findInstance('Wizard.StepBack');
const nextStep = instance.findInstance('Wizard.StepNext');
if (backStep.type !== 'ERROR') {
  backStepCode = `<Wizard.StepBack stepName="${backStep.findText('↳ text').textContent}" />`;
}
if (nextStep.type !== 'ERROR') {
  nextStepCode = `<Wizard.StepBack stepName="${nextStep.findText('↳ text').textContent}" />`;
}

export default {
  example: figma.tsx`
${wrapperStart}
${checkbox}
<Flex>
  ${backStepCode}${cta}${nextStepCode}
</Flex>
${wrapperEnd}
  `,
  id: 'Wizard.Footer',
};
