import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { ButtonLink } from '@semcore/ui/button';
import type { ButtonLinkProps } from '@semcore/ui/button';
import Counter, { type CounterProps } from '@semcore/ui/counter';
import Spin, { type SpinSize } from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type AddonType = 'icon' | 'badge' | 'counter' | 'spin';

type BasicButtonLinkProps = ButtonLinkProps & {
  text?: string;
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  ellipsis?: false | true | { cropPosition: 'middle'; lastRequiredSymbols?: number } | { cropPosition?: 'end'; maxLine?: number };
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  addonLeftType?: AddonType;
  addonRightType?: AddonType;
  merged?: boolean;
  color?: string;
  w?: number;
};

const Demo = (props: BasicButtonLinkProps) => {
  const {
    text = 'ButtonLink example',
    showAddonLeft = false,
    showAddonRight = false,
    disabled,
    active,
    loading,
    size = 300,
    use = 'primary',
    w,
    ellipsis = true,
    hintPlacement,
    addonLeftType = 'icon',
    addonRightType = 'icon',
    merged = false,
  } = props;

  const numSize = Number(size);
  const IconAddon = numSize < 600 ? MathPlusAltM : MathPlusAltL;

  let spinSize: SpinSize = 'm';
  if (numSize <= 200) {
    spinSize = 'xs';
  } else if (numSize <= 500) {
    spinSize = 's';
  }

  let counterSize: CounterProps['size'];
  if (numSize >= 600) {
    counterSize = 'l';
  } else if (numSize >= 300) {
    counterSize = 'm';
  }

  const renderAddon = (show: boolean, type: AddonType) => {
    if (!show) return null;

    switch (type) {
      case 'badge':
        return <ButtonLink.Addon><Badge type='new' /></ButtonLink.Addon>;
      case 'counter':
        return <ButtonLink.Addon><Counter size={counterSize}>17</Counter></ButtonLink.Addon>;
      case 'spin':
        return <ButtonLink.Addon><Spin size={spinSize} /></ButtonLink.Addon>;
      case 'icon':
      default:
        if (merged) return <ButtonLink.Addon tag={IconAddon} />;
        return <ButtonLink.Addon><IconAddon /></ButtonLink.Addon>;
    }
  };

  const ellipsisW = ellipsis ? (w || (numSize < 600 ? 150 : 300)) : undefined;

  let displayValue: 'inline-block' | undefined;
  if (typeof ellipsis === 'object' && 'maxLine' in ellipsis && ellipsis.maxLine && ellipsis.maxLine > 1) {
    displayValue = 'inline-block';
  }

  return (
    <Text tag='div' size={size}>
      <ButtonLink
        size={size}
        use={use}
        disabled={disabled}
        active={active}
        loading={loading}
        color={props.color}
        display={displayValue}
        mr={4}
      >
        {renderAddon(showAddonLeft, addonLeftType)}
        <ButtonLink.Text
          w={ellipsisW}
          ellipsis={ellipsis || undefined}
          hint:placement={hintPlacement}
        >
          {text}
        </ButtonLink.Text>
        {renderAddon(showAddonRight, addonRightType)}
      </ButtonLink>

      {`${numSize} `}
      <ButtonLink
        size={size}
        use={use}
        disabled={disabled}
        active={active}
        loading={loading}
        color={props.color}
      >
        {renderAddon(showAddonLeft, addonLeftType)}
        <ButtonLink.Text>
          {text}
        </ButtonLink.Text>
        {renderAddon(showAddonRight, addonRightType)}
      </ButtonLink>
    </Text>
  );
};

export const defaultButtonLinkProps: BasicButtonLinkProps = {
  text: 'ButtonLink example',
  size: 300,
  use: 'primary',
  showAddonLeft: false,
  showAddonRight: false,
  addonLeftType: 'icon',
  addonRightType: 'icon',
  merged: false,
  ellipsis: true,
  w: 120,
};

Demo.defaultProps = defaultButtonLinkProps;

export default Demo;
