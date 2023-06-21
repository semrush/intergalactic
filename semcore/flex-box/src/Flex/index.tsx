import React from 'react';
import { Intergalactic, createBaseComponent } from '@semcore/core';
import useFlex, { FlexProps } from './useFlex';

function Flex(props, ref) {
  const [Tag, flexProps] = useFlex(props, ref);
  return <Tag {...flexProps} />;
}

Flex.displayName = 'Flex';

export default createBaseComponent(Flex) as any as Intergalactic.Component<'div', FlexProps>;
