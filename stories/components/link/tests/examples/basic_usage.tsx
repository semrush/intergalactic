import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import Counter, { type NSCounter } from '@semcore/ui/counter';
import Link, { type LinkProps } from '@semcore/ui/link';
import Spin, { type SpinSize } from '@semcore/ui/spin';
import type { NSText } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type AddonType = 'icon' | 'badge' | 'counter' | 'spin';

type BasicLinkProps = LinkProps & {
  text?: string;
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  showAddonLeftLink2?: boolean;
  showAddonRightLink2?: boolean;
  href?: string;
  title?: string;
  ellipsis?: NSText.EllipsisProps;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  addonLeftType?: AddonType;
  addonRightType?: AddonType;
  merged?: boolean;
  addonPassMethod?: 'slot' | 'prop';
  w?: number;
  containerW?: number;
};

const Demo = (props: BasicLinkProps) => {
  const {
    text = 'Link example',
    showAddonLeft = false,
    showAddonRight = false,
    disabled,
    active,
    enableVisited,
    noWrap,
    href = '#',
    size = 300,
    color,
    w,
    title,
    ellipsis,
    hintPlacement,
    addonLeftType = 'icon',
    addonRightType = 'icon',
    merged = false,
    addonPassMethod = 'slot',
    containerW,
  } = props;

  const numSize = Number(size);
  const IconAddon = numSize < 600 ? MathPlusAltM : MathPlusAltL;

  let spinSize: SpinSize = 'm';
  if (numSize <= 200) {
    spinSize = 'xs';
  } else if (numSize <= 500) {
    spinSize = 's';
  }

  let counterSize: NSCounter.Props['size'];
  if (numSize >= 600) {
    counterSize = 'l';
  } else if (numSize >= 300) {
    counterSize = 'm';
  }

  const renderAddon = (show: boolean, type: AddonType) => {
    if (!show) return null;

    switch (type) {
      case 'badge':
        return <Link.Addon><Badge type='new' /></Link.Addon>;
      case 'counter':
        return <Link.Addon><Counter size={counterSize}>17</Counter></Link.Addon>;
      case 'spin':
        return <Link.Addon><Spin size={spinSize} /></Link.Addon>;
      case 'icon':
      default:
        if (addonPassMethod === 'prop') return null;
        if (merged) return <Link.Addon tag={IconAddon} />;
        return <Link.Addon><IconAddon /></Link.Addon>;
    }
  };

  const propAddonLeft = addonPassMethod === 'prop' && showAddonLeft && addonLeftType === 'icon'
    ? IconAddon
    : undefined;
  const propAddonRight = addonPassMethod === 'prop' && showAddonRight && addonRightType === 'icon'
    ? IconAddon
    : undefined;

  const ellipsisW = ellipsis && !containerW ? (w || (numSize < 600 ? 150 : 300)) : undefined;

  let linkDisplayValue: 'inline-block' | undefined;
  if (ellipsis?.['ellipsis:maxLine'] && ellipsis?.['ellipsis:maxLine'] > 1) {
    linkDisplayValue = 'inline-block';
  }

  return (
    <Text tag='div' size={size} style={containerW ? { width: containerW } : undefined}>
      <Link
        href={href}
        size={size}
        disabled={disabled}
        active={active}
        enableVisited={enableVisited}
        noWrap={noWrap}
        color={color}
        title={title}
        w={noWrap ? w : undefined}
        display={linkDisplayValue}
        addonLeft={propAddonLeft}
        addonRight={propAddonRight}
      >
        {renderAddon(showAddonLeft, addonLeftType)}
        <Link.Text
          size={size}
          {...(ellipsisW !== undefined && { w: ellipsisW })}
          {...ellipsis}
          hint:placement={hintPlacement}
        >
          {text}
        </Link.Text>
        {renderAddon(showAddonRight, addonRightType)}
      </Link>

      {`${numSize} `}
      <Link
        href={href}
        size={size}
        disabled={disabled}
        active={active}
        enableVisited={enableVisited}
        noWrap={noWrap}
        color={color}
        title={title}
        w={noWrap ? w : undefined}
        addonLeft={propAddonLeft}
        addonRight={propAddonRight}
      >
        {renderAddon(showAddonLeft, addonLeftType)}
        <Link.Text size={size}>
          {text}
        </Link.Text>
        {renderAddon(showAddonRight, addonRightType)}
      </Link>
    </Text>
  );
};

export const defaultProps: BasicLinkProps = {
  text: 'Link example',
  href: '#',
  size: 300,
  showAddonLeft: false,
  showAddonRight: false,

  addonLeftType: 'icon',
  addonRightType: 'icon',
  merged: false,
  addonPassMethod: 'slot',
  ellipsis: {
    ellipsis: true,
  },
  w: 120,
};

Demo.defaultProps = defaultProps;

export default Demo;
