import React from 'react';
import { Col, Row } from '@semcore/grid';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    borderRadius: '2px',
    padding: '16px',
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
