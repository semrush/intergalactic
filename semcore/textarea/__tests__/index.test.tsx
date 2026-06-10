import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import Textarea from '../src';

describe('textarea Dependency imports', () => {
  runDependencyCheckTests('textarea');
});

describe('Textarea', () => {
  beforeEach(cleanup);

  test('Verify supports onChange callback', async () => {
    const spyChange = vi.fn();
    const { getByTestId } = render(<Textarea data-testid='textarea' onChange={spyChange} />);
    await userEvent.type(getByTestId('textarea'), 'text');
    expect(spyChange).lastCalledWith('text', expect.any(Object));
  });
});
