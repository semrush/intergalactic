import React from 'react';
import { Col, Row } from '@semcore/grid';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    padding: '16px',
    margin: '16px',
  };
  return (
    <>
      <Row gutter={4}>
        <Col span={12}>
          {' '}
          <Box style={styleBox} />
        </Col>

        <Col span={1}>
          {' '}
          <Box style={styleBox} />
        </Col>
        <Col span={11}>
          {' '}
          <Box style={styleBox} />
        </Col>

        <Col span={2}>
          {' '}
          <Box style={styleBox} />
        </Col>
        <Col span={10}>
          {' '}
          <Box style={styleBox} />
        </Col>

        <Col span={3}>
          {' '}
          <Box style={styleBox} />
        </Col>
        <Col span={9}>
          {' '}
          <Box style={styleBox} />
        </Col>

        <Col span={4}>
          {' '}
          <Box style={styleBox} />
        </Col>
        <Col span={8}>
          {' '}
          <Box style={styleBox} />
        </Col>

        <Col span={5}>
          {' '}
          <Box style={styleBox} />
        </Col>
        <Col span={7}>
          {' '}
          <Box style={styleBox} />
        </Col>

        <Col span={6}>
          {' '}
          <Box style={styleBox} />
        </Col>
        <Col span={6}>
          {' '}
          <Box style={styleBox} />
        </Col>
      </Row>
    </>
  );
};

export default Demo;
