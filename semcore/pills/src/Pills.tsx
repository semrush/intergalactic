import { NeighborLocation, Box, useNeighborLocationDetect } from '@semcore/base-components';
import type { Intergalactic, IRootComponentProps } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import a11yEnhance from '@semcore/core/lib/utils/enhances/a11yEnhance';
import React from 'react';

import type { IntergalacticPillsComponent, PillProps, PillsComponent, PillsHandlers, PillsItemAddonComponent, PillsItemComponent, PillsItemTextComponent, PillsProps, PillsValue } from './Pills.type';
import style from './style/pills.shadow.css';

class RootPills extends Component<
  Intergalactic.InternalTypings.InferComponentProps<IntergalacticPillsComponent>,
  typeof RootPills.enhance,
  PillsHandlers
> {
  static displayName = 'Pills';
  static style = style;
  static defaultProps = ({ behavior }: PillsProps) => ({
    size: 'm',
    defaultValue: null,
    behavior: behavior ?? 'auto',
  });

  itemValues: Array<PillProps['value']> = [];

  static enhance = [a11yEnhance({
    onNeighborChange: (neighborElement, props) => {
      if (neighborElement) {
        neighborElement.focus();
        if (props.behavior === 'auto') {
          neighborElement.click();
        }
      }
    },
    childSelector: (props) => {
      const selector = props.behavior === 'auto' ? ['role', 'radio'] : ['role', 'tab'];

      return selector as [string, string];
    },
  })] as const;

  uncontrolledProps() {
    return {
      value: (value: PillProps['value'], e: React.SyntheticEvent) => value,
    };
  }

  bindHandlerClick = (value: PillProps['value']) => (e: React.MouseEvent) => {
    this.handlers.value(value, e);
  };

  bindHandleKeyDown = (value: PillProps['value']) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handlers.value(value, e);
    }
  };

  getItemProps(props: PillProps, index: number) {
    const { value, size, disabled, behavior } = this.asProps;
    const isSelected = value === props.value;

    this.itemValues[index] = props.value;

    return {
      index: index,
      size,
      disabled,
      selected: isSelected,
      behavior,
      tabIndex: isSelected ? 0 : -1,
      onClick: this.bindHandlerClick(props.value),
      onKeyDown: this.bindHandleKeyDown(props.value),
    };
  }

  render() {
    const SPills = Root;
    const { Children, styles, controlsLength, disabled, behavior, value } = this.asProps;

    return sstyled(styles)(
      <SPills
        render={Box}
        role={behavior === 'auto' ? 'radiogroup' : 'tablist'}
        aria-disabled={disabled}
        use:tabIndex={value !== null ? -1 : 0}
      >
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
      </SPills>,
    );
  }
}

function Pill(props: Intergalactic.InternalTypings.InferChildComponentProps<PillsItemComponent, typeof RootPills, 'Item'>) {
  const SPill = Root;
  const { Children, styles, addonLeft, addonRight, selected, disabled, index, behavior } = props;
  const neighborLocation = useNeighborLocationDetect(index);

  const roleAreaProps = {
    'role': behavior === 'auto' ? 'radio' : 'tab',
    'aria-checked': behavior === 'auto' ? selected : undefined,
    'aria-selected': behavior !== 'auto' ? selected : undefined,
  };

  return sstyled(styles)(
    <SPill
      render={Box}
      tag='button'
      type='button'
      tabIndex={0}
      neighborLocation={neighborLocation}
      aria-disabled={disabled}
      {...roleAreaProps}
    >
      {addonLeft ? <Pills.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, Pills.Item.Text, Pills.Item.Addon)}
      {addonRight ? <Pills.Item.Addon tag={addonRight} /> : null}
    </SPill>,
  );
}

function Text(props: Intergalactic.InternalTypings.InferComponentProps<PillsItemTextComponent>) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Box} tag='span' />);
}

function Addon(props: Intergalactic.InternalTypings.InferComponentProps<PillsItemAddonComponent>) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

export const wrapPills = <PropsExtending extends {}>(wrapper: (
  props: Intergalactic.InternalTypings.UntypeRefAndTag<
    Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticPillsComponent>
  > &
  PropsExtending,
) => React.ReactNode) => wrapper as IntergalacticPillsComponent<PropsExtending>;

const Pills = createComponent(RootPills, {
  Item: [Pill, { Text, Addon }],
}) as unknown as PillsComponent;

export default Pills;
