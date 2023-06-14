import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach } from 'vitest';
const { cleanup } = testing;

import ProductHead, { Info, Title } from '../src';

describe('ProductHead', () => {
  afterEach(cleanup);

  const component = (
    <ProductHead>
      <ProductHead.Row>
        <div>Breadcrumbs</div>

        <ProductHead.Links>
          <span>Link</span>
          <span>Link</span>
          <span>Link</span>
        </ProductHead.Links>
      </ProductHead.Row>

      <ProductHead.Row>
        <Title toolName="Tool Name for:">Domain.com</Title>

        <ProductHead.Buttons>
          <span>Button</span>
          <span>Button</span>
          <span>Button</span>
        </ProductHead.Buttons>
      </ProductHead.Row>

      <ProductHead.Row>
        <Info>
          <Info.Item label="Location:">United States</Info.Item>
          <Info.Item label="Device:">Desktop</Info.Item>
          <Info.Item label="Data:">Fresh</Info.Item>
          <Info.Item>
            <Info.Item.Label>Last update:</Info.Item.Label>1 hour ago
          </Info.Item>
        </Info>
      </ProductHead.Row>
    </ProductHead>
  );

  test('Render correctly', async () => {
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Render correctly for tablet', async () => {
    expect(await snapshot(component, { width: 766 })).toMatchImageSnapshot();
  });
});

describe('Title', () => {
  afterEach(cleanup);

  test('Renders correctly if not enough space', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: '200px' }}>
        <Title>Tool Name for: Domain.com</Title>
        <Title toolName="Tool Name for:">Domain.com</Title>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly Title.Tool', async () => {
    const component = (
      <Title>
        <Title.Tool>Tool Name for:</Title.Tool>
      </Title>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('Info', () => {
  afterEach(cleanup);

  test('Renders correctly when item alone', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Info>
          <Info.Item label="Location:">United States</Info.Item>
        </Info>
        <Info>
          <Info.Item>
            <Info.Item.Label>Location:</Info.Item.Label>United States
          </Info.Item>
        </Info>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly when items two', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Info>
          <Info.Item label="Location:">United States</Info.Item>
          <Info.Item>
            <Info.Item.Label>Location:</Info.Item.Label>United States
          </Info.Item>
        </Info>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
