import * as React from 'react';
import { cleanup, render, axe } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import Textarea from '../src';

describe('Textarea', () => {
  afterEach(cleanup);

  test('Should support size', async () => {
    const component = (
      <>
        <Textarea size="m" />
        <Textarea size="l" />
        <Textarea size="xl" />
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support state', async () => {
    const component = (
      <>
        <Textarea state="normal" />
        <Textarea state="valid" />
        <Textarea state="invalid" />
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support focus, disabled, read-only, resize', async () => {
    const component = (
      <>
        <Textarea autoFocus />
        <Textarea disabled />
        <Textarea readOnly />
        <Textarea resize="both" />
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  // TODO: because jsdom not supported scrollHeight and getComputedStyle
  xtest('Should support auto height', async () => {
    const component = (
      <>
        <Textarea w={200} minRows={1} maxRows={4} value={'lorem'} />
        <Textarea
          w={200}
          minRows={1}
          maxRows={4}
          value={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
        />
        <Textarea
          w={200}
          minRows={1}
          maxRows={4}
          value={
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta doloribus impedit ipsum libero maxime modi quisquam ratione repellendus? Architecto at, consectetur culpa dolor dolores illum mollitia quam quidem reiciendis voluptates.'
          }
        />
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(<Textarea aria-label="textarea" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
