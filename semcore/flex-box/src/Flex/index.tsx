import React from 'react';
import { createBaseComponent } from '@semcore/core';
import useFlex, { IFlexProps } from './useFlex';

function Flex(props, ref) {
  const [Tag, flexProps] = useFlex(props, ref);
  return <Tag {...flexProps} />;
}

Flex.displayName = 'Flex';

export default createBaseComponent(Flex) as <T>(props: IFlexProps & T) => React.ReactElement;
