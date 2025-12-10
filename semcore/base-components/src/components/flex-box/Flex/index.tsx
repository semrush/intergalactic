import { createBaseComponent } from '@semcore/core';
import React from 'react';

import useFlex, { type FlexProps } from './useFlex';

function Flex(props: FlexProps, ref: any) {
  const [Tag, flexProps] = useFlex(props, ref);
  return <Tag {...flexProps} />;
}

Flex.displayName = 'Flex';

export default createBaseComponent<'div'>(Flex);
