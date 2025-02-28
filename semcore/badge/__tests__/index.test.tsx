import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';

import Badge from '../src';

import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import path from 'path';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('Badge Dependency imports', () => {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const componentPath = path.resolve(__dirname, '../src/Badge.jsx');

  runDependencyCheckTests(packageJsonPath, [componentPath]);
});

describe('Badge', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <Badge>admin</Badge>;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support color', async ({ task }) => {
    const component = (
      <>
        <Badge color='white'>admin</Badge>
        <Badge color='gray20'>alpha</Badge>
        <Badge color='green'>new</Badge>
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support bg', async ({ task }) => {
    const component = (
      <>
        <Badge bg='cyan'>admin</Badge>
        <Badge bg='red'>alpha</Badge>
        <Badge bg='orange'>beta</Badge>
        <Badge bg='green'>new</Badge>
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    const { container } = render(<Badge bg='green'>new</Badge>);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
