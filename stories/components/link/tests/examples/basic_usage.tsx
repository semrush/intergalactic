import CheckM from '@semcore/icon/Check/m';
import type { BoxProps } from '@semcore/ui/base-components';
import { Box } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import type { LinkProps } from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type BasicLinkProps = LinkProps & BoxProps & {
  text?: string;
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  showAddonLeftLink2?: boolean;
  showAddonRightLink2?: boolean;
  href?: string;
  title?: string;
};

const Demo = (props: BasicLinkProps) => {
  const {
    text = 'Link example',
    showAddonLeft = false,
    showAddonRight = false,
    showAddonLeftLink2 = false,
    showAddonRightLink2 = false,
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
      >
        {text}
      </Link>

      <Text tag='div' mt={3} size={size}>
        <Link
          href={href}
          size={size}
          disabled={disabled}
          active={active}
          enableVisited={enableVisited}
          noWrap={noWrap}
          color={color}
          title={title}
          addonLeft={showAddonLeftLink2 ? CheckM : undefined}
          addonRight={showAddonRightLink2 ? CheckM : undefined}
          style={{ border: '1px solid red' }}
        >
          <Link.Text w={w} ellipsis>{text} ellipsis</Link.Text>
        </Link>
      </Text>
      <Text tag='div' mt={3} size={size}>
        <Link
          href={href}
          size={size}
          disabled={disabled}
          active={active}
          enableVisited={enableVisited}
          noWrap={noWrap}
          color={color}
          title={title}
          addonLeft={showAddonLeftLink2 ? CheckM : undefined}
          addonRight={showAddonRightLink2 ? CheckM : undefined}
          style={{ border: '1px solid red' }}
        >
          <Link.Text>{text}</Link.Text>
        </Link>
      </Text>
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
