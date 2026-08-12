import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import type { LinkTriggerProps } from '@semcore/ui/base-trigger';
import Counter, { type NSCounter } from '@semcore/ui/counter';
import Flags from '@semcore/ui/flags';
import Tag, { type NSTag } from '@semcore/ui/tag';
import type { NSText } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type AddonType = 'icon' | 'badge' | 'counter' | 'flag' | 'tag';

type BasicLinktriggerProps = LinkTriggerProps & {
  text?: string;
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  ellipsis?: NSText.EllipsisProps;
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
    use,
    empty,
    placeholder,
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

  let counterSize: NSCounter.Props['size'];
  if (numSize >= 600) {
    counterSize = 'l';
  } else if (numSize >= 300) {
    counterSize = 'm';
  }

  let tagSize: NSTag.Size | undefined;
  if (numSize >= 600) {
    tagSize = 'xl';
  } else if (numSize >= 300) {
    tagSize = 'l';
  } else {
    tagSize = 'm';
  }

  const renderAddon = (show: boolean, type: AddonType) => {
    if (!show) return null;

    switch (type) {
      case 'badge':
        return <LinkTrigger.Addon><Badge type='new' /></LinkTrigger.Addon>;
      case 'counter':
        return <LinkTrigger.Addon><Counter size={counterSize}>17</Counter></LinkTrigger.Addon>;
      case 'flag':
        return <LinkTrigger.Addon><Flags name='US' /></LinkTrigger.Addon>;
      case 'tag':
        return <LinkTrigger.Addon><Tag size={tagSize}>Label</Tag></LinkTrigger.Addon>;
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
        use={use}
        disabled={disabled}
        active={active}
        loading={loading}
        empty={empty}
        placeholder={placeholder}
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
        use={use}
        loading={loading}
        disabled={disabled}
        active={active}
        empty={empty}
        placeholder={placeholder}
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
