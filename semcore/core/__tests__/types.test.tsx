import type { Intergalactic } from '../src';
import { test, describe, assertType } from '@semcore/testing-utils/vitest';
import * as React from 'react';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('Core Dependency imports', () => {
  runDependencyCheckTests('core');
});

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
      <Button xProp1={1}>{(_props: { xProp1: 1; xContextProp2: 2 }) => any}</Button>,
    );
    assertType<JSX.Element>(
      <Button xProp1={1}>
        {/* @ts-expect-error */}
        {(_props: { xProp1: 1; xContextProp2: 2; xProp3: 3 }) => any}
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
      <Button xProp1={1}>{(_props, _handlers: { xAdditionalContextProp3: 3 }) => any}</Button>,
    );
    assertType<JSX.Element>(
      <Button xProp1={1}>
        {/* @ts-expect-error */}
        {(_props, _handlers: { xAdditionalContextProp3: 'string' }) => any}
      </Button>,
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
          _props,
          _handlers: { xAdditionalContextProp3: 3 },
          _handlers2: { xAdditionalContextProp4: 4 },
        ) => any}
      </Button>,
    );
    assertType<JSX.Element>(
      <Button xProp1={1}>
        {/* @ts-expect-error */}
        {(
          _props,
          _handlers: { xAdditionalContextProp3: 3 },
          _handlers2: { xAdditionalContextProp4: '4' },
        ) => any}
      </Button>,
    );
  });
  test('value&change', () => {
    type PillsValue = string | number | boolean | null;
    type PillsProps<T extends PillsValue = PillsValue> = {
      onChange?:
        | ((value: T, e?: React.SyntheticEvent<HTMLSpanElement>) => void)
        | React.Dispatch<React.SetStateAction<T>>;

      value?: T;

      xProp2: 2;
    };

    type IntergalacticPillsComponent<BaseTag extends Intergalactic.Tag> = (<
      Value extends PillsValue,
      Tag extends Intergalactic.Tag = BaseTag,
    >(
      props: Intergalactic.InternalTypings.ComponentProps<Tag, BaseTag, PillsProps<Value>>,
    ) => Intergalactic.InternalTypings.ComponentRenderingResults) &
      Intergalactic.InternalTypings.ComponentAdditive<BaseTag, BaseTag, PillsProps>;

    const Link: Intergalactic.Component<'a', { xProp1: 1 }> = any;
    const Pills: IntergalacticPillsComponent<'div'> = any;

    assertType<JSX.Element>(<Link href='https://google.com' xProp1={1} />);
    assertType<JSX.Element>(<Pills xProp2={2} />);
    assertType<JSX.Element>(<Pills tag={Link} href='https://google.com' xProp1={1} xProp2={2} />);
    assertType<JSX.Element>(<Pills tag={Link} xProp1={1} xProp2={2} />);

    // @ts-expect-error
    assertType<JSX.Element>(<Link hrefXX='https://google.com' xProp1={1} />);
    // @ts-expect-error
    assertType<JSX.Element>(<Pills href='https://google.com' xProp2={2} />);
    // @ts-expect-error
    assertType<JSX.Element>(<Pills tag={Link} xProp2={2} />);
    // @ts-expect-error
    assertType<JSX.Element>(<Pills tag={Link} xProp1={1} />);

    assertType<JSX.Element>(<Pills xProp2={2} value={1} onChange={(_value: number) => {}} />);
    // @ts-expect-error
    assertType<JSX.Element>(<Pills xProp2={2} value={1} onChange={(_value: string) => {}} />);

    assertType<JSX.Element>(
      <Pills tag={Link} xProp1={1} xProp2={2} value={1} onChange={(_value: number) => {}} />,
    );
    assertType<JSX.Element>(
      // @ts-expect-error
      <Pills tag={Link} xProp1={1} xProp2={2} value={1} onChange={(_value: string) => {}} />,
    );
  });
});
