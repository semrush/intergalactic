import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup } from '@semcore/testing-utils/testing-library';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import { Col, Row } from '../src';

const styleBox = {
  border: '3px solid #fff',
  background: 'rgba(79, 96, 213, 0.5)',
  padding: '16px 0',
  textAlign: 'center',
};

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('grid Dependency imports', () => {
  runDependencyCheckTests('grid');
});

describe('Grid', () => {
  beforeEach(cleanup);
  shouldSupportClassName(Row);
  shouldSupportRef(Row);

  shouldSupportClassName(Col, Row);
  shouldSupportRef(Col, Row);

  test.concurrent('Should support auto span', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support span number', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
