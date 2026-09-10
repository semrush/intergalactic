import { Collapse as CollapseAnimate, Flex, Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import ChevronRightL from '@semcore/icon/ChevronRight/l';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import { Text } from '@semcore/typography';
import React from 'react';

import type { NSAccordion } from './Accordion.type';
import style from './style/accordion.shadow.css';

class RootAccordion extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSAccordion.Component>,
  typeof RootAccordion.enhance,
  NSAccordion.Handlers,
  {},
  {},
  NSAccordion.DefaultProps
> {
  static displayName = 'Accordion';
  static style = style;
  static defaultProps = {
    defaultValue: [],
    use: 'secondary' as const,
  };

  static enhance = [
    cssVariableEnhance({
      variable: '--intergalactic-duration-accordion',
      fallback: '200',
      map: (value: string) => `${Number.parseInt(value)}`,
      prop: 'duration',
    }),
  ] as const;

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleToggleInteraction = (newValue: NSAccordion.Item.Props['value']) => {
    const { value } = this.asProps;

    if (Array.isArray(value)) {
      const indexOfNewValue = value.indexOf(newValue);
      const result = [...value];
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      indexOfNewValue === -1 ? result.push(newValue) : result.splice(indexOfNewValue, 1);
      this.handlers.value(result);
    } else {
      this.handlers.value(value === newValue ? null : newValue);
    }
  };

  getItemProps({ value }: NSAccordion.Item.Props) {
    const { value: selectedValue, duration, use } = this.asProps;
    const selected = Array.isArray(selectedValue)
      ? selectedValue.includes(value)
      : selectedValue === value;

    return {
      selected,
      duration,
      use,
      $handleInteraction: this.handleToggleInteraction,
    };
  }

  render() {
    const SAccordion = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(<SAccordion render={Flex} />);
  }
}
export class RootItem extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSAccordion.Item.Component, typeof RootAccordion, 'Item'>,
  typeof RootItem.enhance
> {
  static displayName = 'Item';
  static style = style;
  static enhance = [uniqueIDEnhancement()] as const;

  handleClick = () => {
    const { value, $handleInteraction } = this.asProps;

    $handleInteraction(value);
  };

  getToggleProps() {
    const { value, uid, disabled, use } = this.asProps;
    return {
      use,
      disabled,
      onClick: disabled ? undefined : this.handleClick,
      id: `igc-${uid}-${value}-toggle`,
      tag: 'h3',
      size: 300,
      tabIndex: disabled ? -1 : 0,
    };
  }

  getToggleButtonProps() {
    const { value, uid, selected, disabled } = this.asProps;
    return {
      disabled,
      'id': `igc-${uid}-${value}-toggle-button`,
      'aria-expanded': selected ? 'true' : 'false',
      'aria-controls': selected ? `igc-${uid}-${value}-collapse` : undefined,
    };
  }

  getCollapseProps() {
    const { selected, uid, duration, value } = this.asProps;
    return {
      selected,
      duration,
      'id': `igc-${uid}-${value}-collapse`,
      'role': 'region',
      'aria-labelledby': `igc-${uid}-${value}-toggle-button`,
    };
  }

  getChevronProps() {
    const { selected, size } = this.asProps;
    return {
      selected,
      size,
    };
  }

  render() {
    const SAccordionItem = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(<SAccordionItem render={Box} />);
  }
}

class Toggle extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSAccordion.Item.Toggle.Component, typeof RootItem, 'Toggle'>
> {
  toggleRef = React.createRef();

  handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter') {
      if (this.toggleRef.current === event.target) {
        event.currentTarget.click();
      }
    } else if (event.key === ' ') {
      event.preventDefault();
      if (this.toggleRef.current === event.target) {
        event.currentTarget.click();
      }
    }
  };

  render() {
    const { styles, use } = this.asProps;
    const SItemToggle = Root;

    return sstyled(styles)(
      <SItemToggle use={use} ref={this.toggleRef} render={Text} innerOutline onKeyDown={this.handleKeyDown} />,
    );
  }
}

function Chevron(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSAccordion.Item.Chevron.Component,
    typeof RootItem,
    'Chevron'
  >,
) {
  const { styles, size } = props;

  const SItemChevron = Root;
  return sstyled(styles)(<SItemChevron render={size === 'l' ? ChevronRightL : ChevronRightM} />);
}

function ToggleButton(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSAccordion.Item.ToggleButton.Component,
    typeof RootItem,
    'ToggleButton'
  >,
) {
  const { styles } = props;

  return sstyled(styles)(
    <Root render={Flex} alignItems='center' role='button' />,
  );
}

function Collapse(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSAccordion.Item.Collapse.Component,
    typeof RootItem,
    'Collapse'
  >,
) {
  const SItemCollapse = Root;
  const SItemCollapseContainer = Box;
  const { selected, styles, Children } = props;
  const visible = selected;

  return sstyled(styles)(
    <SItemCollapse
      render={CollapseAnimate}
      visible={visible}
      interactive
      inert={!visible ? '' : undefined}
      aria-hidden={!visible}
    >
      <SItemCollapseContainer>
        <Children />
      </SItemCollapseContainer>
    </SItemCollapse>,
  );
}

const Item = createComponent<
  NSAccordion.Item.Component,
  typeof RootItem
>(RootItem, {
  Toggle,
  Chevron,
  ToggleButton,
  Collapse,
});

/**
 * Accordion
 *
 * {@link https://developer.semrush.com/intergalactic/components/accordion/accordion-api/|API} | {@link https://developer.semrush.com/intergalactic/components/accordion/accordion-code/|Examples}
 */
const Accordion = createComponent<
  NSAccordion.Component,
  typeof RootAccordion
>(RootAccordion, {
  Item,
});

export const wrapAccordion = <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<NSAccordion.WrapComponent>
    > &
    PropsExtending,
  ) => React.ReactNode,
) => wrapper as NSAccordion.WrapComponent<PropsExtending>;

export default Accordion;
