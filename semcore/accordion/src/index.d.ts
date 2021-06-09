import { Box, IFlexProps } from '@semcore/flex-box';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { ICollapseProps } from '@semcore/animation';

export type AccordionValue = null | number | string | Array<number | string | null>;

export interface IAccordionProps<T extends AccordionValue = AccordionValue> extends IFlexProps {
  /** Value for the active tab. Can be set as stroke, number, null or as array.
   * @type AccordionValue
   * */
  value?: T;
  /**
   * Value of the active tabs selected by default
   * @type AccordionValue
   * @default []
   */
  defaultValue?: T;
  /** Called when the selection is changed
   * @type (value: AccordionValue, event?: React.SyntheticEvent) => void
   * */
  onChange?: (value: T, event?: React.SyntheticEvent) => void;
  /** Animation duration
   * @default 350 */
  duration?: number;
}

export interface IAccordionContext {
  getItemProps: PropGetterFn;
}

export interface IAccordionHandlers {
  value: (value: AccordionValue) => void;
}

export interface IAccordionItemProps {
  /** Tab value */
  value: string | number;
  /** Disabling selection changes */
  disabled?: boolean;
}

export interface IAccordionItemContext {
  getToggleProps?: PropGetterFn;
  getCollapseProps?: PropGetterFn;
  getChevronProps?: PropGetterFn;
  selected?: boolean;
}

declare const Accordion: (<T, V>(
  props: CProps<IAccordionProps<V> & T, IAccordionContext, IAccordionHandlers>,
) => ReturnEl) & {
  Item: (<T>(
    props: CProps<IAccordionItemProps & T, IAccordionItemContext, IAccordionHandlers>,
  ) => ReturnEl) & {
    Toggle: typeof Box;
    Chevron: typeof Box;
    Collapse: <T>(props: ICollapseProps & T) => ReturnEl;
  };
};

export default Accordion;
