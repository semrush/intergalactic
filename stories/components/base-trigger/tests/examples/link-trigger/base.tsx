import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import type { LinkTriggerProps } from '@semcore/ui/base-trigger';
import Counter, { type CounterProps } from '@semcore/ui/counter';
import Spin, { type SpinSize } from '@semcore/ui/spin';
import type { TextEllipsisProps } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type AddonType = 'icon' | 'badge' | 'counter' | 'spin';

type BasicLinktriggerProps = LinkTriggerProps & {
  text?: string;
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  ellipsis?: TextEllipsisProps;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
  addonLeftType?: AddonType;
  addonRightType?: AddonType;
  merged?: boolean;
  loading?: boolean;
  color?: string;
  w?: number;
};

const Demo = (props: BasicLinktriggerProps) => {
  const {
    text = 'LinkTrigger example',
    showAddonLeft = false,
    showAddonRight = false,
    disabled,
    loading,
    hintProps,
    active,
    size = 300,
    w,
    ellipsis,
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
        return <LinkTrigger.Addon><Badge type='new' /></LinkTrigger.Addon>;
      case 'counter':
        return <LinkTrigger.Addon><Counter size={counterSize}>17</Counter></LinkTrigger.Addon>;
      case 'spin':
        return <LinkTrigger.Addon><Spin size={spinSize} /></LinkTrigger.Addon>;
      case 'icon':
      default:
        if (merged) return <LinkTrigger.Addon tag={IconAddon} />;
        return <LinkTrigger.Addon><IconAddon /></LinkTrigger.Addon>;
    }
  };

  const hasEllipsis = ellipsis !== undefined && ellipsis.ellipsis !== false;
  const ellipsisW = hasEllipsis ? (w || (numSize < 600 ? 150 : 300)) : undefined;

  let displayValue: 'inline-block' | undefined;
  if (ellipsis?.['ellipsis:maxLine'] && ellipsis?.['ellipsis:maxLine'] > 1) {
    displayValue = 'inline-block';
  }

  return (
    <Text tag='div' size={size}>
      <LinkTrigger
        size={size}
        disabled={disabled}
        active={active}
        loading={loading}
        color={props.color}
        display={displayValue}
        mr={4}
      >
        {renderAddon(showAddonLeft, addonLeftType)}
        <LinkTrigger.Text
          w={ellipsisW}
          {...ellipsis}
          hint:placement={hintPlacement}
          hint={hintProps}
        >
          {text}
        </LinkTrigger.Text>
        {renderAddon(showAddonRight, addonRightType)}
      </LinkTrigger>

      {`${numSize} `}
      <LinkTrigger
        size={size}
        loading={loading}
        disabled={disabled}
        active={active}
        color={props.color}
      >
        {renderAddon(showAddonLeft, addonLeftType)}
        <LinkTrigger.Text>
          {text}
        </LinkTrigger.Text>
        {renderAddon(showAddonRight, addonRightType)}
      </LinkTrigger>
    </Text>
  );
};

export const defaultLinkTriggerProps: BasicLinktriggerProps = {
  text: 'LinkTrigger example',
  size: 300,
  showAddonLeft: false,
  showAddonRight: false,
  addonLeftType: 'icon',
  addonRightType: 'icon',
  merged: false,
  ellipsis: { ellipsis: true },
  loading: false,
  w: 120,
};

Demo.defaultProps = defaultLinkTriggerProps;

export default Demo;
