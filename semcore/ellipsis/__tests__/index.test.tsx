import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import Ellipsis from '../src';
import { Box } from '@semcore/flex-box';

const { render, axe, cleanup } = testing;

describe('Ellipsis', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = (
      <Box w={200}>
        <Ellipsis>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with multiline', async () => {
    const component = (
      <Box w={200}>
        <Ellipsis maxline={3}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Renders correctly with trim in the middle', async () => {
    const component = (
      <Box w={200}>
        <Ellipsis trim="middle">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem commodi,
          doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum tempore
          voluptas. Aliquam eos expedita illo quasi unde!
        </Ellipsis>
      </Box>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <Ellipsis>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </Ellipsis>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
