import { createBaseComponent, type Intergalactic } from '@semcore/core';
import React from 'react';

import useBox, { type BoxProps } from './useBox';

function Box(props: any, ref: any) {
  const [Tag, boxProps] = useBox(props, ref);
  if (Array.isArray(Tag)) {
    const [FirstTag, htmlTag] = Tag;
    return <FirstTag {...boxProps} tag={htmlTag} />;
  }

  return <Tag {...boxProps} />;
}

Box.displayName = 'Box';

/**
 * Box
 *
 * {@link https://developer.semrush.com/intergalactic/layout/box-system/box-system-api|Docs}
 */
export default createBaseComponent(Box) as any as Intergalactic.Component<'div', BoxProps>;
