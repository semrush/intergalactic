import { createBaseComponent, type Intergalactic } from '@semcore/core';
import React from 'react';

import useFlex, { type FlexProps } from './useFlex';

function Flex(props: any, ref: any) {
  const [Tag, flexProps] = useFlex(props, ref);
  return <Tag {...flexProps} />;
}

Flex.displayName = 'Flex';

type FlexComponent = Intergalactic.Component<'div', FlexProps>;

export default createBaseComponent<FlexComponent>(Flex);
