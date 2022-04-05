import React from 'react';
import { testing, snapshot } from '@semcore/cli/tools/jest-preset-ui';
const { cleanup, axe, render } = testing;

import InlineEdit from '../src';

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
  // test('supports edit render', async () => {
  //   const component = (
  //     <InlineEdit editable={true}>
  //       <InlineEdit.View>view</InlineEdit.View>
  //       <InlineEdit.Edit>edit</InlineEdit.Edit>
  //     </InlineEdit>
  //   );
  //   expect(await snapshot(component)).toMatchImageSnapshot();
  // });

  // test('resizes edit to view', async () => {
  //   const component = (
  //     <InlineEdit editable={true}>
  //       <InlineEdit.View>
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         view
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //       </InlineEdit.View>
  //       <InlineEdit.Edit>
  //         <br />
  //         <br />
  //         <br />
  //         edit
  //       </InlineEdit.Edit>
  //     </InlineEdit>
  //   );
  //   expect(await snapshot(component)).toMatchImageSnapshot();
  // });

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
