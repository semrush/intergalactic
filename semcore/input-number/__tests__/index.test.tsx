import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import InputNumber from '../src';
import type { NSInputNumber } from '../src';

describe('input-number Dependency imports', () => {
  runDependencyCheckTests('input-number');
});

describe('InputNumber', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const inputNumber = (
      <InputNumber>
        <InputNumber.Addon />
        <InputNumber.Value />
        <InputNumber.Controls />
      </InputNumber>
    );

    const { container } = render(inputNumber);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  const focusInput = async (input: HTMLElement) => {
    await userEvent.click(input);
    expect(input).toHaveFocus();
  };

  const blurInput = async (input: HTMLElement) => {
    await focusInput(input);
    await userEvent.tab();
  };

  test.sequential('Verify controlled value keeps incomplete decimal separators before value update', async () => {
    for (const separator of ['.', ',']) {
      const spy = vi.fn();
      const ControlledInput = () => {
        const [value, setValue] = React.useState('');

        return (
          <InputNumber>
            <InputNumber.Value
              data-testid='controlled-input'
              value={value}
              onChange={(nextValue, event) => {
                spy(nextValue, event);
                setValue(nextValue ?? '');
              }}
            />
          </InputNumber>
        );
      };

      const { getByTestId, unmount } = render(<ControlledInput />);
      const input = getByTestId('controlled-input') as HTMLInputElement;

      await focusInput(input);
      await userEvent.keyboard(separator);
      expect(input.value).toBe('.');
      expect(spy).not.toBeCalled();

      await userEvent.keyboard('5');
      expect(spy).lastCalledWith('.5', expect.anything());
      expect(input.value).toBe('0.5');

      unmount();
    }
  });

  test.sequential('Verify controlled value keeps minus and handles backspace on pending decimal separator', async () => {
    const minusSpy = vi.fn();
    const ControlledMinusInput = () => {
      const [value, setValue] = React.useState('');

      return (
        <InputNumber>
          <InputNumber.Value
            data-testid='controlled-minus-input'
            value={value}
            onChange={(nextValue, event) => {
              minusSpy(nextValue, event);
              setValue(nextValue ?? '');
            }}
          />
        </InputNumber>
      );
    };

    const { getByTestId, unmount } = render(<ControlledMinusInput />);
    const minusInput = getByTestId('controlled-minus-input') as HTMLInputElement;

    await focusInput(minusInput);
    await userEvent.keyboard('-');
    expect(minusInput.value).toBe('-');
    expect(minusSpy).not.toBeCalled();

    await userEvent.keyboard('2');
    expect(minusSpy).lastCalledWith('-2', expect.anything());
    expect(minusInput.value).toBe('-2');

    unmount();

    const decimalSpy = vi.fn();
    const ControlledDecimalInput = () => {
      const [value, setValue] = React.useState('');

      return (
        <InputNumber>
          <InputNumber.Value
            data-testid='controlled-decimal-input'
            value={value}
            onChange={(nextValue, event) => {
              decimalSpy(nextValue, event);
              setValue(nextValue ?? '');
            }}
          />
        </InputNumber>
      );
    };

    const { getByTestId: getDecimalByTestId } = render(<ControlledDecimalInput />);
    const decimalInput = getDecimalByTestId('controlled-decimal-input') as HTMLInputElement;

    await focusInput(decimalInput);
    await userEvent.keyboard('1.');
    expect(decimalSpy).toBeCalledTimes(1);
    expect(decimalSpy).lastCalledWith('1', expect.anything());
    expect(decimalInput.value).toBe('1.');

    await userEvent.keyboard('[Backspace]');
    expect(decimalSpy).toBeCalledTimes(1);
    expect(decimalInput.value).toBe('1');
  });

  test.sequential('Verify controlled value validates display value on blur', async () => {
    const spy = vi.fn();
    const ControlledInput = () => {
      const [value, setValue] = React.useState('');

      return (
        <>
          <InputNumber>
            <InputNumber.Value
              data-testid='controlled-validation-input'
              max={1}
              min={0}
              step={0.25}
              value={value}
              onChange={(nextValue, event) => {
                spy(nextValue, event);
                setValue(nextValue ?? '');
              }}
            />
          </InputNumber>
          <button type='button'>Outside</button>
        </>
      );
    };

    const { getByTestId } = render(<ControlledInput />);
    const input = getByTestId('controlled-validation-input') as HTMLInputElement;

    await focusInput(input);
    await userEvent.keyboard('2.2');
    expect(spy).lastCalledWith('2.2', expect.anything());
    expect(input.value).toBe('2.2');

    await userEvent.tab();
    expect(spy).lastCalledWith('1.00', expect.anything());
    expect(input.value).toBe('1.00');
  });

  test.sequential('Verify int numbers', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input1' value='' onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input1');
    await focusInput(input);
    await userEvent.keyboard('123');
    expect(spy).lastCalledWith('123', expect.anything());
  });

  test.sequential('Verify float numbers', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input2' value='' onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input2');
    await focusInput(input);
    await userEvent.keyboard('123.4');
    expect(spy).lastCalledWith('123.4', expect.anything());
  });

  test.concurrent('Verify format in int numbers', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input3' value='' onChange={spy} />
      </InputNumber>,
    );

    const input = getByTestId('input3') as HTMLInputElement;
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('12345');

    expect(spy).lastCalledWith('12345', expect.anything());
    expect(input.value).toBe('12,345');
  });

  test.sequential('Verify format in float numbers', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input4' value='' onChange={spy} />
      </InputNumber>,
    );

    const input = getByTestId('input4') as HTMLInputElement;
    await focusInput(input);
    await userEvent.keyboard('12345.4');
    expect(spy).lastCalledWith('12345.4', expect.anything());
    expect(input.value).toBe('12,345.4');
  });

  test.sequential('Verify not locale decimal separator', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input3333' value='' onChange={spy} />
      </InputNumber>,
    );

    const input = getByTestId('input3333') as HTMLInputElement;
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('12345,99');

    expect(spy).lastCalledWith('12345.99', expect.anything());
    expect(input.value).toBe('12,345.99');
  });

  test.sequential('Verify Spanish locale decimal separator', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber locale='es'>
        <InputNumber.Value data-testid='input3344' value='' onChange={spy} />
      </InputNumber>,
    );

    const input = getByTestId('input3344') as HTMLInputElement;
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('1000');

    expect(spy).lastCalledWith('1000', expect.anything());
    expect(input.value).toBe('1000');

    // in Spanish thousand's separator starts from ten-thousandths instead of thousandths.
    await userEvent.keyboard('00');

    expect(spy).lastCalledWith('100000', expect.anything());
    expect(input.value).toBe('100.000');
  });

  test.sequential('Verify format in hundredths fractions numbers', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input44' value='' onChange={spy} />
      </InputNumber>,
    );

    const input = getByTestId('input44') as HTMLInputElement;
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('0.01');

    expect(spy).toBeCalledWith('0.01', expect.anything());
    expect(input.value).toBe('0.01');
  });

  test.sequential(
    'Verify format in hundredths fractions numbers with difficult values',
    async () => {
      const spy = vi.fn();
      const { getByTestId } = render(
        <InputNumber>
          <InputNumber.Value data-testid='input4444' value='' onChange={spy} />
        </InputNumber>,
      );

      const input = getByTestId('input4444') as HTMLInputElement;
      await userEvent.keyboard('[Tab]');
      await userEvent.keyboard('1234.01');

      expect(spy).toBeCalledWith('1234.01', expect.anything());
      expect(input.value).toBe('1,234.01');
    },
  );

  test.sequential('Verify edit after delete decimal part', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input4455' value='' onChange={spy} />
      </InputNumber>,
    );

    const input = getByTestId('input4455') as HTMLInputElement;
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('123.1');

    expect(spy).toBeCalledWith('123.1', expect.anything());
    expect(input.value).toBe('123.1');

    await userEvent.keyboard('[Backspace]');
    expect(spy).toBeCalledWith('123', expect.anything());

    await userEvent.keyboard('.2');
    expect(spy).toBeCalledWith('123.2', expect.anything());
    expect(input.value).toBe('123.2');
  });

  test.sequential('Verify not accept numbers with two decimal separators', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input444' value='' onChange={spy} />
      </InputNumber>,
    );

    const input = getByTestId('input444') as HTMLInputElement;
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('0.01.');

    expect(spy).toBeCalledWith('0.01', expect.anything());
    expect(input.value).toBe('0.01');
  });

  test.sequential('Verify correct round float numbers with step less than 1', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input5' value='0.26' onChange={spy} step={0.1} />
      </InputNumber>,
    );
    const input = getByTestId('input5');
    await blurInput(input);
    expect(spy).toBeCalledWith('0.3', expect.anything());
  });

  test.sequential('Verify round float numbers with step more than 1', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input6' value='42.2' onChange={spy} step={5} />
      </InputNumber>,
    );
    const input = getByTestId('input6');
    await blurInput(input);
    expect(spy).toBeCalledWith('40', expect.anything());
  });

  test.sequential('Verify typed value keeps decimal count equal to step precision', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input-step-typed' value='' onChange={spy} step={0.01} />
      </InputNumber>,
    );

    const input = getByTestId('input-step-typed') as HTMLInputElement;
    await focusInput(input);
    await userEvent.keyboard('0.10');

    expect(spy).lastCalledWith('0.10', expect.anything());
    expect(input.value).toBe('0.10');
  });

  test.sequential('Verify typed fractional digits are limited to step precision', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input-step-limit' value='' onChange={spy} step={0.01} />
      </InputNumber>,
    );

    const input = getByTestId('input-step-limit') as HTMLInputElement;
    await focusInput(input);
    await userEvent.keyboard('0.12345');

    expect(input.value).toBe('0.12');
    expect(spy).lastCalledWith('0.12', expect.anything());
  });

  test.sequential('Verify typed fractional digits allow as many as step precision', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input-step-allow' value='' onChange={spy} step={0.0001} />
      </InputNumber>,
    );

    const input = getByTestId('input-step-allow') as HTMLInputElement;
    await focusInput(input);
    await userEvent.keyboard('0.12345');

    expect(input.value).toBe('0.1234');
    expect(spy).lastCalledWith('0.1234', expect.anything());
  });

  test.sequential(
    'Verify increment/decrement keeps decimal count equal to step precision',
    async () => {
      const spy = vi.fn();
      const { getByTestId } = render(
        <InputNumber>
          <InputNumber.Value
            data-testid='input-step-controls'
            defaultValue='0.09'
            onChange={spy}
            step={0.01}
          />
          <InputNumber.Controls data-testid='controls-step' />
        </InputNumber>,
      );
      const controls = getByTestId('controls-step');

      const arrowUp = controls.querySelectorAll('button')[0];
      await userEvent.click(arrowUp);
      expect(spy).lastCalledWith('0.10', expect.anything());

      const arrowDown = controls.querySelectorAll('button')[1];
      await userEvent.click(arrowDown);
      expect(spy).lastCalledWith('0.09', expect.anything());
    },
  );

  test.sequential('Verify not accept letters', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input7' value='' onChange={spy} />
      </InputNumber>,
    );

    const input = getByTestId('input7');
    await focusInput(input);
    await userEvent.keyboard('YOU SHELL NOT PASS');
    expect(spy).not.toBeCalled();
  });

  test.sequential('Verify not accept value which is bigger than max prop', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input8' value='100000' max={10} onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input8');
    await blurInput(input);
    expect(spy).toBeCalledWith('10', expect.anything());
  });

  test.sequential('Verify not accept value which is smaller than min prop', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input9' value='199' min={200} onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input9');
    await blurInput(input);
    expect(spy).toBeCalledWith('200', expect.anything());
  });

  test.concurrent('Verify inputs up/down buttons click', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input10' defaultValue='0' onChange={spy} />
        <InputNumber.Controls data-testid='controls' />
      </InputNumber>,
    );
    const controls = getByTestId('controls');

    const arrowUp = controls.querySelectorAll('button')[0];
    await userEvent.click(arrowUp);
    expect(spy).lastCalledWith('1', expect.anything());
    const arrowDown = controls.querySelectorAll('button')[1];
    await userEvent.click(arrowDown);
    await userEvent.click(arrowDown);
    expect(spy).lastCalledWith('-1', expect.anything());
  });

  test('Verify inputs up/down buttons click with formatted number', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input11' defaultValue='0' onChange={spy} />
        <InputNumber.Controls data-testid='controls2' />
      </InputNumber>,
    );
    const controls = getByTestId('controls2');
    const input = getByTestId('input11') as HTMLInputElement;

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('12345');

    const arrowUp = controls.querySelectorAll('button')[0];
    await userEvent.click(arrowUp);
    expect(spy).lastCalledWith('12346', expect.anything());
    const arrowDown = controls.querySelectorAll('button')[1];
    await userEvent.click(arrowDown); // 12345
    await userEvent.click(arrowDown); // 12344
    expect(spy).lastCalledWith('12344', expect.anything());
    expect(input.value).toBe('12,344');
  });

  test('Verify not accept letters after the first digits', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='input12' value='' onChange={spy} />
      </InputNumber>,
    );
    const input = getByTestId('input12') as HTMLInputElement;

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('1ytr');
    expect(input.value).toBe('1');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('1', expect.anything());
  });

  test('Verify not call onChange if the value ends with `-`', async () => {
    const spy = vi.fn();
    render(
      <InputNumber>
        <InputNumber.Value defaultValue='0' onChange={spy} />
      </InputNumber>,
    );

    await userEvent.keyboard('[Tab]');

    await userEvent.keyboard('-');
    expect(spy).not.toBeCalled();

    await userEvent.keyboard('1');
    expect(spy).lastCalledWith('-1', expect.anything());

    await userEvent.keyboard('[Backspace]');
    expect(spy).toBeCalledTimes(1);

    await userEvent.keyboard('[Backspace]');
    expect(spy).lastCalledWith('', expect.anything());
  });

  test('Verify not call onChange if the value ends with `.`', async () => {
    const spy = vi.fn();
    render(
      <InputNumber>
        <InputNumber.Value defaultValue='0' onChange={spy} />
      </InputNumber>,
    );

    await userEvent.keyboard('[Tab]');

    await userEvent.keyboard('1');
    expect(spy).lastCalledWith('1', expect.anything());

    await userEvent.keyboard('.');
    expect(spy).toBeCalledTimes(1);

    await userEvent.keyboard('2');
    expect(spy).lastCalledWith('1.2', expect.anything());

    await userEvent.keyboard('[Backspace]');
    expect(spy).lastCalledWith('1', expect.anything());

    await userEvent.keyboard('[Backspace]');
    expect(spy).lastCalledWith('', expect.anything());
    expect(spy).toBeCalledTimes(4);
  });

  test('Verify displaying the same negative value after backspace', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value defaultValue='0' onChange={spy} data-testid='input-number-value' />
      </InputNumber>,
    );

    await userEvent.keyboard('[Tab]');

    await userEvent.keyboard('-');
    expect(spy).not.toBeCalled();
    expect(getByTestId('input-number-value').getAttribute('value')).toBe('-');

    await userEvent.keyboard('1');
    expect(spy).lastCalledWith('-1', expect.anything());

    await userEvent.keyboard('[Backspace]');
    expect(spy).toBeCalledTimes(1);
    expect(getByTestId('input-number-value').getAttribute('value')).toBe('-');

    await userEvent.keyboard('1');
    expect(spy).toBeCalledTimes(1);
    expect(getByTestId('input-number-value').getAttribute('value')).toBe('-1');
  });
});

