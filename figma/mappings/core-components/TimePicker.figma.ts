import { connect } from '../../src/connect';
import type { ConnectSettings } from '../../src/connect';

const is12Hour = connect.getBoolean('12 hours', { true: 'is12Hour' });
const disabled = connect.getEnum('state', { disabled: 'disabled' });
const state = connect.getEnum('state', { invalid: 'state="invalid"' });
const size = connect.getEnum('size', { L: 'size="l"' });

const example = `
<TimePicker
  aria-label={/* if there's no visible label */}
  ${is12Hour ?? ''}
  ${size ?? ''}
  ${disabled ?? ''}
  ${state ?? ''}
/>
`;

export const settings: ConnectSettings = {
  example,
  id: 'TimePicker',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10301-133764',
  imports: ['import TimePicker from "@semcore/ui/time-picker"'],
};
