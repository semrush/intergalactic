import type { BoxProps, FlexProps, Flex } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { Text } from '@semcore/typography';
import type { Property } from 'csstype';

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

  /**
   * Changes the visual appearance of the component
   * @default secondary
   */
  use?: 'primary' | 'secondary';
};

export interface IAccordionProps<T extends AccordionValue = AccordionValue>
  extends AccordionProps<T> {}

export type AccordionContext = {
  getItemProps: PropGetterFn;
};

export type AccordionHandlers = {
  value: AccordionProps['value'];
};

export type AccordionItemProps = {
  /** Tab value */
  value: string | number;
  /** Disabling selection changes */
  disabled?: boolean;
  /** Animation duration
   * @default 350 */
  duration?: number;
};

export type AccordionItemContext = {
  getToggleProps?: PropGetterFn;
  getCollapseProps?: PropGetterFn;
  getChevronProps?: PropGetterFn;
  selected?: boolean;
};

export type AccordionItemToggleProps = BoxProps & {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};
export type ChevronItemProps = BoxProps & {
  /**
   * Chevron size
   * @default m
   */
  size?: 'm' | 'l';
};

export type CollapseAnimationProps = {
  /** Animation titles */
  keyframes?: [string, string];
  /** Enables animation on first rendering
   * @default false
   */
  initialAnimation?: boolean;
  /**
   * @default ease-out
   */
  timingFunction?: Property.AnimationTimingFunction;
  /**
   * @default false
   */
  animationsDisabled?: boolean;
};

export type AccordionCollapseProps = BoxProps & CollapseAnimationProps & {
  /** Animation duration in ms
   * @default 0
   */
  duration?: number | [number, number];
  /** If it set to `true`, animated node is persisted in dom even if `visible=false`   */
  preserveNode?: boolean;
  /**
   * Add overflow=clip when passing animation
   * @default true
   * */
  overflowHidden?: boolean;
  /**
   * Value for height after animation
   * @default auto
   */
  defaultHeight?: 'auto' | '100%';
};

export type IntergalacticAccordionComponent<PropsExtending = {}> = (<
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

export type AccordionItemComponent = Intergalactic.Component<
  'div',
  AccordionItemProps,
  AccordionItemContext
>;

export type AccordionComponent = IntergalacticAccordionComponent & {
  Item: AccordionItemComponent & {
    Toggle: Intergalactic.Component<typeof Text, AccordionItemToggleProps>;
    ToggleButton: Intergalactic.Component<typeof Flex, {}>;
    Chevron: Intergalactic.Component<'div', ChevronItemProps>;
    Collapse: Intergalactic.Component<'div', AccordionCollapseProps>;
  };
};
