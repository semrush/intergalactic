import Badge from '@semcore/ui/badge';
import type { BadgeProps } from '@semcore/ui/badge';
import type { BoxProps } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';
type ExampleBadgeProps = BadgeProps & BoxProps;

const Demo = (props: ExampleBadgeProps) => {
  return (
    <Flex gap={2}>
      <Badge bg={props.bg} color={props.color} w={props.w} h={props.h} pt={props.pt} m={props.m}>Badge Test</Badge>
    </Flex>
  );
};

export const defaultExampleBadgeProps: ExampleBadgeProps = {
  bg: undefined,
  color: undefined,
  w: undefined,
  h: undefined,
  pt: undefined,
  m: undefined,
};

Demo.defaultProps = defaultExampleBadgeProps;
export default Demo;
