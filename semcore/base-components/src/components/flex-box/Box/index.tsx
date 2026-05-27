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

type BoxComponent = Intergalactic.Component<'div', BoxProps>;

export default createBaseComponent<BoxComponent>(Box);
