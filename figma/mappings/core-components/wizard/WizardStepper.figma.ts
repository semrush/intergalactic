import { connect } from '../../../src/connect';
import type { ConnectSettings } from '../../../src/connect';

const completed = connect.getProp('completed');
const number = connect.childCode('Wizard.StepNumber');
const title = connect.childCode('title');
const optional = connect.childCode('optional', {
  wrapper: 'Text color="text-secondary-invert" fontWeight={400} mt={1} tag="div"',
});

const example = title || optional
  ? `<Wizard.Stepper step={${number}} ${completed}>${title}${optional}</Wizard.Stepper>`
  : `{/* this is an adaptive state for small viewports, 
    refer to the full-width version for the full code */}
  <Wizard.Stepper step={${number}} ${completed} />`;

export const settings: ConnectSettings = {
  example,
  id: 'Wizard.Stepper',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56133-3311',
  imports: ['import Wizard from "@semcore/ui/wizard"'],
};
