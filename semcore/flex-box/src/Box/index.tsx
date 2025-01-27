import React from 'react';
import { type Intergalactic, createBaseComponent } from '@semcore/core';
import useBox, { type BoxProps } from './useBox';

function Box(props: any, ref: any) {
  const [Tag, boxProps] = useBox(props, ref);
  return <Tag {...boxProps} />;
}

Box.displayName = 'Box';

export default createBaseComponent(Box) as any as Intergalactic.Component<'div', BoxProps>;
