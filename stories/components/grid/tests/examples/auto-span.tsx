import React from 'react';
import { Col, Row } from '@semcore/grid';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const styleBox = {
    border: '3px solid #fff',
    background: 'rgba(79, 96, 213, 0.5)',
    padding: '16px',
    margin: '16px'
  };
  return (
    <>
     
    <Row  gutter={4} >
    <Col span>  <Box style={styleBox}>1</Box></Col>
    <Col span>  <Box style={styleBox}>2</Box></Col>
    <Col span>  <Box style={styleBox}>3</Box></Col>
    <Col span>  <Box style={styleBox}>4</Box></Col>
  </Row>

  </>
  );
};

export default Demo;
