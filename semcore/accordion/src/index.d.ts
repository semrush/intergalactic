import { Box, BoxProps, FlexProps } from '@semcore/flex-box';
import { PropGetterFn, Intergalactic, UnknownProperties } from '@semcore/core';
import { CollapseProps } from '@semcore/animation';
import { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

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
  onChange?:
    | ((value: T, event?: React.SyntheticEvent) => void)
    | React.Dispatch<React.SetStateAction<T>>;
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

export type AccordionItemToggleProps = BoxProps & KeyboardFocusProps;

type IntergalacticAccordionComponent<PropsExtending = {}> = (<
  Value extends AccordionValue,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<
    Tag,
    'div',
    AccordionProps<Value>,
    AccordionContext & { value: Value },
    [handlers: AccordionHandlers]
  > &
    PropsExtending,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', AccordionProps>;

declare const Accordion: IntergalacticAccordionComponent & {
  Item: Intergalactic.Component<
    'div',
    AccordionItemProps,
    AccordionItemContext,
    [handlers: AccordionHandlers]
  > & {
    Toggle: Intergalactic.Component<'div', AccordionItemToggleProps>;
    Chevron: typeof Box;
    Collapse: Intergalactic.Component<'div', CollapseProps>;
  };
};

declare const wrapAccordion: <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticAccordionComponent>
    > &
      PropsExtending,
  ) => React.ReactNode,
) => IntergalacticAccordionComponent<PropsExtending>;
export { wrapAccordion };

export default Accordion;
