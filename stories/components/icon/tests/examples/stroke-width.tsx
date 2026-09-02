import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import InfoM from '@semcore/icon/Info/m';
import MathPlusM from '@semcore/icon/MathPlus/m';
import SearchM from '@semcore/icon/Search/m';
import WarningM from '@semcore/icon/Warning/m';
import { Flex, Box } from '@semcore/ui/base-components';
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
    icon: InfoM,
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

const IconList = (props: { cl: string }) => (
  <Flex className={props.cl} direction='column' gap={4}>
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
            <Icon color='transparent' />
          </Flex>
        );
      })
    }

  </Flex>
);

const Demo = (props: StrokeWidthProps) => {
  return (
    <Flex gap={20}>
      <style>
        {`
          path, circle, line {
            
            stroke: #777978;

            .regular & {
              stroke-width: ${props.regularWdith}px;
            }
            .bold & {
                stroke-width: ${props.boldWdith}px;
            }
            .boldAlt & {
                stroke-width: ${props.boldAltWdith}px;
            }
          }
        `}
      </style>

      {['regular', 'bold', 'boldAlt'].map((cl) => <IconList key={cl} cl={cl} />)}

    </Flex>
  );
};

export type StrokeWidthProps = {
  regularWdith: number;
  boldWdith: number;
  boldAltWdith: number;
};

export const defaultProps: StrokeWidthProps = {
  regularWdith: 1.25,
  boldWdith: 1.75,
  boldAltWdith: 2,
};

Demo.defaultProps = defaultProps;

export default Demo;
