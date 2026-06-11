import { Box, Col, Row, type BoxProps } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const boxProps: BoxProps = {
    p: 4,
    mb: 4,
    bg: 'bg-primary-advertising',
  };

  return (
    <>
      <Row gutter={4}>
        <Col span>
          <Box {...boxProps} />
        </Col>
        <Col span>
          <Box {...boxProps} />
        </Col>
      </Row>
      <Row gutter={4}>
        <Col span>
          <Box {...boxProps} />
        </Col>
        <Col span>
          <Box {...boxProps} />
        </Col>
        <Col span>
          <Box {...boxProps} />
        </Col>
      </Row>
    </>
  );
};

export default Demo;
