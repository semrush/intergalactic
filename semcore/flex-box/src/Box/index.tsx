import React, { HTMLAttributes } from 'react';
import { createBaseComponent, Merge } from '@semcore/core';
import useBox, { IBoxProps } from './useBox';

function Box(props, ref) {
  const [Tag, boxProps] = useBox(props, ref);
  return <Tag {...boxProps} />;
}

Box.displayName = 'Box';

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
export default createBaseComponent<Merge<IBoxProps, HTMLAttributes<HTMLDivElement>>>(Box);
