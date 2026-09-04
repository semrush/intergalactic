import { connect } from '../../../src/connect';
import type { ConnectSettings } from '../../../src/connect';

const checkbox = connect.childCode('Checkbox');

let wrapperStart, wrapperEnd;
if (checkbox) {
  wrapperStart = '<Flex direction="column" gap={3} alignItems="center">';
  wrapperEnd = '</Flex>';
}

const stepBackText = connect.childCode('↳ text', { path: ['Wizard.StepBack'] });
const stepBack = stepBackText ? `<Wizard.StepBack stepName="${stepBackText}" />` : undefined;

const stepNextText = connect.childCode('↳ text', { path: ['Wizard.StepNext'] });
const stepNext = stepNextText ? `<Wizard.StepNext stepName="${stepNextText}" />` : undefined;

const cta = connect.childCode('CTA');

const example = `
${wrapperStart}
${checkbox}
<Flex>
  ${stepBack}${cta}${stepNext}
</Flex>
${wrapperEnd}
  `;

export const settings: ConnectSettings = {
  example,
  id: 'Wizard.Footer',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56368-557',
  imports: [
    'import Wizard from "@semcore/ui/wizard"',
    'import { Flex } from "@semcore/ui/base-components"',
  ],
};
