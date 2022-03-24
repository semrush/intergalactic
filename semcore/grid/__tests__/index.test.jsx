import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
const { cleanup } = testing;
const { shouldSupportClassName, shouldSupportRef } = testsShared;
import { Col, Row } from '../src';

const styleBox = {
  border: '3px solid #fff',
  background: 'rgba(79, 96, 213, 0.5)',
  padding: '16px 0',
  textAlign: 'center',
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
          <div style={{ ...styleBox, padding: '16px' }}>1</div>
        </Col>
        <Col>
          <div style={{ ...styleBox, padding: '16px' }}>2</div>
        </Col>
        <Col>
          <div style={{ ...styleBox, padding: '16px' }}>3</div>
        </Col>
        <Col>
          <div style={{ ...styleBox, padding: '16px' }}>4</div>
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
    const ColSpan = ({ span }) => (
      <Col span={span}>
        <div style={styleBox}>{span}</div>
      </Col>
    );
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Row w={200}>
          <ColSpan span={12} />
        </Row>
        <Row w={200}>
          <ColSpan span={1} />
          <ColSpan span={11} />
        </Row>
        <Row w={200}>
          <ColSpan span={2} />
          <ColSpan span={10} />
        </Row>
        <Row w={200}>
          <ColSpan span={3} />
          <ColSpan span={9} />
        </Row>
        <Row w={200}>
          <ColSpan span={4} />
          <ColSpan span={8} />
        </Row>
        <Row w={200}>
          <ColSpan span={5} />
          <ColSpan span={7} />
        </Row>
        <Row w={200}>
          <ColSpan span={6} />
          <ColSpan span={6} />
        </Row>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support span and offset', async () => {
    const RowCol = ({ span = '0', offset = '0' }) => (
      <Row w={200}>
        <Col span={span} offset={offset}>
          <div style={styleBox}>{`span-${span}, offset-${offset}`}</div>
        </Col>
      </Row>
    );
    const component = (
      <div style={{ width: '250px' }}>
        <snapshot.ProxyProps style={{ margin: 5 }}>
          <RowCol offset={12} />
          <RowCol span={1} offset={11} />
          <RowCol span={2} offset={10} />
          <RowCol span={3} offset={9} />
          <RowCol span={4} offset={8} />
          <RowCol span={5} offset={7} />
          <RowCol span={6} offset={6} />
          <RowCol span={7} offset={5} />
          <RowCol span={8} offset={4} />
          <RowCol span={9} offset={3} />
          <RowCol span={10} offset={2} />
          <RowCol span={11} offset={1} />
          <RowCol span={12} />
        </snapshot.ProxyProps>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support md and mdOffset', async () => {
    const RowCol = ({ md = '0', mdOffset = '0' }) => (
      <Row w={200}>
        <Col md={md} offset={mdOffset}>
          <div style={styleBox}>{`md-${md}, mdOffset-${mdOffset}`}</div>
        </Col>
      </Row>
    );
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <RowCol mdOffset={12} />
        <RowCol md={1} mdOffset={11} />
        <RowCol md={2} mdOffset={10} />
        <RowCol md={3} mdOffset={9} />
        <RowCol md={4} mdOffset={8} />
        <RowCol md={5} mdOffset={7} />
        <RowCol md={6} mdOffset={6} />
        <RowCol md={7} mdOffset={5} />
        <RowCol md={8} mdOffset={4} />
        <RowCol md={9} mdOffset={3} />
        <RowCol md={10} mdOffset={2} />
        <RowCol md={11} mdOffset={1} />
        <RowCol md={12} />
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
