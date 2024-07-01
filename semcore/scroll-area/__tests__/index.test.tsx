import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;
import ScrollArea from '../src';

describe('ScrollArea', () => {
  describe('ScrollArea common', () => {
    beforeEach(cleanup);

    shouldSupportClassName(ScrollArea);
    shouldSupportRef(ScrollArea);

    test.sequential('should support render function for children', () => {
      const component = <ScrollArea>{() => <ScrollArea.Container />}</ScrollArea>;
      render(component);

      expect(
        document.querySelectorAll('[data-ui-name^="ScrollArea"][data-ui-name$="Container"]').length,
      ).toBe(1);
    });

    test.skip('should support area attributes to bar', () => {
      const { queryByTestId } = render(
        <ScrollArea h={200} w={200} shadow>
          {[...new Array(10)].map((_, i) => (
            <div key={i} style={{ width: '100px', height: '100px' }} />
          ))}
          <ScrollArea.Bar orientation='vertical' data-testid='bar' />
        </ScrollArea>,
      );
      expect((queryByTestId('bar')?.attributes as any)['aria-valuemin']).toBeTruthy();
      expect((queryByTestId('bar')?.attributes as any)['aria-valuenow']).toBeTruthy();
      expect((queryByTestId('bar')?.attributes as any)['aria-valuemax']).toBeTruthy();
    });

    test.skip('should support shadow display on container', async ({ task }) => {
      const component = (
        <ScrollArea h={200} w={200} shadow>
          {[...new Array(3)].map((_, ind) => (
            <div key={`parent-${ind}`} style={{ display: 'flex', width: '300px' }}>
              {[...new Array(3)].map((_, ind) => (
                <div key={ind} style={{ width: '100px', height: '100px' }} />
              ))}
            </div>
          ))}
        </ScrollArea>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    });
  });

  describe('ScrollArea.Container', () => {
    beforeEach(cleanup);

    shouldSupportClassName(ScrollArea.Container, ScrollArea);
    shouldSupportRef(ScrollArea.Container, ScrollArea);
  });
});
