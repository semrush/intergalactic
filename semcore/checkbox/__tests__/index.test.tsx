import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Checkbox from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('Checkbox Dependency imports', () => {
  runDependencyCheckTests('checkbox');
});

describe('Checkbox', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Checkbox);
  shouldSupportRef(Checkbox);
  shouldSupportClassName(Checkbox.Value, Checkbox);
  shouldSupportRef(Checkbox.Value, Checkbox);
  shouldSupportClassName(Checkbox.Text, Checkbox);
  shouldSupportRef(Checkbox.Text, Checkbox);

  test.concurrent(
    'Verify Control has aria-label, aria-labelledby, aria-describedby from root',
    async () => {
      const { getByTestId } = render(
        <Checkbox
          aria-label='test aria label'
          aria-labelledby='test aria labelledby'
          aria-describedby='test aria describedby'
          data-testid='checkboxContainer'
        >
          <Checkbox.Value>
            <Checkbox.Value.Control data-testid='checkboxControl' />
            <Checkbox.Value.CheckMark data-testid='checkboxCheckMark' />
          </Checkbox.Value>
        </Checkbox>,
      );

      expect(getByTestId('checkboxControl')).toHaveAttribute('aria-label', 'test aria label');
      expect(getByTestId('checkboxControl')).toHaveAttribute(
        'aria-labelledby',
        'test aria labelledby',
      );
      expect(getByTestId('checkboxControl')).toHaveAttribute(
        'aria-describedby',
        'test aria describedby',
      );

      expect(getByTestId('checkboxCheckMark')).not.toHaveAttribute('aria-label', 'test aria label');
      expect(getByTestId('checkboxContainer')).not.toHaveAttribute('aria-label', 'test aria label');

      expect(getByTestId('checkboxCheckMark')).not.toHaveAttribute(
        'aria-labelledby',
        'test aria labelledby',
      );
      expect(getByTestId('checkboxContainer')).not.toHaveAttribute(
        'aria-labelledby',
        'test aria labelledby',
      );

      expect(getByTestId('checkboxCheckMark')).not.toHaveAttribute(
        'aria-describedby',
        'test aria describedby',
      );
      expect(getByTestId('checkboxContainer')).not.toHaveAttribute(
        'aria-describedby',
        'test aria describedby',
      );
    },
  );
});
