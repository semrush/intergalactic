import type { BoxProps } from '@semcore/ui/base-components';
import CheckM from '@semcore/ui/icon/Check/m';
import Link from '@semcore/ui/link';
import type { LinkProps } from '@semcore/ui/link';
import React from 'react';

type BasicLinkProps = LinkProps & BoxProps & {
  text?: string;
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
};

const Demo = (props: BasicLinkProps) => {
  const {
    text = 'Link example',
    showAddonLeft = false,
    showAddonRight = false,
    inline,
    disabled,
    active,
    enableVisited,
    noWrap,
    href = '#',
    size = 300,
    color,
    w,
    title,
    ...restProps
  } = props;

  return (
    <Link
      href={href}
      w={w}
      size={size}
      inline={inline}
      disabled={disabled}
      active={active}
      enableVisited={enableVisited}
      noWrap={noWrap}
      color={color}
      title={title}
      addonLeft={showAddonLeft ? CheckM : undefined}
      addonRight={showAddonRight ? CheckM : undefined}
      {...restProps}
    >
      {text}
    </Link>
  );
};

export const defaultProps: BasicLinkProps = {
  text: 'Link example',
  href: '#',
  size: 300,
  inline: undefined,
  disabled: undefined,
  active: undefined,
  enableVisited: undefined,
  noWrap: undefined,
  color: undefined,
  showAddonLeft: false,
  showAddonRight: false,
  w: undefined,
  title: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
