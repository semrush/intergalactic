import React from 'react';
import { Col, Row } from '@semcore/ui/grid';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    borderRadius: '2px',
    padding: '16px',
  };
  return (
    <Row gutter={4}>
      <Col span={[8, 10, 6, 12]} offset={[2, 1, 0]}>
        <Box style={styleBox} />
      </Col>
      <Col span={[8, 10, 6, 12]} offset={[2, 1, 0]}>
        <Box style={styleBox} />
      </Col>
      <Col span={[8, 10, 6, 12]} offset={[2, 1, 0]}>
        <Box style={styleBox} />
      </Col>
      <Col span={[8, 10, 6, 12]} offset={[2, 1, 0]}>
        <Box style={styleBox} />
      </Col>
    </Row>
  );
};

export default Demo;
