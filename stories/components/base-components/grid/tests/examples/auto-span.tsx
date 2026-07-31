import type { NSBox } from '@semcore/ui/base-components';
import { Box, Col, Row } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const boxProps: NSBox.Props = {
    p: 4,
    mb: 4,
    bg: 'bg-primary-advertising',
  };

  return (
    <>
      <Row gutter={4}>
        <Col span>
          {' '}
          <Box {...boxProps}>1</Box>
        </Col>
        <Col span>
          {' '}
          <Box {...boxProps}>2</Box>
        </Col>
        <Col span>
          {' '}
          <Box {...boxProps}>3</Box>
        </Col>
        <Col span>
          {' '}
          <Box {...boxProps}>4</Box>
        </Col>
      </Row>
    </>
  );
};

export default Demo;
