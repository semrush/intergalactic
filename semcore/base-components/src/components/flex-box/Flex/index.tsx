import { createBaseComponent, type Intergalactic } from '@semcore/core';
import React from 'react';

import useFlex, { type FlexProps } from './useFlex';

function Flex(props: any, ref: any) {
  const [Tag, flexProps] = useFlex(props, ref);
  return <Tag {...flexProps} />;
}

Flex.displayName = 'Flex';

/**
 * Flex
 *
 * {@link https://developer.semrush.com/intergalactic/layout/box-system/box-system-api|Docs}
 */
export default createBaseComponent(Flex) as any as Intergalactic.Component<'div', FlexProps>;
