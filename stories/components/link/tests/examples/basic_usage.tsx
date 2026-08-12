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
   * Ignored while an addon is shown — an addon requires the text to live in `<Link.Text>`.
   */
  childrenMode?: 'slot' | 'string';
  title?: string;
  ellipsis?: NSText.EllipsisProps;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  addonLeftType?: AddonType;
  addonRightType?: AddonType;
  /**
   * How an icon addon reaches the Link:
   * 'children' renders `<Link.Addon><IconAddon /></Link.Addon>`,
   * 'tag' hands it over as the `addonLeft` / `addonRight` prop.
   * Only icons can go through the props — they take a component, so badge, counter and
   * spin always stay children.
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

  const renderAddon = (type: AddonType) => {
    switch (type) {
      case 'badge':
        return <Link.Addon><Badge type='new' /></Link.Addon>;
      case 'counter':
        return <Link.Addon><Counter size={counterSize}>17</Counter></Link.Addon>;
      case 'spin':
        return <Link.Addon><Spin size={spinSize} /></Link.Addon>;
      case 'icon':
      default:
        return <Link.Addon><IconAddon /></Link.Addon>;
    }
  };

  // Only an icon can travel through addonLeft/addonRight — the props take a component.
  const passesAsTag = (show: boolean, type: AddonType) =>
    show && addonPassMethod === 'tag' && type === 'icon';

  const addonLeftProp = passesAsTag(showAddonLeft, addonLeftType) ? IconAddon : undefined;
  const addonRightProp = passesAsTag(showAddonRight, addonRightType) ? IconAddon : undefined;

  // string child next to <Link.Addon> is not a supported composition — with addons
  // the text always has to be wrapped in <Link.Text>, so the slot wins over childrenMode.
  const asString = childrenMode === 'string' && !showAddonLeft && !showAddonRight;

  /**
   * Link injects the external icon on its own only for a plain string child that is not
   * already a URL. Every other composition is the consumer's job, so the slot mode has to
   * append `<Link.ExternalIcon />` the way the docs examples do. The icon takes its size
   * from the parent through getExternalIconProps(), so it needs no props here.
   *
   * `isUrl` mirrors the component's own check. Same-host absolute URLs would read as
   * external here and not in the component, but none of the story's href presets is
   * same-host, so the story never hits that gap.
   */
  const isUrl = (value: string) => value.startsWith('//') || value.toLowerCase().startsWith('http');
  const needsExternalIcon = !asString && (isExternal ?? isUrl(href));

  /**
   * Builds the Link with only the slots that are switched on.
   *
   * Writing the slots as JSX would hand Link an array of `[null, text, null]` even with
   * both addons off, and an array reads differently from a lone child. Spreading a
   * filtered list through createElement keeps an addon-free link a one-child link.
   */
  const renderLink = (linkProps: Record<string, unknown>, textNode: React.ReactNode) => {
    const nodes = [
      showAddonLeft && !addonLeftProp ? renderAddon(addonLeftType) : null,
      textNode,
      showAddonRight && !addonRightProp ? renderAddon(addonRightType) : null,
      needsExternalIcon ? <Link.ExternalIcon /> : null,
    ].filter(Boolean);

    return React.createElement(
      Link,
      { ...linkProps, addonLeft: addonLeftProp, addonRight: addonRightProp },
      ...nodes,
    );
  };

  const ellipsisW = ellipsis && !containerW ? (w || (numSize < 600 ? 150 : 300)) : undefined;

  let linkDisplayValue: 'inline-block' | undefined;
  if (ellipsis?.['ellipsis:maxLine'] && ellipsis?.['ellipsis:maxLine'] > 1) {
    linkDisplayValue = 'inline-block';
  }

  const sharedLinkProps = {
    use,
    href,
    isExternal,
    size,
    disabled,
    active,
    enableVisited,
    noWrap,
    color,
    title,
    w: noWrap ? w : undefined,
  };

  return (
    <Text tag='div' size={size} style={containerW ? { width: containerW } : undefined}>
      {renderLink(
        { ...sharedLinkProps, display: linkDisplayValue },
        asString
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
            ),
      )}

      {`${numSize} `}
      {renderLink(
        sharedLinkProps,
        asString ? text : <Link.Text size={size}>{text}</Link.Text>,
      )}
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
