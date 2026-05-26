import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import Textarea from '../src';

describe('textarea Dependency imports', () => {
  runDependencyCheckTests('textarea');
});

describe('Textarea', () => {
  beforeEach(cleanup);

  shouldHaveDataUiName({
    Component: Textarea,
    expectedDataUiName: 'Textarea',
  });

  test('Verify supports onChange callback', () => {
    const spyChange = vi.fn();
    const { getByTestId } = render(<Textarea data-testid='textarea' onChange={spyChange} />);
    fireEvent.input(getByTestId('textarea'), { target: { value: 'text' } });
    expect(spyChange).toBeCalledWith('text', expect.any(Object));
  });
});
