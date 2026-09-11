import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import InfoM from '@semcore/icon/Info/m';
import MathPlusM from '@semcore/icon/MathPlus/m';
import SearchM from '@semcore/icon/Search/m';
import WarningM from '@semcore/icon/Warning/m';
import { Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const icons = [
  {
    text: 'Keywords',
    icon: InfoM,
  },
  {
    text: 'Limit reached',
    icon: WarningM,
  },
  {
    text: 'Keywords',
    icon: SearchM,
  },
  {
    text: 'Keywords',
    icon: MathPlusM,
  },
  {
    text: 'Keywords',
    icon: CloseM,
  },
  {
    text: 'Keywords',
    icon: CheckM,
  },
];

const IconList = (props: { cl: 'bold' | 'regular' | 'custom' } & StrokeWidthProps) => {
  return (
    <Flex direction='column' gap={4}>
      <Text size={400} semibold>
        {props.cl}
      </Text>

      {
        icons.map((el, ind) => {
          const Icon = el.icon;
          return (
            <Flex
              key={ind}
              gap={1}
              tag={Text}
              size={200}
              alignItems='center'
              bold={props.cl.includes('bold')}
            >
              {el.text}
              <Icon color='transparent' weight={props.cl !== 'custom' ? props.cl : undefined} strokeWidth={props.cl === 'custom' ? `${props.customWidth}px` : undefined} />
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
