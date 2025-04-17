import React from 'react';
import { createBaseComponent, Intergalactic } from '@semcore/core';
import useBox, { BoxProps } from './useBox';

function Box(props: any, ref: any) {
  const [Tag, boxProps] = useBox(props, ref);
  return <Tag {...boxProps} />;
}

Box.displayName = 'Box';

export default createBaseComponent(Box) as any as Intergalactic.Component<'div', BoxProps>;
