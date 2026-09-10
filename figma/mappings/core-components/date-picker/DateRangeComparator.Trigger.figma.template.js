// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=54087-63090
// import { DateRangeComparator } from '@semcore/ui/date-picker'

const figma = require('figma');

export default {
  example: figma.tsx`
<DateRangeComparator>
  <DateRangeComparator.Trigger
    aria-label={/* set if there's no visible label */}
  />
  <DateRangeComparator.Popper />
</DateRangeComparator>
  `,
  id: 'DateRangeComparator.Trigger',
};
