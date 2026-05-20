import { Box, Col, Row } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const styleBox = {
    background: 'var(--intergalactic-bg-primary-advertising)',
    padding: 'var(--intergalactic-spacing-4x, 16px)',
    marginBottom: 'var(--intergalactic-spacing-5x, 20px)',
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
