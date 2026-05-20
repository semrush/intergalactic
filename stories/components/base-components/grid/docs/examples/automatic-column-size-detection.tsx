import { Box, Col, Row } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const styleBox = {
    background: 'var(--intergalactic-bg-primary-advertising)',
    padding: 'var(--intergalactic-spacing-4x, 16px)',
    marginBottom: 'var(--intergalactic-spacing-4x, 16px)',
  };
  return (
    <>
      <Row gutter={4}>
        <Col span>
          <Box style={styleBox} />
        </Col>
        <Col span>
          <Box style={styleBox} />
        </Col>
      </Row>
      <Row gutter={4}>
        <Col span>
          <Box style={styleBox} />
        </Col>
        <Col span>
          <Box style={styleBox} />
        </Col>
        <Col span>
          <Box style={styleBox} />
        </Col>
      </Row>
    </>
  );
};

export default Demo;
