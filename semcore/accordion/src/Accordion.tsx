import { Collapse as CollapseAnimate, Flex } from '@semcore/base-components';
import type { Intergalactic, IRootComponentProps } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import ChevronRightL from '@semcore/icon/ChevronRight/l';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import { Text } from '@semcore/typography';
import type { RootProps } from '@semcore/ui/core/lib/core-types/Component';
import React from 'react';

import type {
  AccordionCollapseProps,
  AccordionComponent,
  AccordionHandlers,
  AccordionItemComponent,
  AccordionItemProps,
  AccordionItemToggleProps,
  AccordionProps,
  ChevronItemProps,
  IntergalacticAccordionComponent,
} from './Accordion.type';
import style from './style/accordion.shadow.css';

class RootAccordion extends Component<AccordionProps, typeof RootAccordion.enhance, AccordionHandlers> {
  static displayName = 'Accordion';
  static style = style;
  static defaultProps = {
    defaultValue: [],
    use: 'secondary',
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

  handleToggleInteraction = (newValue: AccordionItemProps['value']) => {
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

  getItemProps({ value }: AccordionItemProps) {
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
    const { Children } = this.asProps;
    return <Children />;
  }
}
export class RootItem extends Component<AccordionItemProps, typeof RootItem.enhance, {}, RootProps<typeof RootAccordion, 'Item'>> {
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
    const { Children } = this.asProps;
    return <Children />;
  }
}

class Toggle extends Component<AccordionItemToggleProps, never, {}, RootProps<typeof RootItem, 'Toggle'>> {
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
      <SItemToggle
        use={use}
        ref={this.toggleRef}
        render={Text}
        innerOutline
        onKeyDown={this.handleKeyDown}
      />,
    );
  }
}

function Chevron(props: ChevronItemProps) {
  const { styles, size } = props;

  const SItemChevron = Root;
  return sstyled(styles)(<SItemChevron render={size === 'l' ? ChevronRightL : ChevronRightM} />);
}

function ToggleButton(props: IRootComponentProps) {
  const { styles } = props;

  const SToggleButton = Root;
  return sstyled(styles)(
    <SToggleButton alignItems='center' render={Flex} role='button' {...props} />,
  );
}

function Collapse(props: AccordionCollapseProps & RootProps<typeof RootItem, 'Collapse'>) {
  const { selected } = props;
  const visible = selected;

  return (
    <Root
      render={CollapseAnimate}
      visible={visible}
      interactive
      inert={!visible ? '' : undefined}
      aria-hidden={!visible}
    />
  );
}

const Item = createComponent(RootItem, {
  Toggle,
  Chevron,
  ToggleButton,
  Collapse,
}) as AccordionItemComponent;

const Accordion = createComponent(RootAccordion, {
  Item,
}) as unknown as AccordionComponent;

export const wrapAccordion = <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticAccordionComponent>
    > &
    PropsExtending,
  ) => React.ReactNode,
) => wrapper as IntergalacticAccordionComponent<PropsExtending>;

export default Accordion;
