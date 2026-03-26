import type { AccordionItemProps, AccordionProps } from './Accordion.type';

export type AccordionItemPropsInternal = {
  use: AccordionProps['use'];
  $handleInteraction: (value: AccordionItemProps['value']) => void;
};

export type AccordionCollapsePropsInternal = {
  selected: boolean;
};

export type AccordionItemTogglePropsInternal = {
  use: AccordionProps['use'];
};
