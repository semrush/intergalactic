import type { BoxProps } from '@semcore/ui/base-components';
import { Box, Col, Row } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const boxProps: BoxProps = {
    p: 4,
    mb: 5,
    bg: 'bg-primary-advertising',
  };

  return (
    <>
      <Row gutter={4}>
        <Col span={12}>
          {' '}
          <Box {...boxProps} />
        </Col>

        <Col span={1}>
          {' '}
          <Box {...boxProps} />
        </Col>
        <Col span={11}>
          {' '}
          <Box {...boxProps} />
        </Col>

        <Col span={2}>
          {' '}
          <Box {...boxProps} />
        </Col>
        <Col span={10}>
          {' '}
          <Box {...boxProps} />
        </Col>

        <Col span={3}>
          {' '}
          <Box {...boxProps} />
        </Col>
        <Col span={9}>
          {' '}
          <Box {...boxProps} />
        </Col>

        <Col span={4}>
          {' '}
          <Box {...boxProps} />
        </Col>
        <Col span={8}>
          {' '}
          <Box {...boxProps} />
        </Col>

        <Col span={5}>
          {' '}
          <Box {...boxProps} />
        </Col>
        <Col span={7}>
          {' '}
          <Box {...boxProps} />
        </Col>

        <Col span={6}>
          {' '}
          <Box {...boxProps} />
        </Col>
        <Col span={6}>
          {' '}
          <Box {...boxProps} />
        </Col>
      </Row>
    </>
  );
};

export default Demo;
