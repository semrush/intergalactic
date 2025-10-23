// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10322-131390
// import { DateRangePicker } from '@semcore/ui/date-picker'

const figma = require('figma');
const instance = figma.selectedInstance;

const notice = instance.getBoolean('notice ↓');
let popperCode;

if (notice) {
  const children = instance.findConnectedInstances((child) => true);
  const noticeCode = children[children.length - 1].executeTemplate().example;
  popperCode = figma.tsx`<DateRangePicker.Popper w='min-content'>
  <Flex>
    <Flex gap={4}>
      <Box>
        <DateRangePicker.Header>
          <DateRangePicker.Prev />
          <DateRangePicker.Title />
        </DateRangePicker.Header>
        <DateRangePicker.Calendar />
      </Box>
      <Box>
        <DateRangePicker.Header>
          <DateRangePicker.Title />
          <DateRangePicker.Next />
        </DateRangePicker.Header>
        <DateRangePicker.Calendar />
      </Box>
    </Flex>
    <Divider m="-16px 16px" orientation="vertical" />
    <Flex direction="column" justifyContent="space-between">
      <DateRangePicker.Period />
      <Flex mt={2} gap={2}>
        <DateRangePicker.Apply />
        <DateRangePicker.Reset />
      </Flex>
    </Flex>
  </Flex>
  ${noticeCode}
</DateRangePicker.Popper>`;
} else {
  popperCode = '<DateRangePicker.Popper />';
}

export default {
  example: figma.tsx`
<DateRangePicker>
  <DateRangePicker.Trigger />
  ${popperCode}
</DateRangePicker>
  `,
  id: 'DateRangePicker.Popper',
};
