import { createBaseComponent, type Intergalactic } from '@semcore/core';
import React from 'react';

import type { NSFlex } from './Flex.type';
import useFlex from './useFlex';

function Flex(props: Intergalactic.InternalTypings.InferComponentProps<NSFlex.Component>, ref: React.Ref<HTMLElement>) {
  const [Tag, flexProps] = useFlex(props, ref);
  return <Tag {...flexProps} />;
}

Flex.displayName = 'Flex';

/**
 * Flex
 *
 * {@link https://developer.semrush.com/intergalactic/layout/box-system/box-system-api|API}
 */
export default createBaseComponent<NSFlex.Component>(Flex);
