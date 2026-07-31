import { Box, Col, Row } from '@semcore/ui/base-components';
import type { NSBox } from '@semcore/ui/base-components';
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
