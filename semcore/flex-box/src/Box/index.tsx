import React from 'react';
import { Intergalactic, createBaseComponent } from '@semcore/core';
import useBox, { BoxProps } from './useBox';

function Box(props, ref) {
  const [Tag, boxProps] = useBox(props, ref);
  return <Tag {...boxProps} />;
}

Box.displayName = 'Box';

export default createBaseComponent(Box) as any as Intergalactic.Component<'div', BoxProps>;
