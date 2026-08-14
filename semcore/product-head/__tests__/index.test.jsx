import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render } from '@semcore/testing-utils/testing-library';
import { describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import ProductHead, { Info, Title } from '../src';

describe('product-head Dependency imports', () => {
  runDependencyCheckTests('product-head');
});

describe('ProductHead', () => {
  test('Verify data-ui-name', () => {
    const productHead = (
      <ProductHead>
        <ProductHead.Row>
          <Title toolName='Tool name'>Title</Title>
          <ProductHead.Buttons>Buttons</ProductHead.Buttons>
          <ProductHead.Links>Links</ProductHead.Links>
        </ProductHead.Row>
        <ProductHead.Row>
          <Info>
            <Info.Item>
              <Info.Item.Label>Label</Info.Item.Label>
              Content
            </Info.Item>
          </Info>
        </ProductHead.Row>
      </ProductHead>
    );

    const { container } = render(productHead);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});
