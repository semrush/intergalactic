import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { describe, test, expect, beforeEach, vi, afterEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Badge from '../src';

describe('Badge Dependency imports', () => {
  runDependencyCheckTests('badge');
});

describe('Badge', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const badge = <Badge type='new' />;

    const { container } = render(badge);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});

describe('Badge backward compatibility (deprecated props)', () => {
  beforeEach(cleanup);

  test('Should support deprecated children prop', () => {
    const { getByText } = render(<Badge>Custom Text</Badge>);
    expect(getByText('Custom Text')).toBeInTheDocument();
  });

  test('Should prioritize type prop over children', () => {
    const { getByText, queryByText } = render(<Badge type='admin'>Custom Text</Badge>);
    expect(getByText('admin')).toBeInTheDocument();
    expect(queryByText('Custom Text')).not.toBeInTheDocument();
  });
});
