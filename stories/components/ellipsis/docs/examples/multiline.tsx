import Card from '@semcore/ui/card';
import type { EllipsisProps } from '@semcore/ui/ellipsis';
import Ellipsis from '@semcore/ui/ellipsis';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: EllipsisProps) => {
  return (
    <Card w={220}>
      <Card.Header>
        <Card.Title tag='h4' inline my={0} size={300}>
          Card heading
        </Card.Title>
        <Card.Description tag='div' size={200}>
          <Ellipsis
            tag={Ellipsis}
            trim={props.trim}
            tooltip={props.tooltip}
            maxLine={props.maxLine}
          >
            Additional long card description with a lot of details about the widget
          </Ellipsis>
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Text size={300}>Card content</Text>
      </Card.Body>
    </Card>
  );
};

export const defaultProps: EllipsisProps = {
  trim: undefined,
  tooltip: undefined,
  maxLine: 2,
};

Demo.defaultProps = defaultProps;

export default Demo;
