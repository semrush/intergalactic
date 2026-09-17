// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10322-258136
// import { MonthRangePicker } from '@semcore/ui/date-picker'
// import Divider from '@semcore/ui/divider'
// import { Flex, Box } from '@semcore/ui/base-components'

const figma = require('figma');
const instance = figma.selectedInstance;

const notice = instance.getBoolean('notice ↓');
let popperCode;

if (notice) {
  const children = instance.findConnectedInstances((child) => true);
  const noticeCode = children[children.length - 1].executeTemplate().example;
  popperCode = figma.tsx`<MonthRangePicker.Popper w='min-content'>
  <Flex>
    <Flex gap={4}>
      <Box>
        <MonthRangePicker.Header>
          <MonthRangePicker.Prev />
          <MonthRangePicker.Title />
        </MonthRangePicker.Header>
        <MonthRangePicker.Calendar />
      </Box>
      <Box>
        <MonthRangePicker.Header>
          <MonthRangePicker.Title />
          <MonthRangePicker.Next />
        </MonthRangePicker.Header>
        <MonthRangePicker.Calendar />
      </Box>
    </Flex>
    <Divider m="-16px 16px" orientation="vertical" />
    <Flex direction="column" justifyContent="space-between">
      <MonthRangePicker.Period />
      <Flex mt={2} gap={2}>
        <MonthRangePicker.Apply />
        <MonthRangePicker.Reset />
      </Flex>
    </Flex>
  </Flex>
  ${noticeCode}
</MonthRangePicker.Popper>`;
} else {
  popperCode = '<MonthRangePicker.Popper />';
}

export default {
  example: figma.tsx`
<MonthRangePicker>
  <MonthRangePicker.Trigger />
  ${popperCode}
</MonthRangePicker>
  `,
  id: 'MonthRangePicker.Popper',
};
