// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=54076-2819
// import { DatePicker } from '@semcore/ui/date-picker'

const figma = require('figma');
const instance = figma.selectedInstance.findConnectedInstance('DatePicker.InputTrigger');

const disabled = instance.getEnum('state', { disabled: 'disabled' });
const state = instance.getEnum('state', { invalid: 'state="invalid"' });
const size = instance.getEnum('size', { L: 'size="l"' });

export default {
  example: figma.tsx`
<DatePicker>
  <DatePicker.Trigger
    aria-label={/* set if there's no visible label */}
    ${size}
    ${state}
    ${disabled}
  />
  <DatePicker.Popper />
</DatePicker>
  `,
  id: 'DatePicker.Trigger',
};
