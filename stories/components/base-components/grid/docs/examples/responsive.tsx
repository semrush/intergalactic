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
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box {...boxProps} />
      </Col>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box {...boxProps} />
      </Col>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box {...boxProps} />
      </Col>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box {...boxProps} />
      </Col>
    </Row>
  );
};

export default Demo;