describe('InputNumber.Value numeric value type', () => {
  beforeEach(cleanup);

  const ControlledNumber = ({
    spy,
    initialValue = 0,
    ...props
  }: {
    spy: (value: NSInputNumber.ValueNumber, event?: React.SyntheticEvent<HTMLInputElement>) => void;
    initialValue?: NSInputNumber.ValueNumber;
    min?: number;
    max?: number;
    step?: number;
  }) => {
    const [value, setValue] = React.useState<NSInputNumber.ValueNumber>(initialValue);

    return (
      <InputNumber>
        <InputNumber.Value<NSInputNumber.ValueNumber>
          data-testid='numeric-input'
          value={value}
          onChange={(nextValue, event) => {
            spy(nextValue, event);
            setValue(nextValue);
          }}
          {...props}
        />
        <InputNumber.Controls data-testid='numeric-controls' />
      </InputNumber>
    );
  };

  test.sequential('Verify onChange returns a number when value is controlled as number', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<ControlledNumber spy={spy} />);
    const input = getByTestId('numeric-input') as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.keyboard('12');

    expect(spy).lastCalledWith(12, expect.anything());
    expect(typeof spy.mock.lastCall?.[0]).toBe('number');
  });

  test.sequential('Verify up/down controls return numbers in numeric mode', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<ControlledNumber spy={spy} initialValue={0} />);
    const controls = getByTestId('numeric-controls');

    const arrowUp = controls.querySelectorAll('button')[0];
    await userEvent.click(arrowUp);
    expect(spy).lastCalledWith(1, expect.anything());

    const arrowDown = controls.querySelectorAll('button')[1];
    await userEvent.click(arrowDown);
    await userEvent.click(arrowDown);
    expect(spy).lastCalledWith(-1, expect.anything());
  });

  test.sequential('Verify min/max clamping on blur returns numbers in numeric mode', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<ControlledNumber spy={spy} initialValue={199} min={200} />);
    const input = getByTestId('numeric-input');

    await userEvent.click(input);
    await userEvent.tab();

    expect(spy).lastCalledWith(200, expect.anything());
  });

  test.sequential('Verify onChange still returns a string when value is controlled as string', async () => {
    const spy = vi.fn();
    const StringControlled = () => {
      const [value, setValue] = React.useState('0');

      return (
        <InputNumber>
          <InputNumber.Value
            data-testid='string-input'
            value={value}
            onChange={(nextValue, event) => {
              spy(nextValue, event);
              setValue(nextValue ?? '');
            }}
          />
        </InputNumber>
      );
    };

    const { getByTestId } = render(<StringControlled />);
    const input = getByTestId('string-input') as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.keyboard('12');

    expect(spy).lastCalledWith('12', expect.anything());
    expect(typeof spy.mock.lastCall?.[0]).toBe('string');
  });

  test.sequential('Verify onChange payload type follows value prop type switched at runtime', async () => {
    const spy = vi.fn();
    const SwitchingInput = ({ numeric }: { numeric: boolean }) => (
      <InputNumber>
        <InputNumber.Value<any>
          data-testid='switching-input'
          value={numeric ? 1 : '1'}
          onChange={spy}
        />
      </InputNumber>
    );

    const { getByTestId, rerender } = render(<SwitchingInput numeric />);
    const input = getByTestId('switching-input') as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.keyboard('2');
    expect(spy).lastCalledWith(12, expect.anything());

    rerender(<SwitchingInput numeric={false} />);

    await userEvent.click(input);
    await userEvent.keyboard('3');
    expect(spy).lastCalledWith('13', expect.anything());
    expect(typeof spy.mock.lastCall?.[0]).toBe('string');

    rerender(<SwitchingInput numeric />);

    await userEvent.click(input);
    await userEvent.keyboard('4');
    expect(spy).lastCalledWith(14, expect.anything());
    expect(typeof spy.mock.lastCall?.[0]).toBe('number');
  });

  test.sequential('Verify onChange keeps returning numbers after the value was cleared to null', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<ControlledNumber spy={spy} initialValue={5} />);
    const input = getByTestId('numeric-input') as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.clear(input);
    expect(spy).lastCalledWith(null, expect.anything());

    await userEvent.keyboard('3');
    expect(spy).lastCalledWith(3, expect.anything());
  });

  test.sequential('Verify onChange returns numbers when the value starts as null', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<ControlledNumber spy={spy} initialValue={null} />);
    const input = getByTestId('numeric-input') as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.keyboard('7');

    expect(spy).lastCalledWith(7, expect.anything());
  });

  test.sequential('Verify pasting into an empty numeric input does not throw', async () => {
    const spy = vi.fn();
    const errors: string[] = [];
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      errors.push(String(args[0]));
    };

    const { getByTestId } = render(<ControlledNumber spy={spy} initialValue={null} step={0.1} />);
    const input = getByTestId('numeric-input') as HTMLInputElement;
    await userEvent.click(input);
    // A pasted value ending with a separator is the case that used to read `null.length`.
    await userEvent.paste('1.');

    console.error = originalError;
    expect(errors.some((error) => error.includes('reading \'length\''))).toBe(false);
    // Unlike string mode, which keeps the pending `1.`, an empty numeric input drops the separator:
    // with `prevValue === null` there is no length to compare against, so the value is committed.
    expect(spy).lastCalledWith(1, expect.anything());
  });

  test.sequential('Verify up/down controls work on an empty numeric input', async () => {
    const upSpy = vi.fn();
    const up = render(<ControlledNumber spy={upSpy} initialValue={null} />);
    await userEvent.click(up.getByTestId('numeric-controls').querySelectorAll('button')[0]);
    expect(upSpy).lastCalledWith(1, expect.anything());
    cleanup();

    const downSpy = vi.fn();
    const down = render(<ControlledNumber spy={downSpy} initialValue={null} />);
    await userEvent.click(down.getByTestId('numeric-controls').querySelectorAll('button')[1]);
    expect(downSpy).lastCalledWith(-1, expect.anything());
  });

  test.sequential('Verify decimal separator can be typed after a digit in numeric mode', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<ControlledNumber spy={spy} initialValue={1} step={0.1} />);
    const input = getByTestId('numeric-input') as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.keyboard('.');
    expect(input.value).toBe('1.');

    await userEvent.keyboard('5');
    expect(input.value).toBe('1.5');
    expect(spy).lastCalledWith(1.5, expect.anything());
  });

  // The separator is compared against `prevValue.toString().length`, so a thousands-separated
  // display value must survive the round trip back into a number.
  test.sequential('Verify decimal separator can be typed after a formatted numeric value', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<ControlledNumber spy={spy} initialValue={12345} step={0.1} />);
    const input = getByTestId('numeric-input') as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.keyboard('.5');

    expect(input.value).toBe('12,345.5');
    expect(spy).lastCalledWith(12345.5, expect.anything());
  });

  test.sequential('Verify decimal separator typed as the first character is accepted in numeric mode', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<ControlledNumber spy={spy} initialValue={null} step={0.1} />);
    const input = getByTestId('numeric-input') as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.keyboard('.5');

    expect(input.value).toBe('0.5');
    expect(spy).lastCalledWith(0.5, expect.anything());
  });

  test.sequential('Verify controls produce fractional values in numeric mode', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(<ControlledNumber spy={spy} initialValue={1} step={0.1} />);
    const controls = getByTestId('numeric-controls');

    await userEvent.click(controls.querySelectorAll('button')[0]);

    expect(spy).lastCalledWith(1.1, expect.anything());
  });

  test.sequential('Verify uncontrolled input without value prop stays in string mode', async () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <InputNumber>
        <InputNumber.Value data-testid='uncontrolled-input' defaultValue='0' onChange={spy} />
      </InputNumber>,
    );

    const input = getByTestId('uncontrolled-input');
    await userEvent.click(input);
    await userEvent.keyboard('7');

    expect(typeof spy.mock.lastCall?.[0]).toBe('string');
  });
});
