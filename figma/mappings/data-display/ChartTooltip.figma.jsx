import figma from '@figma/code-connect/react';
import { HoverLine } from '@semcore/ui/chart-tooltip';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

// Need to add a variant for no data with footer

figma.connect(
  HoverLine,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13086-3415&t=rJcL0Nl5bcNFNb66-11',
  {
    props: {
      footerText: figma.textContent('↳ text'),
    },
    example: ({ footerText }) => (
      <HoverLine.Tooltip.Footer>{footerText}</HoverLine.Tooltip.Footer>
    ),
  },
);

figma.connect(
  HoverLine,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13039-1404&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { 'no data': 'false' },
    example: () => (
      <HoverLine.Tooltip x='/* Set x here */' wMin={/* Set wMin here */}>
        <HoverLine.Tooltip.Title>
          {/* Set title here */}
        </HoverLine.Tooltip.Title>
        <Flex justifyContent='space-between'>
          <HoverLine.Tooltip.Dot mr={4}>{/* Set dot label here */}</HoverLine.Tooltip.Dot>
          <Text bold>{/* Set text here */}</Text>
        </Flex>
      </HoverLine.Tooltip>
    ),
  },
);

figma.connect(
  HoverLine,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13039-1404&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { 'no data': 'true' },
    props: {
      footer: figma.children('Footer'),
    },
    example: ({ footer }) => (
      <HoverLine.Tooltip x='/* Set x here */' wMin={/* Set wMin here */}>
        <HoverLine.Tooltip.Title>
          {/* Set title here */}
        </HoverLine.Tooltip.Title>
        <Flex justifyContent='space-between'>
          <HoverLine.Tooltip.Dot mr={4}>{/* Set dot label here */}</HoverLine.Tooltip.Dot>
          <Text bold>{/* Set text here */}</Text>
        </Flex>
        {footer}
      </HoverLine.Tooltip>
    ),
  },
);
