import * as React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import Textarea from '../src';

const { cleanup, fireEvent, render, axe } = testing;

describe('Textarea', () => {
  afterEach(cleanup);

  test('Should support size', async () => {
    const component = (
      <>
        <Textarea size="m" />
        <Textarea size="l" />
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();

    expect(
      await snapshot(<Textarea size="m" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot();

    expect(
      await snapshot(<Textarea size="l" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot();
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

  test('Should support focus', async () => {
    expect(
      await snapshot(<Textarea state="normal" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(<Textarea state="valid" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(<Textarea state="invalid" id="textarea" />, {
        actions: {
          focus: '#textarea',
        },
      }),
    ).toMatchImageSnapshot();
  });

  test('Should support focus, disabled, read-only, resize', async () => {
    const component = (
      <>
        <Textarea disabled />
        <Textarea readOnly />
        <Textarea resize="both" />
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support onChange callback', () => {
    const spyChange = jest.fn();
    const { getByTestId } = render(<Textarea data-testid={'textarea'} onChange={spyChange} />);

    fireEvent.input(getByTestId('textarea'), { target: { value: 'text' } });
    expect(spyChange).toBeCalledWith('text', expect.any(Object));
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
