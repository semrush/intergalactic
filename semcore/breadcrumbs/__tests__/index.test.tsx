import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import Breadcrumbs from '../src';

describe('breadcrumbs Dependency imports', () => {
  runDependencyCheckTests('breadcrumbs');
});

describe('Breadcrumbs', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const breadcrumbs = (
      <Breadcrumbs>
        <Breadcrumbs.Item href='/'>Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href='/projects'>Projects</Breadcrumbs.Item>
        <Breadcrumbs.Item active>Current project</Breadcrumbs.Item>
      </Breadcrumbs>
    );

    const { container } = render(breadcrumbs);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});
