import { Box, Col, Row } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const styleBox = {
    background: 'var(--intergalactic-bg-primary-advertising)',
    padding: 'var(--intergalactic-spacing-4x, 16px)',
    marginBottom: 'var(--intergalactic-spacing-2x, 8px)',
  };
  return (
    <Row gutter={4}>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box style={styleBox} />
      </Col>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box style={styleBox} />
      </Col>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box style={styleBox} />
      </Col>
      <Col span={8} md={10} sm={6} xs={12} offset={2} mdOffset={1} smOffset={0}>
        <Box style={styleBox} />
      </Col>
    </Row>
  );
};

export default Demo;
