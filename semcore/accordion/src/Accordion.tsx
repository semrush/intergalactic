import React, { HTMLAttributes } from 'react';
import createComponent, {
  Component,
  Merge,
  PropGetterFn,
  PropsAndRef,
  styled,
} from '@semcore/core';
import { Box, IBoxProps, IFlexProps } from '@semcore/flex-box';
import { Collapse as CollapseAnimate, ICollapseProps } from '@semcore/animation';
import ChevronRightXS from '@semcore/icon/lib/ChevronRight/xs';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import style from './style/accordion.shadow.css';

export type AccordionValue = null | number | string | Array<number | string | null>;

export interface IAccordionProps<T extends AccordionValue = AccordionValue> extends IFlexProps {
  /** Value for the active tab. Can be set as stroke, number, null or as array. */
  value?: T;
  /**
   * Value of the active tabs selected by default
   * @default []
   */
  defaultValue?: T;
  /** Called when the selection is changed */
  onChange?: (value: T, event?: React.SyntheticEvent) => void;
  /** Animation duration
   * @default 350 */
  duration?: number;
}

export interface IAccordionContext extends IAccordionProps {
  getItemProps: PropGetterFn;
}

export interface IAccordionItemProps {
  /** Tab value */
  value: string | number;
  /** Disabling selection changes */
  disabled?: boolean;
  /** @ignore */
  $handleInteraction?: any;
  /** @ignore */
  duration?: number;
}

export interface IAccordionItemContext {
  getToggleProps?: PropGetterFn;
  getCollapseProps?: PropGetterFn;
  getChevronProps?: PropGetterFn;
  selected?: boolean;
}

class RootAccordion extends Component<IAccordionProps> {
  static displayName = 'Accordion';
  static style = style;
  static defaultProps = {
    defaultValue: [],
    duration: 350,
  };

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleToggleInteraction = (newValue) => {
    const { value } = this.asProps;

    if (Array.isArray(value)) {
      const indexOfNewValue = (value as Array<any>).indexOf(newValue);
      const result = [...value];
      indexOfNewValue === -1 ? result.push(newValue) : result.splice(indexOfNewValue, 1);
      this.handlers.value(result);
    } else {
      this.handlers.value(value === newValue ? null : newValue);
    }
  };

  getItemProps({ value }) {
    const { value: selectedValue, duration } = this.asProps;
    const selected = Array.isArray(selectedValue)
      ? selectedValue.includes(value as never)
      : selectedValue === value;
    return {
      selected,
      duration,
      $handleInteraction: this.handleToggleInteraction,
    };
  }

  render() {
    const { Children } = this.asProps;
    return <Children />;
  }
}

export class RootItem extends Component<IAccordionItemProps> {
  static displayName = 'Item';
  static style = style;

  handleClick = () => {
    const { value, $handleInteraction } = this.asProps;

    ($handleInteraction as Function)(value);
  };

  getToggleProps() {
    const { value, selected, disabled } = this.asProps;
    return {
      disabled,
      onClick: this.handleClick,
      id: `trigger-${value}`,
      'aria-expanded': selected,
      'aria-controls': `content-${value}`,
    };
  }

  getCollapseProps() {
    const { selected, duration, value } = this.asProps;
    return {
      selected,
      duration,
      id: `content-${value}`,
      role: 'region',
      'aria-labelledby': `trigger-${value}`,
    };
  }

  getChevronProps() {
    const { selected } = this.asProps;
    return {
      selected,
    };
  }

  render() {
    const { Children } = this.asProps;
    return <Children />;
  }
}

export class Toggle extends Component<IBoxProps> {
  static enhance = [keyboardFocusEnhance()];

  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        e.currentTarget.click();
    }
  }

  render() {
    const SItemToggle = this.Root;
    const { styles, keyboardFocused, disabled } = this.asProps;
    return styled(styles)(
      <SItemToggle
        render={Box}
        keyboardFocused={keyboardFocused}
        disabled={disabled}
        onKeyDown={this.handleKeyDown}
      />,
    );
  }
}

export function Chevron(props) {
  const { Root: SItemChevron, styles, selected, tag = ChevronRightXS } = props;
  return styled(styles)(<SItemChevron render={Box} selected={selected} tag={tag} />);
}

export function Collapse(props) {
  const { Root, selected } = props;
  return <Root render={CollapseAnimate} visible={selected} interactive />;
}

const Item = createComponent(RootItem, {
  Toggle,
  Chevron,
  Collapse,
});

const Accordion = createComponent<
  RootAccordion,
  {
    Item: [
      IAccordionItemProps,
      {
        Toggle: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>>;
        Chevron: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>>;
        Collapse: Merge<ICollapseProps, HTMLAttributes<HTMLDivElement>>;
      },
    ];
  },
  IAccordionContext & IAccordionItemContext,
  <T extends AccordionValue = AccordionValue>(
    props: PropsAndRef<
      IAccordionProps<T>,
      IAccordionContext & IAccordionItemContext,
      ReturnType<RootAccordion['uncontrolledProps']>
    >,
  ) => React.ReactElement
>(RootAccordion, {
  Item,
});

export default Accordion;
