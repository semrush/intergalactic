import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import Counter, { type NSCounter } from '@semcore/ui/counter';
import Link from '@semcore/ui/link';
import Spin, { type NSSpin } from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const EXTERNAL_HREF = 'https://developer.semrush.com/intergalactic/components/link/link-api';

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

type LinkSizesProps = {
  addonLeft: 'icon' | 'badge' | 'counter' | 'spin';
  addonRight: 'icon' | 'badge' | 'counter' | 'spin';
  ellipsis: boolean;
  active: boolean;
};

const renderAddon = (
  addon: LinkSizesProps['addonLeft'],
  size: (typeof sizes)[number],
  options: { skipBadge?: boolean },
) => {
  if (options.skipBadge && addon === 'badge') {
    return null;
  }

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

  if (addon === 'icon') {
    return (
      <Link.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</Link.Addon>
    );
  }

  if (addon === 'badge') {
    return (
      <Link.Addon>
        <Badge type='new' />
      </Link.Addon>
    );
  }

  if (addon === 'counter') {
    return (
      <Link.Addon>
        <Counter size={counterSize}>
          17
        </Counter>
      </Link.Addon>
    );
  }

  if (addon === 'spin') {
    return (
      <Link.Addon>
        <Spin size={spinSize} />
      </Link.Addon>
    );
  }

  return null;
};

const Demo = (props: LinkSizesProps) => {
  const w = 150;
  const text = 'The quick brown fox jumps over the lazy dog';

  const renderLinks = (external: boolean) => sizes.map((size) => (
    <Text key={`${external ? 'external' : 'default'}-${size}`} tag='div' size={size} mb={4}>
      {`${size} `}
      <Link
        href={external ? EXTERNAL_HREF : '#'}
        mr={4}
        active={props.active}
      >
        {renderAddon(props.addonLeft, size, { skipBadge: external })}
        <Link.Text
          w={props.ellipsis ? size < 600 ? w : w * 2 : undefined}
          ellipsis={props.ellipsis ? true : undefined}
        >
          {text}
        </Link.Text>
        {renderAddon(props.addonRight, size, { skipBadge: external })}
      </Link>
    </Text>
  ));

  return (
    <Flex direction='column'>
      {renderLinks(false)}
      {renderLinks(true)}
    </Flex>
  );
};

export const defaultLinksizesProps: LinkSizesProps = {
  addonLeft: 'icon',
  addonRight: 'badge',
  ellipsis: true,
  active: false,
};

Demo.defaultProps = defaultLinksizesProps;

export default Demo;
