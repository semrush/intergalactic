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
      <Col offset={11} span={1}>
        <Box style={styleBox} />
      </Col>
      <Col offset={10} span={2}>
        <Box style={styleBox} />
      </Col>
      <Col offset={9} span={3}>
        <Box style={styleBox} />
      </Col>
      <Col offset={8} span={4}>
        <Box style={styleBox} />
      </Col>
      <Col offset={7} span={5}>
        <Box style={styleBox} />
      </Col>
      <Col offset={6} span={6}>
        <Box style={styleBox} />
      </Col>
      <Col offset={5} span={7}>
        <Box style={styleBox} />
      </Col>
      <Col offset={4} span={8}>
        <Box style={styleBox} />
      </Col>
      <Col offset={3} span={9}>
        <Box style={styleBox} />
      </Col>
      <Col offset={2} span={10}>
        <Box style={styleBox} />
      </Col>
      <Col offset={1} span={11}>
        <Box style={styleBox} />
      </Col>
    </Row>
  );
};

export default Demo;
