// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=21448-126631
// import Wizard from '@semcore/ui/wizard'
const figma = require('figma');
const instance = figma.selectedInstance;

const completed = instance.getBoolean('completed', { true: 'completed' });
const number = instance.findText('Wizard.StepNumber').textContent;
const title = instance.findText('title').textContent;
const optional = instance.getBoolean('optional', {
  true: `<Text color='text-secondary-invert' fontWeight={400} mt={1} tag='div'>optional</Text>`,
});

const content = instance.getBoolean('text label', {
  true: figma.tsx`${title}${optional}`,
  false: `{/* this is an adaptive state for small viewports, 
        refer to the full-width version for the full code */}`,
});

export default {
  example: figma.tsx`
<Wizard.Stepper step={${number}} ${completed}>
  ${content}
</Wizard.Stepper>`,
  id: 'Wizard.Stepper',
};
