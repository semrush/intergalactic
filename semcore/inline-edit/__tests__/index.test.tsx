import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import InlineEdit from '../src';

const InstantFadeInOut: React.FC<{ children: React.ReactNode; visible: boolean }> =
  React.forwardRef((props, ref) => {
    return (
      <div ref={ref} style={{ opacity: props.visible ? 1 : 0 }}>
        {props.children}
      </div>
    );
  });

describe('InlineEdit', () => {
  beforeEach(cleanup);

  test.concurrent('renders view by default', async ({ task }) => {
    const component = (
      <InlineEdit>
        <InlineEdit.View>view</InlineEdit.View>
        <InlineEdit.Edit>edit</InlineEdit.Edit>
      </InlineEdit>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  /**
   * Doesn't work from the time we use `<Animation />` for animating inline-edit
   */
  test.concurrent('supports edit render', async ({ task }) => {
    const component = (
      <InlineEdit editable={true}>
        <InlineEdit.View tag={InstantFadeInOut}>view</InlineEdit.View>
        <InlineEdit.Edit>edit</InlineEdit.Edit>
      </InlineEdit>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('resizes edit to view', async ({ task }) => {
    const component = (
      <InlineEdit editable={true}>
        <InlineEdit.View>
          <br />
          <br />
          <br />
          <br />
          view
          <br />
          <br />
          <br />
          <br />
        </InlineEdit.View>
        <InlineEdit.Edit style={{ border: '1px solid red' }}>
          <br />
          <br />
          <br />
          edit
        </InlineEdit.Edit>
      </InlineEdit>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async ({ task }) => {
    const { container } = render(
      <InlineEdit>
        <InlineEdit.View>view</InlineEdit.View>
        <InlineEdit.Edit>edit</InlineEdit.Edit>
      </InlineEdit>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
