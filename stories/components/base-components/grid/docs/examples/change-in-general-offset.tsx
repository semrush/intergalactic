import type { NSBox } from '@semcore/ui/base-components';
import { Box, Col, Row } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const boxProps: NSBox.Props = {
    p: 4,
    mb: 2,
    bg: 'bg-primary-advertising',
  };

  return (
    <Row gutter={4}>
      <Col offset={11} span={1}>
        <Box {...boxProps} />
      </Col>
      <Col offset={10} span={2}>
        <Box {...boxProps} />
      </Col>
      <Col offset={9} span={3}>
        <Box {...boxProps} />
      </Col>
      <Col offset={8} span={4}>
        <Box {...boxProps} />
      </Col>
      <Col offset={7} span={5}>
        <Box {...boxProps} />
      </Col>
      <Col offset={6} span={6}>
        <Box {...boxProps} />
      </Col>
      <Col offset={5} span={7}>
        <Box {...boxProps} />
      </Col>
      <Col offset={4} span={8}>
        <Box {...boxProps} />
      </Col>
      <Col offset={3} span={9}>
        <Box {...boxProps} />
      </Col>
      <Col offset={2} span={10}>
        <Box {...boxProps} />
      </Col>
      <Col offset={1} span={11}>
        <Box {...boxProps} />
      </Col>
    </Row>
  );
};

export default Demo;
