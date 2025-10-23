// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53984-3477
// import { DatePicker } from '@semcore/ui/date-picker'
// import Divider from '@semcore/ui/divider'

const figma = require('figma');
const instance = figma.selectedInstance;

const variant = instance.getPropertyValue('variant');
const notice = instance.getBoolean('notice ↓');
let popperCode;

if (variant === 'default' && !notice) {
  popperCode = '<DatePicker.Popper />';
} else {
  popperCode = '<DatePicker.Popper w="min-content"><DatePicker.Header /><DatePicker.Calendar />';

  if (variant === 'default') {
    popperCode += '<DatePicker.Today />';
  } else {
    const footer = instance.findConnectedInstances((child) => true, { path: ['Flex [bottom controls]'] });
    let footerCode;
    for (const child of footer) {
      footerCode = figma.tsx`${footerCode}${child.executeTemplate().example}`;
    }
    if (footer.length) footerCode = figma.tsx`<Divider /><Flex justifyContent='space-between'>${footerCode}</Flex>`;
    popperCode = figma.tsx`${popperCode}${footerCode}`;
  }
  if (notice) {
    const children = instance.findConnectedInstances((child) => true);
    const noticeCode = children[children.length - 1].executeTemplate().example;
    popperCode = figma.tsx`${popperCode}${noticeCode}`;
  }
  popperCode = figma.tsx`${popperCode}</DatePicker.Popper>`;
}

export default {
  example: figma.tsx`
<DatePicker>
  <DatePicker.Trigger />
  ${popperCode}
</DatePicker>
  `,
  id: 'DatePicker.Popper',
};
