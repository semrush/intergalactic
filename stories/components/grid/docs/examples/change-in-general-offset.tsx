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
