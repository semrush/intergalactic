import { IBoxProps, IFlexProps } from '@semcore/flex-box';
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

declare const Accordion: (<V>(props: CProps<IAccordionProps<V>>, IAccordionContext) => ReturnEl) & {
  Item: (<T>(props: CProps<IAccordionItemProps & T, IAccordionItemContext>) => ReturnEl) & {
    Toggle: <T>(props: IBoxProps & T) => ReturnEl;
    Chevron: <T>(props: IBoxProps & T) => ReturnEl;
    Collapse: <T>(props: ICollapseProps & T) => ReturnEl;
  };
};

export default Accordion;
