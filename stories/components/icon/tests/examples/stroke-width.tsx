import type { IconComponent } from '@semcore/icon';
import { Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';

// @ts-ignore
import { flatIconList } from '../../../../../website/docs/style/icon/icons';

type IconObj = {
  m: IconComponent;
  l: IconComponent;
};

const IconList = (props: { cl: 'bold' | 'regular' | 'custom' } & StrokeWidthProps) => {
  const icons = flatIconList() as IconObj[];

  return (
    <Flex direction='column' gap={4}>
      <Text size={400} semibold>
        {props.cl}
      </Text>
      {
        Object.entries(icons).map(([iconName, iconObj]) => {
          const Icon = iconObj.m;

          return (
            <Flex
              key={iconName}
              gap={1.5}
              alignItems='center'
              tag={Text}
              size={200}
              bold={props.cl.includes('bold')}
            >
              <Icon
                color='transparent'
                weight={props.cl !== 'custom' ? props.cl : undefined}
                strokeWidth={props.cl === 'custom' ? `${props.customWidth}px` : undefined}
              />
              {iconName}
            </Flex>
          );
        })
      }
    </Flex>
  );
};

const Demo = (props: StrokeWidthProps) => {
  return (
    <Flex gap={20}>
      <IconList key='regular' cl='regular' {...props} />
      <IconList key='bold' cl='bold' {...props} />
      <IconList key='custom' cl='custom' {...props} />
    </Flex>
  );
};

export type StrokeWidthProps = {
  regularWidth: number;
  boldWidth: number;
  customWidth: number;
};

export const defaultProps: StrokeWidthProps = {
  regularWidth: 1.5,
  boldWidth: 1.85,
  customWidth: 1.5,
};

Demo.defaultProps = defaultProps;

export default Demo;
