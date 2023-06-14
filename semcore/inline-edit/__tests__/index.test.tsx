import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach } from 'vitest';
const { cleanup, axe, render } = testing;

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
  afterEach(cleanup);

  test('renders view by default', async () => {
    const component = (
      <InlineEdit>
        <InlineEdit.View>view</InlineEdit.View>
        <InlineEdit.Edit>edit</InlineEdit.Edit>
      </InlineEdit>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  /**
   * Doesn't work from the time we use `<Animation />` for animating inline-edit
   */
  test('supports edit render', async () => {
    const component = (
      <InlineEdit editable={true}>
        <InlineEdit.View tag={InstantFadeInOut}>view</InlineEdit.View>
        <InlineEdit.Edit>edit</InlineEdit.Edit>
      </InlineEdit>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('resizes edit to view', async () => {
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
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
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
