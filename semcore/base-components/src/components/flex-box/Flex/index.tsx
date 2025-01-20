import React from 'react';
import { createBaseComponent, Intergalactic } from '@semcore/core';
import useFlex, { FlexProps } from './useFlex';

function Flex(props: any, ref: any) {
  const [Tag, flexProps] = useFlex(props, ref);
  return <Tag {...flexProps} />;
}

Flex.displayName = 'Flex';

export default createBaseComponent(Flex) as any as Intergalactic.Component<'div', FlexProps>;
