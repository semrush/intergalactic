import Card from '@semcore/card';
import type { EllipsisProps } from '@semcore/ellipsis';
import Ellipsis from '@semcore/ellipsis';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = (props: EllipsisProps) => {
  return (
    <Card w={220}>
      <Card.Header>
        <Card.Title tag='h4' inline my={0} size={300}>
          Card heading
        </Card.Title>
        <Card.Description tag='div' size={200}>
          <Ellipsis tag={Ellipsis} trim={props.trim} tooltip={props.tooltip} maxLine={props.maxLine}>Additional long card description</Ellipsis>
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Text size={300}>Card content</Text>
      </Card.Body>
    </Card>
  );
};

export const defaultProps: EllipsisProps = {
  trim: 'end',
  tooltip: true,
  maxLine: 1,
};

Demo.defaultProps = defaultProps;

export default Demo;
