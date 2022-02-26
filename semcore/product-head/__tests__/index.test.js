import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

import { snapshot } from '@semcore/jest-preset-ui';
import ProductHead, { Info, Title } from '../src';

describe('ProductHead', () => {
  afterEach(cleanup);

  test('Render', async () => {
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

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
