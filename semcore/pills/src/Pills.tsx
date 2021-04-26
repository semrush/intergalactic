import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, {
  Component,
  Merge,
  PropGetterFn,
  PropsAndRef,
  sstyled,
  Root,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import NeighborLocation, {
  INeighborItemProps,
  INeighborLocationProps,
  neighborLocationEnhance,
} from '@semcore/neighbor-location';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';

import style from './style/pills.shadow.css';

export type PillsValue = string | number | boolean;

export interface IPillsProps<T extends PillsValue = PillsValue> extends INeighborLocationProps {
  /** Pills size */
  size?: 'xl' | 'l' | 'm' | 's' | false;
  /** Disabled state */
  disabled?: boolean;
  /** Called when the selection is changed */
  onChange?: (value: T, e?: React.SyntheticEvent<HTMLSpanElement>) => void;
  /** Value for the selected pill */
  value?: T;
  /** Default value for the selected pill */
  defaultValue?: T;
}

export interface IPillProps extends IBoxProps, INeighborItemProps, IKeyboardFocusProps {
  /** Disabled state */
  disabled?: boolean;
  /** Pill value */
  value: PillsValue;
  /** Left addon text */
  addonLeft?: React.ElementType;
  /** Right addon tag */
  addonRight?: React.ElementType;
}

export interface IPillsContext {
  getItemProps: PropGetterFn;
}

class RootPills extends Component<IPillsProps> {
  static displayName = 'Pills';
  static style = style;
  static defaultProps = {
    size: 'm',
    defaultValue: null,
  };

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  bindHandlerClick = (value) => (e) => {
    this.handlers.value(value, e);
  };

  getItemProps(props) {
    const { value, size, disabled } = this.asProps;
    return {
      size,
      disabled,
      selected: value === props.value,
      onClick: this.bindHandlerClick(props.value),
    };
  }

  render() {
    const SPills = Root;
    const { Children, styles, controlsLength } = this.asProps;

    return sstyled(styles)(
      <SPills render={Box}>
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
      </SPills>,
    );
  }
}

function Pill(props) {
  const SPill = Root;
  const { Children, styles, selected, addonLeft, addonRight } = props;

  return sstyled(styles)(
    <SPill render={Box} type="button" tag="button" active={selected}>
      {addonLeft ? <Pills.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, Pills.Item.Text, Pills.Item.Addon)}
      {addonRight ? <Pills.Item.Addon tag={addonRight} /> : null}
    </SPill>,
  );
}

Pill.enhance = [keyboardFocusEnhance(), neighborLocationEnhance()];

function Text(props) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Box} tag="span" />);
}

function Addon(props) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag="span" />);
}

const Pills = createComponent<
  RootPills,
  {
    Item: [
      Merge<IPillProps, HTMLAttributes<HTMLButtonElement>>,
      {
        Text: ComponentProps<typeof Box>;
        Addon: ComponentProps<typeof Box>;
      },
    ];
  },
  Merge<IPillsContext, IPillProps>,
  <T extends PillsValue = PillsValue>(
    props: PropsAndRef<IPillsProps<T>, IPillsContext, ReturnType<RootPills['uncontrolledProps']>>,
  ) => React.ReactElement
>(RootPills, {
  Item: [Pill, { Text, Addon }],
});

export default Pills;
