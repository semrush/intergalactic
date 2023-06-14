import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import Textarea from '../src';

import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

describe('Textarea', () => {
  beforeEach(cleanup);

  test.concurrent('Should support size', async ({ task }) => {
    const component = (
      <>
        <Textarea size="m" />
        <Textarea size="l" />
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);

    await expect(
      await snapshot(<Textarea size="m" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot(task);

    await expect(
      await snapshot(<Textarea size="l" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support state', async ({ task }) => {
    const component = (
      <>
        <Textarea state="normal" />
        <Textarea state="valid" />
        <Textarea state="invalid" />
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support focus', async ({ task }) => {
    expect(
      await snapshot(<Textarea state="normal" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(<Textarea state="valid" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(<Textarea state="invalid" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support focus, disabled, read-only, resize', async ({ task }) => {
    const component = (
      <>
        <Textarea disabled />
        <Textarea readOnly />
        <Textarea resize="both" />
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support onChange callback', () => {
    const spyChange = vi.fn();
    const { getByTestId } = render(<Textarea data-testid={'textarea'} onChange={spyChange} />);

    fireEvent.input(getByTestId('textarea'), { target: { value: 'text' } });
    expect(spyChange).toBeCalledWith('text', expect.any(Object));
  });

  // TODO: because jsdom not supported scrollHeight and getComputedStyle
  test.skip('Should support auto height', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    const { container } = render(<Textarea aria-label="textarea" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
