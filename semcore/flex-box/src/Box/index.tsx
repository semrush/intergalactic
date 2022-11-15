import React from 'react';
import { createBaseComponent } from '@semcore/core';
import useBox, { IBoxProps } from './useBox';

function Box(props, ref) {
  const [Tag, boxProps] = useBox(props, ref);
  return <Tag {...boxProps} />;
}

Box.displayName = 'Box';

export default createBaseComponent(Box) as <T>(props: IBoxProps & T) => React.ReactElement;
