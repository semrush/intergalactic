// https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=11793-136767
// import Card from '@semcore/ui/card'
// import { Flex } from '@semcore/ui/base-components'
// import { Text } from '@semcore/ui/typography'
const figma = require('figma');
const instance = figma.selectedInstance;

let titleCode;

if (instance.getBoolean('title: text')) {
  const titleText = instance.findText('title').textContent;
  const titleText2 = instance.findText('title second line').textContent;
  const hint = instance.getBoolean('title: informer', { true: 'hintAfter={/* tooltip text */}' });
  const hintAria = instance.getBoolean('title: informer', { true: `hintAfterAriaLabel='About ${titleText}'` });
  const num = instance.getBoolean('title: number', {
    true: `<Text size={300} fontWeight={400} use='secondary' ml={1}>${instance.findText('num').textContent}</Text>`,
  });

  titleCode = figma.tsx`<Card.Title tag='h3' ${hint} ${hintAria}>
  ${titleText} ${titleText2}
  ${num}
  </Card.Title>`;
}

const pillsCode = instance.getBoolean('title: pills', {
  true: instance.findInstance('TitleControl').executeTemplate().example,
});

const rightControlsCode = instance.getBoolean('controls ->', {
  true: '<Card.Description ml="auto">{/* right controls */}</Card.Description>',
});

const bottomControlsCode = instance.getBoolean('description ↓', {
  true: '<Card.Description>{/* bottom controls */}</Card.Description>',
});

const needsFlex = !!titleCode + !!pillsCode + !!rightControlsCode > 1;

const headerCode = bottomControlsCode
  ? figma.tsx`<Card.Header tag={Flex} direction="column">
  ${needsFlex ? '<Flex gap={2}>' : undefined}
  ${titleCode}
  ${pillsCode}
  ${rightControlsCode}
  ${needsFlex ? '</Flex>' : undefined}
  ${bottomControlsCode}
  </Card.Header>`
  : figma.tsx`<Card.Header${needsFlex ? ' tag={Flex} gap={2}' : undefined}>
  ${titleCode}
  ${pillsCode}
  ${rightControlsCode}
</Card.Header>`;

export default {
  example: headerCode,
  id: 'Card.Header',
};
