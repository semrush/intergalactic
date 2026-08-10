import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import Counter, { type NSCounter } from '@semcore/ui/counter';
import Link, { type LinkProps } from '@semcore/ui/link';
import Spin, { type NSSpin } from '@semcore/ui/spin';
import type { NSText } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type AddonType = 'icon' | 'badge' | 'counter' | 'spin';

type BasicLinkProps = LinkProps & {
  text?: string;
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  href?: string;
  /** Marks the link as external explicitly, bypassing host-based auto-detection. */
  isExternal?: boolean;
  /**
   * How the link text is passed down.
   * 'slot' wraps it in `<Link.Text>` (the default, and what most consumers do);
   * 'string' passes a bare string child, the only way to exercise the
   * children-based branch of the external-link auto-detection.
   */
  childrenMode?: 'slot' | 'string';
  title?: string;
  ellipsis?: NSText.EllipsisProps;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  addonLeftType?: AddonType;
  addonRightType?: AddonType;
  /**
   * How an icon addon is composed:
   * 'children' renders `<Link.Addon><IconAddon /></Link.Addon>`,
   * 'tag' renders `<Link.Addon tag={IconAddon} />`.
   */
  addonPassMethod?: 'children' | 'tag';
  w?: number;
  containerW?: number;
};

const Demo = (props: BasicLinkProps) => {
  const {
    text = 'Link example',
    use,
    showAddonLeft = false,
    showAddonRight = false,
    disabled,
    active,
    enableVisited,
    noWrap,
    href = '#',
    isExternal,
    childrenMode = 'slot',
    size = 300,
    color,
    w,
    title,
    ellipsis,
    hintPlacement,
    addonLeftType = 'icon',
    addonRightType = 'icon',
    addonPassMethod = 'children',
    containerW,
  } = props;

  const numSize = Number(size);
  const IconAddon = numSize < 600 ? MathPlusAltM : MathPlusAltL;

  let spinSize: NSSpin.Size = 'm';
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
        return addonPassMethod === 'tag'
          ? <Link.Addon tag={IconAddon} />
          : <Link.Addon><IconAddon /></Link.Addon>;
    }
  };

  const ellipsisW = ellipsis && !containerW ? (w || (numSize < 600 ? 150 : 300)) : undefined;

  let linkDisplayValue: 'inline-block' | undefined;
  if (ellipsis?.['ellipsis:maxLine'] && ellipsis?.['ellipsis:maxLine'] > 1) {
    linkDisplayValue = 'inline-block';
  }

  return (
    <Text tag='div' size={size} style={containerW ? { width: containerW } : undefined}>
      <Link
        use={use}
        href={href}
        isExternal={isExternal}
        size={size}
        disabled={disabled}
        active={active}
        enableVisited={enableVisited}
        noWrap={noWrap}
        color={color}
        title={title}
        w={noWrap ? w : undefined}
        display={linkDisplayValue}
      >
        {renderAddon(showAddonLeft, addonLeftType)}
        {childrenMode === 'string'
          ? text
          : (
              <Link.Text
                size={size}
                {...(ellipsisW !== undefined && { w: ellipsisW })}
                {...ellipsis}
                hint:placement={hintPlacement}
              >
                {text}
              </Link.Text>
            )}
        {renderAddon(showAddonRight, addonRightType)}
      </Link>

      {`${numSize} `}
      <Link
        use={use}
        href={href}
        isExternal={isExternal}
        size={size}
        disabled={disabled}
        active={active}
        enableVisited={enableVisited}
        noWrap={noWrap}
        color={color}
        title={title}
        w={noWrap ? w : undefined}
      >
        {renderAddon(showAddonLeft, addonLeftType)}
        {childrenMode === 'string' ? text : <Link.Text size={size}>{text}</Link.Text>}
        {renderAddon(showAddonRight, addonRightType)}
      </Link>
    </Text>
  );
};

export const defaultProps: BasicLinkProps = {
  text: 'Link example',
  href: '#',
  use: 'primary',
  size: 300,
  showAddonLeft: false,
  showAddonRight: false,

  addonLeftType: 'icon',
  addonRightType: 'icon',
  addonPassMethod: 'children',
  ellipsis: {
    ellipsis: true,
  },
  w: 120,
};

Demo.defaultProps = defaultProps;

export default Demo;
