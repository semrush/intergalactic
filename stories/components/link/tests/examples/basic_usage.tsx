import CheckM from '@semcore/icon/Check/m';
import type { BoxProps } from '@semcore/ui/base-components';
import { Box } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import type { LinkProps } from '@semcore/ui/link';
import React from 'react';

type BasicLinkProps = LinkProps & BoxProps & {
  text?: string;
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  href?: string;
  title?: string;
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
    <>
      <Link
        href={href}

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

      <Box mt={3}>
        <Link
          href={href}
          size={size}
          disabled={disabled}
          active={active}
          enableVisited={enableVisited}
          noWrap={noWrap}
          color={color}
          title={title}
          addonLeft={showAddonLeft ? CheckM : undefined}
          addonRight={showAddonRight ? CheckM : undefined}
          {...restProps}
          style={{ border: '1px solid red' }}
        >
          <Link.Text w={w} ellipsis>{text} ellipsis</Link.Text>
        </Link>
        <Link
          href={href}
          size={size}
          disabled={disabled}
          active={active}
          enableVisited={enableVisited}
          noWrap={noWrap}
          color={color}
          title={title}
          addonLeft={showAddonLeft ? CheckM : undefined}
          addonRight={showAddonRight ? CheckM : undefined}
          {...restProps}
          style={{ border: '1px solid red' }}
        >
          <Link.Text>{text}</Link.Text>
        </Link>
      </Box>
    </>
  );
};

export const defaultProps: BasicLinkProps = {
  text: 'Link example',
  href: '#',
  size: 300,
};

Demo.defaultProps = defaultProps;

export default Demo;
