// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10301-133764
// import TimePicker from '@semcore/ui/time-picker'

const figma = require('figma');
const instance = figma.selectedInstance;

const is12Hour = instance.getBoolean('12 hours', { true: 'is12Hour' });
const disabled = instance.getEnum('state', { disabled: 'disabled' });
const state = instance.getEnum('state', { invalid: 'state="invalid"' });
const size = instance.getEnum('size', { L: 'size="l"' });

export default {
  example: figma.tsx`
<TimePicker
  aria-label={/* text */}
  ${is12Hour}
  ${size}
  ${disabled}
  ${state}
/>
  `,
  id: 'TimePicker',
};
