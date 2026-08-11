import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import Counter, { type NSCounter } from '@semcore/ui/counter';
import Link from '@semcore/ui/link';
import Spin, { type NSSpin } from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const sizes = [
  800,
  700,
  600,
  500,
  400,
  350,
  300,
  200,
  100,
] as const;

type AddonType = 'icon' | 'badge' | 'counter' | 'spin' | 'none';

type LinkSizesProps = {
  addonLeft: AddonType;
  addonRight: AddonType;
  ellipsis: boolean;
  active: boolean;
  use: 'primary' | 'secondary' | 'accent';
  href: string;
};

const renderAddon = (addon: AddonType, size: (typeof sizes)[number]) => {
  let spinSize: NSSpin.Size = 'm';
  if (size <= 200) {
    spinSize = 'xs';
  } else if (size <= 500) {
    spinSize = 's';
  }

  let counterSize: NSCounter.Props['size'];
  if (size >= 600) {
    counterSize = 'l';
  } else if (size >= 300) {
    counterSize = 'm';
  }

  switch (addon) {
    case 'icon':
      return <Link.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</Link.Addon>;
    case 'badge':
      return <Link.Addon><Badge type='new' /></Link.Addon>;
    case 'counter':
      return <Link.Addon><Counter size={counterSize}>17</Counter></Link.Addon>;
    case 'spin':
      return <Link.Addon><Spin size={spinSize} /></Link.Addon>;
    default:
      return null;
  }
};

const Demo = (props: LinkSizesProps) => {
  const w = 150;
  const text = 'The quick brown fox jumps over the lazy dog';

  // Link only injects the external icon for a plain string child. These links wrap their
  // text in Link.Text, so the icon is added explicitly — that is also what gives the nine
  // sizes of getExternalIconProps() their coverage.
  const isExternal = props.href.startsWith('//') || props.href.toLowerCase().startsWith('http');

  return (
    <Flex direction='column'>
      {sizes.map((size) => (
        <Text key={size} tag='div' size={size} mb={4}>
          {`${size} `}
          <Link
            href={props.href}
            use={props.use}
            mr={4}
            active={props.active}
            size={size}
          >
            {renderAddon(props.addonLeft, size)}
            <Link.Text
              w={props.ellipsis ? size < 600 ? w : w * 2 : undefined}
              ellipsis={props.ellipsis ? true : undefined}
            >
              {text}
            </Link.Text>
            {renderAddon(props.addonRight, size)}
            {isExternal && <Link.ExternalIcon />}
          </Link>
        </Text>
      ))}
    </Flex>
  );
};

export const defaultLinksizesProps: LinkSizesProps = {
  addonLeft: 'icon',
  addonRight: 'badge',
  ellipsis: true,
  active: false,
  use: 'primary',
  href: '#',
};

Demo.defaultProps = defaultLinksizesProps;

export default Demo;
