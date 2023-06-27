import type { Intergalactic } from '../src';
import { test, describe, assertType, expectTypeOf } from '@semcore/testing-utils/vitest';
import * as React from 'react';

describe('Core types', () => {
  const any: any = null;
  test('Props Nesting', () => {
    const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;
    const Button: Intergalactic.Component<'button', { xProp2: 2 }> = any;

    assertType<JSX.Element>(<Link href='https://google.com' xProp1={1} />);
    assertType<JSX.Element>(<Button xProp2={2} />);
    assertType<JSX.Element>(<Button tag={Link} href='https://google.com' xProp1={1} xProp2={2} />);
    assertType<JSX.Element>(<Button tag={Link} xProp1={1} xProp2={2} />);

    // @ts-expect-error
    assertType<JSX.Element>(<Link hrefXX='https://google.com' xProp1={1} />);
    // @ts-expect-error
    assertType<JSX.Element>(<Button href='https://google.com' xProp2={2} />);
    // @ts-expect-error
    assertType<JSX.Element>(<Button tag={Link} xProp2={2} />);
    // @ts-expect-error
    assertType<JSX.Element>(<Button tag={Link} xProp1={1} />);
  });
  test('Context', () => {
    const Button: Intergalactic.Component<'button', { xProp1: 1 }, { xContextProp2: 2 }> = any;

    assertType<JSX.Element>(
      <Button xProp1={1}>{(props: { xProp1: 1; xContextProp2: 2 }) => any}</Button>,
    );
    assertType<JSX.Element>(
      <Button xProp1={1}>
        {/* @ts-expect-error */}
        {(props: { xProp1: 1; xContextProp2: 2; xProp3: 3 }) => any}
      </Button>,
    );
  });
  test('Additional Context', () => {
    const Button: Intergalactic.Component<
      'button',
      { xProp1: 1 },
      { xContextProp2: 2 },
      [xAdditionalContext: { xAdditionalContextProp3: 3 }]
    > = any;

    assertType<JSX.Element>(
      <Button xProp1={1}>{(props, handlers: { xAdditionalContextProp3: 3 }) => any}</Button>,
    );
    assertType<JSX.Element>(
      // @ts-expect-error
      <Button xProp1={1}>{(props, handlers: { xAdditionalContextProp3: 'string' }) => any}</Button>,
    );
  });
  test('More Additional Context', () => {
    const Button: Intergalactic.Component<
      'button',
      { xProp1: 1 },
      { xContextProp2: 2 },
      [
        xAdditionalContext: { xAdditionalContextProp3: 3 },
        xAdditionalContext2: { xAdditionalContextProp4: 4 },
      ]
    > = any;

    assertType<JSX.Element>(
      <Button xProp1={1}>
        {(
          props,
          handlers: { xAdditionalContextProp3: 3 },
          handlers2: { xAdditionalContextProp4: 4 },
        ) => any}
      </Button>,
    );
    assertType<JSX.Element>(
      <Button xProp1={1}>
        {/* @ts-expect-error */}
        {(
          props,
          handlers: { xAdditionalContextProp3: 3 },
          handlers2: { xAdditionalContextProp4: '4' },
        ) => any}
      </Button>,
    );
  });
});
