import { Box, FlexProps } from '@semcore/flex-box';
import { PropGetterFn, Intergalactic } from '@semcore/core';
import { CollapseProps } from '@semcore/animation';

export type AccordionValue = null | number | string | Array<number | string | null>;

export type AccordionProps<T extends AccordionValue = AccordionValue> = FlexProps & {
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
  /** Animation duration of each Accordion.Item inside
   * @default 350 */
  duration?: number;
};

export interface IAccordionProps<T extends AccordionValue = AccordionValue>
  extends AccordionProps<T> {}

/** @deprecated */
export interface IAccordionContext extends AccordionContext, UnknownProperties {}
export type AccordionContext = {
  getItemProps: PropGetterFn;
};

/** @deprecated */
export interface IAccordionHandlers extends AccordionHandlers, UnknownProperties {}
export type AccordionHandlers = {
  value: (value: AccordionValue) => void;
};

/** @deprecated */
export interface IAccordionItemProps extends AccordionItemProps, UnknownProperties {}
export type AccordionItemProps = {
  /** Tab value */
  value: string | number;
  /** Disabling selection changes */
  disabled?: boolean;
  /** Animation duration
   * @default 350 */
  duration?: number;
};

/** @deprecated */
export interface IAccordionItemContext extends AccordionItemContext, UnknownProperties {}
export type AccordionItemContext = {
  getToggleProps?: PropGetterFn;
  getCollapseProps?: PropGetterFn;
  getChevronProps?: PropGetterFn;
  selected?: boolean;
};

/** Intergalactic.Component generic override */
type IntergalacticAccordionComponent<
  BaseTag extends Intergalactic.ComponentTag = never,
  BaseProps = {},
  Context = {},
  Handlers = never,
> = (<
  Value extends AccordionValue,
  Tag extends Intergalactic.ComponentTag = BaseTag,
  Props extends BaseProps = BaseProps,
>(
  props: {
    tag?: Tag;
    value?: Value;
    onChange?: (value: Value, event?: React.SyntheticEvent) => void;
    children?: Intergalactic.ComponentChildren<Props & { value: Value }, Context, Handlers>;
  } & Intergalactic.ComponentBasicProps &
    Intergalactic.MergeProps<Omit<Props, 'tag' | 'ref'>, Intergalactic.ComponentPropsNesting<Tag>>,
) => React.ReactElement) & { __nestedProps: Intergalactic.ComponentPropsNesting<BaseTag> };

declare const Accordion: IntergalacticAccordionComponent<
  'div',
  AccordionProps,
  AccordionContext,
  AccordionHandlers
> & {
  Item: Intergalactic.Component<
    'div',
    AccordionItemProps,
    AccordionItemContext,
    AccordionHandlers
  > & {
    Toggle: typeof Box;
    Chevron: typeof Box;
    Collapse: Intergalactic.Component<'div', CollapseProps>;
  };
};

export default Accordion;
