import { createBaseComponent } from '@semcore/core';
import React from 'react';

import useBox, { type BoxProps } from './useBox';

function BoxForwarded(props: BoxProps, ref: any) {
  const [Tag, boxProps] = useBox(props, ref);
  if (Array.isArray(Tag)) {
    const [FirstTag, htmlTag] = Tag;
    return <FirstTag {...boxProps} tag={htmlTag} />;
  }

  return <Tag {...boxProps} />;
}

BoxForwarded.displayName = 'Box';

export const Box = createBaseComponent<'div'>(BoxForwarded);
