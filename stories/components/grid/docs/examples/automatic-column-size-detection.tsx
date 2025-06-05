import { Box } from '@semcore/flex-box';
import { Col, Row } from '@semcore/grid';
import React from 'react';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    padding: '16px',
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
