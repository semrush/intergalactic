import { createBaseComponent, type Intergalactic } from '@semcore/core';
import React from 'react';

import type { NSBox } from './Box.type';
import useBox from './useBox';

function Box(props: Intergalactic.InternalTypings.InferComponentProps<NSBox.Component>, ref: React.Ref<HTMLElement>) {
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
 * {@link https://developer.semrush.com/intergalactic/layout/box-system/box-system-api|API}
 */
export default createBaseComponent<NSBox.Component>(Box);
