// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10322-258100
// import { MonthPicker } from '@semcore/ui/date-picker'

const figma = require('figma');

export default {
  example: figma.tsx`
<MonthPicker>
  <MonthPicker.Trigger />
  <MonthPicker.Popper />
</MonthPicker>
  `,
  id: 'MonthPicker.Popper',
};
