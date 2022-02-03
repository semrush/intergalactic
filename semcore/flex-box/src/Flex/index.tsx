import React, { HTMLAttributes } from 'react';
import { createBaseComponent, Merge } from '@semcore/core';
import useFlex, { IFlexProps } from './useFlex';

function Flex(props, ref) {
  const [Tag, flexProps] = useFlex(props, ref);
  return <Tag {...flexProps} />;
}

Flex.displayName = 'Flex';

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
export default createBaseComponent<Merge<IFlexProps, HTMLAttributes<HTMLDivElement>>>(Flex);
