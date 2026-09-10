import { connect } from '../../src/connect';
import type { ConnectSettings } from '../../src/connect';

const label = connect.childCode('Input.Label');
const input = connect.childCode('TimePicker');

const labelPosition = String(
  connect.getPropertyValue('label position') ?? 'top',
).toLowerCase();
const isLeft = labelPosition === 'left';

const example = isLeft
  ? `
<Flex direction='row' gap={6}>
${label ?? ''}
${input ?? ''}
</Flex>
`
  : `
<Flex direction='column' gap={2}>
${label ?? ''}
${input ?? ''}
</Flex>
`;

export const settings: ConnectSettings = {
  example,
  id: 'TimePickerWithLabel',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56367-5124',
  imports: [
    'import { Flex } from "@semcore/ui/base-components"',
    'import TimePicker from "@semcore/ui/time-picker"',
  ],
};
