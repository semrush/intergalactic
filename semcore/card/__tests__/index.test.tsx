import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import Card from '../src';

describe('Card Dependency imports', () => {
  runDependencyCheckTests('card');
});

describe('Card', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const card = (
      <Card>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
          <Card.Description>Card description</Card.Description>
        </Card.Header>
        <Card.Body>
          Card body
        </Card.Body>
      </Card>
    );

    const { container } = render(card);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});
