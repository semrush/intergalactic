import type { BoxProps } from '@semcore/ui/base-components';
import { Box, Col, Row } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const boxProps: BoxProps = {
    p: 4,
    mb: 4,
    bg: 'bg-primary-advertising',
  };

  return (
    <Row gutter={4}>
      <Col span={12}>
        <Box {...boxProps} />
      </Col>
      <Col span={6}>
        <Box {...boxProps} />
      </Col>
      <Col span={6}>
        <Box {...boxProps} />
      </Col>
      <Col span={3}>
        <Box {...boxProps} />
      </Col>
      <Col span={3}>
        <Box {...boxProps} />
      </Col>
      <Col span={3}>
        <Box {...boxProps} />
      </Col>
      <Col span={3}>
        <Box {...boxProps} />
      </Col>
    </Row>
  );
};

export default Demo;
