// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=54082-61809
// import { DateRangeComparator } from '@semcore/ui/date-picker'

const figma = require('figma');
const instance = figma.selectedInstance;

const notice = instance.getBoolean('notice ↓');
let popperCode;

if (notice) {
  const children = instance.findConnectedInstances((child) => true);
  const noticeCode = children[children.length - 1].executeTemplate().example;
  popperCode = figma.tsx`<DateRangeComparator.Popper>
  <DateRangeComparator.Header />
  <DateRangeComparator.Body>
    <DateRangeComparator.RangeCalendar />
    <DateRangeComparator.Periods>
      <DateRangeComparator.Periods.Divider />
      <DateRangeComparator.Periods.Column>
        <DateRangeComparator.Periods.Options />
        <DateRangeComparator.Periods.Controls>
          <DateRangeComparator.Apply />
          <DateRangeComparator.Reset />
        </DateRangeComparator.Periods.Controls>
      </DateRangeComparator.Periods.Column>
    </DateRangeComparator.Periods>
  </DateRangeComparator.Body>
  ${noticeCode}
</DateRangeComparator.Popper>`;
} else {
  popperCode = '<DateRangeComparator.Popper />';
}

export default {
  example: figma.tsx`
<DateRangeComparator>
  <DateRangeComparator.Trigger />
  ${popperCode}
</DateRangeComparator>
  `,
  id: 'DateRangeComparator.Popper',
};
