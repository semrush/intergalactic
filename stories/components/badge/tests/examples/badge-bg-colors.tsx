import Badge from '@semcore/ui/badge';
import type { NSBadge } from '@semcore/ui/badge';
import type { NSBox } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/base-components';
import React from 'react';

export type ExampleBadgeProps = Omit<NSBadge.Props, 'invert' | 'inverted' | 'light'> &
  NSBox.Props & {
    invert?: boolean;
    light?: boolean;
  };

const Demo = (props: ExampleBadgeProps) => {
  const variant = props.light ? { light: true as const } : { invert: props.invert || undefined };

  return (
    <Flex gap={2}>
      <Badge
        {...variant}
        type={props.type}
        bg={props.bg}
        color={props.color}
        // @ts-ignore
        w={props.w}
        // @ts-ignore
        h={props.h}
        // @ts-ignore
        pt={props.pt}
        // @ts-ignore
        m={props.m}
      >
        Badge Test
      </Badge>
    </Flex>
  );
};

export const defaultExampleBadgeProps: ExampleBadgeProps = {
  type: undefined,
  bg: undefined,
  color: undefined,
  w: undefined,
  h: undefined,
  pt: undefined,
  m: undefined,
  invert: undefined,
  light: undefined,
};

Demo.defaultProps = defaultExampleBadgeProps;
export default Demo;
