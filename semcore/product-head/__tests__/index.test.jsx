import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup } from '@semcore/testing-utils/testing-library';

import ProductHead, { Info, Title } from '../src';

describe('ProductHead', () => {
  beforeEach(cleanup);

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
        <Title toolName='Tool Name for:'>Domain.com</Title>

        <ProductHead.Buttons>
          <span>Button</span>
          <span>Button</span>
          <span>Button</span>
        </ProductHead.Buttons>
      </ProductHead.Row>

      <ProductHead.Row>
        <Info>
          <Info.Item label='Location:'>United States</Info.Item>
          <Info.Item label='Device:'>Desktop</Info.Item>
          <Info.Item label='Data:'>Fresh</Info.Item>
          <Info.Item>
            <Info.Item.Label>Last update:</Info.Item.Label>1 hour ago
          </Info.Item>
        </Info>
      </ProductHead.Row>
    </ProductHead>
  );

  test.concurrent('Render correctly', async ({ task }) => {
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Render correctly for tablet', async ({ task }) => {
    await expect(await snapshot(component, { width: 766 })).toMatchImageSnapshot(task);
  });
});

describe('Title', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly if not enough space', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: '200px' }}>
        <Title>Tool Name for: Domain.com</Title>
        <Title toolName='Tool Name for:'>Domain.com</Title>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly Title.Tool', async ({ task }) => {
    const component = (
      <Title>
        <Title.Tool>Tool Name for:</Title.Tool>
      </Title>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('Info', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly when item alone', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Info>
          <Info.Item label='Location:'>United States</Info.Item>
        </Info>
        <Info>
          <Info.Item>
            <Info.Item.Label>Location:</Info.Item.Label>United States
          </Info.Item>
        </Info>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly when items two', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <Info>
          <Info.Item label='Location:'>United States</Info.Item>
          <Info.Item>
            <Info.Item.Label>Location:</Info.Item.Label>United States
          </Info.Item>
        </Info>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
