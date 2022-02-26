import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

import { shared as testsShared } from '@semcore/jest-preset-ui';
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import { Col, Row } from '../src';
import { snapshot } from '@semcore/jest-preset-ui';

const styleBox = {
  border: '3px solid #fff',
  background: 'rgba(79, 96, 213, 0.5)',
  padding: '16px',
};

describe('Grid', () => {
  afterEach(cleanup);
  shouldSupportClassName(Row);
  shouldSupportRef(Row);

  shouldSupportClassName(Col, Row);
  shouldSupportRef(Col, Row);

  test('Should support gutter', async () => {
    const component = (
      <Row w={300} gutter={5}>
        <Col>
          <div style={styleBox}>1</div>
        </Col>
        <Col>
          <div style={styleBox}>2</div>
        </Col>
        <Col>
          <div style={styleBox}>3</div>
        </Col>
        <Col>
          <div style={styleBox}>4</div>
        </Col>
      </Row>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support auto span', async () => {
    const component = (
      <Row w={300}>
        <Col span>
          <div style={styleBox}>1</div>
        </Col>
        <Col span>
          <div style={styleBox}>2</div>
        </Col>
        <Col span>
          <div style={styleBox}>3</div>
        </Col>
        <Col span>
          <div style={styleBox}>4</div>
        </Col>
      </Row>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support span number', async () => {
    const component = (
      <Row w={200}>
        <Col span={4}>
          <div style={styleBox}>1</div>
        </Col>
        <Col span={4}>
          <div style={styleBox}>2</div>
        </Col>
        <Col span={6}>
          <div style={styleBox}>3</div>
        </Col>
        <Col span={6}>
          <div style={styleBox}>4</div>
        </Col>
      </Row>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support offset', async () => {
    const component = (
      <Row w={200}>
        <Col offset={2} span={2}>
          <div style={styleBox}>1</div>
        </Col>
        <Col offset={2} span={2}>
          <div style={styleBox}>2</div>
        </Col>
        <Col offset={1} span={5}>
          <div style={styleBox}>3</div>
        </Col>
        <Col offset={3} span={3}>
          <div style={styleBox}>4</div>
        </Col>
      </Row>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
