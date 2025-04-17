import React from 'react';
import ReactDOM from 'react-dom';
import { snapshot } from '@semcore/testing-utils/snapshot';
import {
  expect,
  test,
  describe,
  beforeEach,
  vi,
  it,
  afterEach,
} from '@semcore/testing-utils/vitest';
import { cleanup, renderHook, act } from '@semcore/testing-utils/testing-library';

import isNode from '../src/utils/isNode';
import compose from '../src/utils/compose';
import useCss from '../src/utils/use/useCss';
import { shade, opacity } from '../src/utils/color';
import assignProps, { assignHandlers } from '../src/utils/assignProps';
import EventEmitter from '../src/utils/eventEmitter';
import reactToText from '../src/utils/reactToText';
import { getEventTarget } from '../src/utils/getEventTarget';
import { extractAriaProps } from '../src/utils/ariaProps';
import { getRef, setRef, getNodeByRef } from '../src/utils/ref';
import getInputProps, { inputProps } from '../src/utils/inputProps';
import propsForElement, { validAttr } from '../src/utils/propsForElement';
import keyboardFocusEnhance, {
  KeyboardFocusEnhanceHook,
} from '../src/utils/enhances/keyboardFocusEnhance';
import { isFocusable } from '../src/utils/focus-lock/isFocusable';
import { BEFORE_BORDER_ID, AFTER_BORDER_ID } from '../src/utils/focus-lock/focusBorders';

describe('Utils CSS in JS', () => {
  beforeEach(cleanup);

  test.concurrent('Verify Utils assignProps other prop', () => {
    const result1 = assignProps(
      {
        test: 1,
      },
      {
        test: 2,
      },
    );
    const result2 = assignProps(
      {
        test: 1,
      },
      {},
    );
    const result3 = assignProps(
      {},
      {
        test: 2,
      },
    );
    const result4 = assignProps(
      {
        test: undefined,
      },
      {
        test: 2,
      },
    );
    // first obj overwrite second obj
    expect(result1.test).toEqual(1);
    expect(result2.test).toEqual(1);
    expect(result3.test).toEqual(2);
    // first obj overwrite second obj by key
    expect(result4.test).toEqual(undefined);
  });

  test.concurrent('Verify Utils assignProps style', () => {
    const result1 = assignProps(
      {
        style: {
          margin: 1,
          paddingTop: 1,
        },
      },
      {
        style: {
          margin: 2,
          paddingBottom: 1,
        },
      },
    );

    const result2 = assignProps(
      {
        style: {},
      },
      {
        style: {
          margin: 2,
        },
      },
    );

    const result3 = assignProps(
      {
        style: {
          margin: 1,
        },
      },
      {
        style: {},
      },
    );

    // first obj overwrite second obj
    expect(result1.style.margin).toEqual(1);

    // style merge
    expect(result1.style.paddingTop).toEqual(1);
    expect(result1.style.paddingBottom).toEqual(1);

    expect(result2.style.margin).toEqual(2);
    expect(result3.style.margin).toEqual(1);
  });

  test.concurrent('Verify Utils assignProps className', () => {
    const result1 = assignProps(
      {
        className: 'test1',
      },
      {
        className: 'test2',
      },
    );
    const result2 = assignProps(
      {
        className: 'test1',
      },
      {},
    );
    const result3 = assignProps(
      {},
      {
        className: 'test2',
      },
    );
    const result4 = assignProps(
      {
        className: '',
      },
      {
        className: 'test2',
      },
    );
    const result5 = assignProps(
      {
        className: 'test1',
      },
      {
        className: '',
      },
    );
    // class concat
    expect(result1.className).toEqual('test1 test2');
    expect(result2.className).toEqual('test1');
    expect(result3.className).toEqual('test2');
    expect(result4.className).toEqual('test2');
    expect(result5.className).toEqual('test1');
  });

  test.concurrent('Verify Utils assignProps ref', () => {
    const spy1 = vi.fn();
    const result1 = assignProps(
      {
        ref: spy1,
      },
      {
        ref: spy1,
      },
    );

    const spy2 = vi.fn();
    const result2 = assignProps(
      {
        ref: spy2,
      },
      {},
    );

    const spy3 = vi.fn();
    const result3 = assignProps(
      {},
      {
        ref: spy3,
      },
    );

    result1.ref();
    result2.ref();
    result3.ref();
    expect(result1.ref).not.toEqual(spy1);
    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    expect(result2.ref).toEqual(spy2);
    expect(spy3).toBeCalledTimes(1);
    expect(result3.ref).toEqual(spy3);
  });

  test.concurrent('Verify Utils assignProps handler', () => {
    const spy1 = vi.fn();
    const result1 = assignProps(
      {
        onClick: spy1,
      },
      {
        onClick: spy1,
      },
    );

    const spy2 = vi.fn();
    const result2 = assignProps(
      {
        onClick: spy2,
      },
      {},
    );

    const spy3 = vi.fn();
    const result3 = assignProps(
      {},
      {
        onClick: spy3,
      },
    );

    result1.onClick();
    result2.onClick();
    result3.onClick();
    expect(result1.onClick).not.toEqual(spy1);
    expect(spy1).toBeCalledTimes(2);
    expect(spy2).toBeCalledTimes(1);
    expect(result2.onClick).toEqual(spy2);
    expect(spy3).toBeCalledTimes(1);
    expect(result3.onClick).toEqual(spy3);
  });

  test.concurrent('Verify Utils assignHandlers', () => {
    const spy1 = vi.fn();
    const result1: any = assignHandlers(
      {
        onClick: spy1,
      },
      {
        onClick: spy1,
      },
    );

    const spy2 = vi.fn();
    const result2 = assignHandlers(
      {
        onClick: spy2,
      },
      {},
    );

    const spy3 = vi.fn();
    const result3: any = assignHandlers(
      {},
      {
        onClick: spy3,
      },
    );

    result1.onClick();
    result3.onClick();
    expect(result1.onClick).not.toEqual(spy1);
    expect(spy1).toBeCalledTimes(2);
    expect(result2).toEqual({});
    expect(spy3).toBeCalledTimes(1);
    expect(result3.onClick).not.toEqual(spy3);
  });

  test.concurrent('Verufy CSS in JS', async ({ task }) => {
    const CSSJS = ({ css }: any) => {
      const className = useCss(css);
      return <div className={className} />;
    };
    const component = <CSSJS css={{ background: 'red', width: '20px', height: '20px' }} />;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('Utils isNode', () => {
  beforeEach(cleanup);

  test.concurrent('Verify false returns for invalid React elements', () => {
    const nodes = [Infinity, undefined, false, null];
    const factory = (node: any) => {
      expect(isNode(node)).toBeFalsy();
    };
    nodes.forEach((i) => factory(i));
  });

  test.concurrent('Verify false returns by default', () => {
    expect(isNode()).toBeFalsy();
  });

  test.concurrent('Verify true returns for valid React elements', () => {
    const nodes = [
      'test',
      1,
      <div>test</div>,
      [<div>test</div>, <div>test2</div>, <div>test3</div>],
    ];
    const factory = (node: any) => {
      expect(isNode(node)).toBeTruthy();
    };
    nodes.forEach((i) => factory(i));
  });
});

describe('Utils compose', () => {
  test.concurrent('Verify compose functions', () => {
    const functions = [(i: any) => `3, ${i}`, (i: any) => `2, ${i}`, (i: any) => `1, ${i}`];
    expect(compose(...functions)('go!')).toBe('3, 2, 1, go!');
  });
});

describe('Utils color', () => {
  beforeEach(cleanup);

  test.concurrent('Verify shade for empty value', () => {
    expect(shade('', -0.08)).toBe(undefined);
  });

  test('Verify no opacity for string color', () => {
    expect(opacity('green', 0.2)).toBe(undefined);
  });

  test.concurrent('Verify no opacity for hex color', () => {
    expect(opacity('#008000', 0.2)).toBe('rgba(0, 128, 0, 0.2)');
  });

  test.concurrent('Verify opacity for rgb color', () => {
    expect(opacity('rgb(0,128,0)', 0.2)).toBe('rgba(0, 128, 0, 0.2)');
  });

  test.concurrent('Verify opacity regardless of case', () => {
    expect(opacity('#9EF2C9', 0.5)).toBe('rgba(158, 242, 201, 0.5)');
    expect(opacity('#9ef2c9', 0.5)).toBe('rgba(158, 242, 201, 0.5)');
  });
});

describe('Utils reactToText', () => {
  beforeEach(cleanup);

  test.concurrent('Verify support string', () => {
    expect(reactToText('string')).toBe('string');
  });

  test.concurrent('Verify support number', () => {
    expect(reactToText(0)).toBe('0');
    expect(reactToText(1)).toBe('1');
  });

  test.concurrent('Verify support boolean', () => {
    expect(reactToText(false)).toBe('false');
    expect(reactToText(true)).toBe('true');
  });

  test.concurrent('Verify support undefined types', () => {
    expect(reactToText(undefined)).toBe('');
    expect(reactToText(null)).toBe('');
    expect(reactToText(NaN)).toBe('');
  });

  test.concurrent('Verify support array and obj', () => {
    expect(reactToText(['arr', '-', 'arr'])).toBe('arr-arr');
    expect(reactToText({} as any)).toBe('');
  });

  test.concurrent('Verify support react component', () => {
    expect(reactToText(<div>component</div>)).toBe('component');
    expect(
      reactToText(
        <>
          <span>multi</span> <span>component</span>
        </>,
      ),
    ).toBe('multi component');
  });
});

describe('Utils ref', () => {
  beforeEach(cleanup);

  test.concurrent('[getRef] support element', () => {
    const div = document.createElement('div');
    expect(getRef(div)).toBe(div);
  });

  test.concurrent('[getRef] support ref function', () => {
    const div = document.createElement('div');
    const ref = React.createRef<HTMLDivElement>();
    // @ts-ignore
    ref.current = div;
    expect(getRef(ref)).toBe(div);
  });

  test.concurrent('[getRef] support unknown', () => {
    expect(getRef(undefined as any)).toBe(null);
  });

  test.concurrent('[setRef] support ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const div = document.createElement('div');
    setRef(ref, div);
    expect(ref.current).toBe(div);
  });

  test.concurrent('[setRef] support function', () => {
    const fn = vi.fn();
    const div = document.createElement('div');
    setRef(fn, div);
    expect(fn).toHaveBeenCalledWith(div);
  });

  test.concurrent('[getNodeByRef] support function', () => {
    const div = document.createElement('div');
    const fn = vi.fn(() => div);
    // setRef(fn, div)
    expect(getNodeByRef(fn)).toBe(div);
  });

  test.concurrent('[getNodeByRef] support ref', () => {
    const div = document.createElement('div');
    const ref = React.createRef<HTMLDivElement>();
    // @ts-ignore
    ref.current = div;
    expect(getNodeByRef(ref)).toBe(div);
  });
});

describe('Enhances - keyboardFocusEnhances', () => {
  beforeEach(cleanup);

  test.concurrent(
    'Verify keyboardFocus returns keyboardFocused to false if component is disabled',
    () => {
      const enhance = keyboardFocusEnhance();

      const { result, rerender } = renderHook<
        ReturnType<KeyboardFocusEnhanceHook>,
        { disabled: boolean }
      >(enhance, { initialProps: { disabled: false } });

      act(() => {
        // @ts-ignore
        result.current.onFocus({});
      });

      expect(result.current.keyboardFocused).toBe(true);

      rerender({ disabled: true });

      expect(result.current.keyboardFocused).toBe(false);

      rerender({ disabled: false });

      expect(result.current.keyboardFocused).toBe(false);
    },
  );
});

describe('extractAriaProps', () => {
  test('Verify extract all aria attributes', () => {
    const props = {
      title: 'Test Title',
      'aria-label': 'Test Label',
      'aria-labelledby': 'label-id',
      'aria-describedby': 'desc-id',
      otherProp: 'ignored',
    };
    const result = extractAriaProps(props);

    expect(result).toEqual({
      __excludeProps: ['title', 'aria-label', 'aria-labelledby', 'aria-describedby'],
      extractedAriaProps: {
        title: 'Test Title',
        'aria-label': 'Test Label',
        'aria-labelledby': 'label-id',
        'aria-describedby': 'desc-id',
      },
    });
  });

  test('Verify extract only available aria attributes', () => {
    const props = {
      'aria-label': 'Test Label',
      otherProp: 'ignored',
    };
    const result = extractAriaProps(props);

    expect(result).toEqual({
      __excludeProps: ['title', 'aria-label', 'aria-labelledby', 'aria-describedby'],
      extractedAriaProps: {
        'aria-label': 'Test Label',
      },
    });
  });

  test('Verify return empty extractedAriaProps for empty input', () => {
    const result = extractAriaProps({});

    expect(result).toEqual({
      __excludeProps: ['title', 'aria-label', 'aria-labelledby', 'aria-describedby'],
      extractedAriaProps: {},
    });
  });
});

describe('assignHandlers', () => {
  test('Verify merge event handlers from source and props', () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();

    const props = { onClick: mockFn1 };
    const source = { onClick: mockFn2 };

    const result = assignHandlers(props, source);

    expect(typeof result.onClick).toBe('function');

    result.onClick();
    expect(mockFn1).toHaveBeenCalled();
    expect(mockFn2).toHaveBeenCalled();
  });
});

describe('assignProps', () => {
  test('Verify merge className correctly', () => {
    const props = { className: 'class1' };
    const source = { className: 'class2' };

    const result = assignProps(props, source);

    expect(result.className).toContain('class1');
    expect(result.className).toContain('class2');
  });

  test('Verify merge styles correctly', () => {
    const props = { style: { color: 'red' } };
    const source = { style: { backgroundColor: 'blue' } };

    const result = assignProps(props, source);

    expect(result.style.color).toBe('red');
    expect(result.style.backgroundColor).toBe('blue');
  });

  test('Verify preserve event handlers', () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();

    const props = { onClick: mockFn1 };
    const source = { onClick: mockFn2 };

    const result = assignProps(props, source);

    expect(typeof result.onClick).toBe('function');

    result.onClick();
    expect(mockFn1).toHaveBeenCalled();
    expect(mockFn2).toHaveBeenCalled();
  });
});

describe('EventEmitter', () => {
  test('Verify call subscribed function when event is emitted', () => {
    const emitter = new EventEmitter();
    const handler = vi.fn();

    emitter.subscribe('testEvent', handler);
    emitter.emit('testEvent');

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('Verify pass arguments to the event handler', () => {
    const emitter = new EventEmitter();
    const handler = vi.fn();

    emitter.subscribe('dataEvent', handler);
    emitter.emit('dataEvent', 'hello', 42);

    expect(handler).toHaveBeenCalledWith('hello', 42);
  });

  test('Verify allow multiple subscribers to receive the event', () => {
    const emitter = new EventEmitter();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    emitter.subscribe('multiEvent', handler1);
    emitter.subscribe('multiEvent', handler2);
    emitter.emit('multiEvent');

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  test('Verify not call the handler after unsubscribing', () => {
    const emitter = new EventEmitter();
    const handler = vi.fn();
    const unsubscribe = emitter.subscribe('testEvent', handler);

    unsubscribe(); // Отписываемся
    emitter.emit('testEvent');

    expect(handler).not.toHaveBeenCalled();
  });

  test('Verify not fail when emitting an event with no subscribers', () => {
    const emitter = new EventEmitter();

    expect(() => emitter.emit('nonexistentEvent')).not.toThrow();
  });
});

describe('getEventTarget', () => {
  test('Verify return event.target when composedPath does not exist', () => {
    const event = {
      target: 'targetElement',
      composedPath: vi.fn().mockReturnValue([]), // Mocking composedPath as an empty array
    } as unknown as React.SyntheticEvent;

    const result = getEventTarget(event);
    expect(result).toBe('targetElement');
  });

  test('Verify return first element of composedPath if no shadowRoot', () => {
    const event = {
      composedPath: vi.fn().mockReturnValue([{ someProperty: 'pathElement' }]), // Mocking a non-DOM element
    } as unknown as React.SyntheticEvent;

    const result = getEventTarget(event);
    expect(result).toEqual({ someProperty: 'pathElement' }); // Should return the first element
  });

  test('Verify return element with shadowRoot from composedPath', () => {
    const shadowRootElement = { shadowRoot: {} } as HTMLElement;
    const event = {
      composedPath: vi.fn().mockReturnValue([shadowRootElement, 'otherElement']),
    } as unknown as React.SyntheticEvent;

    const result = getEventTarget(event);
    expect(result).toBe(shadowRootElement);
  });

  test('Verify return event.target when composedPath is undefined', () => {
    const event = {
      target: 'targetElement',
      composedPath: vi.fn().mockReturnValue(undefined), // Mocking composedPath as undefined
    } as unknown as React.SyntheticEvent;

    const result = getEventTarget(event);
    expect(result).toBe('targetElement');
  });

  test('Verify handle nativeEvent with composedPath correctly', () => {
    const shadowRootElement = { shadowRoot: {} } as HTMLElement;
    const event = {
      nativeEvent: {
        composedPath: vi.fn().mockReturnValue([shadowRootElement, 'nativeOtherElement']),
      },
    } as unknown as React.SyntheticEvent;

    const result = getEventTarget(event);
    expect(result).toBe(shadowRootElement);
  });

  test('Verify return event.target when nativeEvent does not have composedPath', () => {
    const event = {
      target: 'targetElement',
      nativeEvent: {}, // No composedPath in nativeEvent
    } as unknown as React.SyntheticEvent;

    const result = getEventTarget(event);
    expect(result).toBe('targetElement');
  });
});

describe('getInputProps', () => {
  test('Verify correctly separate props that exist in inputProps from other props', () => {
    const props = {
      autoFocus: true,
      checked: false,
      customProp: 'custom',
      onChange: () => {},
      onBlur: () => {},
      dataCustom: 'data-custom',
    };

    const [includedProps, excludedProps] = getInputProps(props);

    // Check if props in inputProps are included in the first result
    expect(includedProps).toEqual({
      autoFocus: true,
      checked: false,
      onChange: expect.any(Function),
      onBlur: expect.any(Function),
    });

    // Check if props not in inputProps are excluded correctly
    expect(excludedProps).toEqual({
      customProp: 'custom',
      dataCustom: 'data-custom',
    });
  });

  test('Verify handle aria-* props if allAriaPropsToControl is true', () => {
    const props = {
      'aria-label': 'label',
      'aria-hidden': 'true',
      customProp: 'custom',
    };

    const [includedProps, excludedProps] = getInputProps(props, [], true);

    // Aria props should be included
    expect(includedProps).toEqual({
      'aria-label': 'label',
      'aria-hidden': 'true',
    });

    // Non-aria props should be excluded
    expect(excludedProps).toEqual({
      customProp: 'custom',
    });
  });

  test('Verify default to using the inputProps list if no propsList is provided', () => {
    const props = {
      autoFocus: true,
      customProp: 'custom',
    };

    const [includedProps, excludedProps] = getInputProps(props);

    // autoFocus should be included as it is in the inputProps list
    expect(includedProps).toEqual({
      autoFocus: true,
    });

    // customProp should be excluded as it is not in inputProps
    expect(excludedProps).toEqual({
      customProp: 'custom',
    });
  });

  test('Verofy handle an empty props object gracefully', () => {
    const props = {};

    const [includedProps, excludedProps] = getInputProps(props);

    // Both included and excluded props should be empty
    expect(includedProps).toEqual({});
    expect(excludedProps).toEqual({});
  });

  test('Verify include all the required props from the inputProps array', () => {
    const requiredProps = [
      'autoFocus',
      'autoComplete',
      'defaultChecked',
      'checked',
      'disabled',
      'name',
      'type',
      'value',
      'defaultValue',
      'id',
      'indeterminate',
      'required',
      'onInvalid',
      'onChange',
      'onFocus',
      'onBlur',
      'onKeyDown',
      'onKeyPress',
      'onKeyUp',
      'tabIndex',
      'data-ui-name',
      'inputMode',
    ];

    // Ensure that the inputProps array contains all the required props
    requiredProps.forEach((prop) => {
      expect(inputProps).toContain(prop);
    });

    const props = requiredProps.reduce((acc: { [key: string]: string }, prop) => {
      acc[prop] = 'test'; // Assigning dummy values for each prop
      return acc;
    }, {});

    const [includedProps, excludedProps] = getInputProps(props);

    //all required props are correctly included in the result
    requiredProps.forEach((prop) => {
      expect(includedProps).toHaveProperty(prop, 'test');
    });

    // no other props are present in includedProps
    expect(Object.keys(includedProps).length).toBe(requiredProps.length);

    // excludedProps is empty as we only used requiredProps in this test
    expect(excludedProps).toEqual({});
  });
});

describe('propsForElement', () => {
  test('Verify return valid attributes for allowed props', () => {
    const props = {
      className: 'test-class',
      onClick: () => {},
      id: 'button-id',
    };

    const result = propsForElement(props);
    expect(result).toHaveProperty('className', 'test-class');
    expect(result).toHaveProperty('onClick');
    expect(result).toHaveProperty('id', 'button-id');
  });

  test('Verify exclude __excludeProps from the result', () => {
    const props = {
      className: 'test-class',
      __excludeProps: ['className'],
      onClick: () => {},
    };

    const result = propsForElement(props);
    expect(result).not.toHaveProperty('className');
    expect(result).toHaveProperty('onClick');
  });

  test('Verify allow custom attributes starting with x-, data-, or aria-', () => {
    const props = {
      'x-custom-attribute': 'value',
      'data-custom-attribute': 'value',
      'aria-label': 'label',
    };

    const result = propsForElement(props);
    expect(result).toHaveProperty('x-custom-attribute', 'value');
    expect(result).toHaveProperty('data-custom-attribute', 'value');
    expect(result).toHaveProperty('aria-label', 'label');
  });

  test('Verify return false for invalid attributes', () => {
    const props = {
      invalidAttr: 'value',
    };

    const result = propsForElement(props);
    expect(result).not.toHaveProperty('invalidAttr');
  });
});

describe('validAttr function', () => {
  test('Verify allow attributes starting with x-, data-, or aria-', () => {
    expect(validAttr('x-custom-attribute')).toBe(true);
    expect(validAttr('data-custom-attribute')).toBe(true);
    expect(validAttr('aria-label')).toBe(true);
  });

  test('Verify not allow invalid attributes', () => {
    expect(validAttr('invalidAttr')).toBe(false);
  });

  test('Verify allow standard allowed attributes', () => {
    expect(validAttr('className')).toBe(true);
    expect(validAttr('onClick')).toBe(true);
  });
});

describe('isFocusable', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('Verify return false if the element is not an HTMLElement or SVGElement', () => {
    const nonElementNode = document.createTextNode('text');
    const result = isFocusable(nonElementNode);
    expect(result).toBe(false);
  });

  test('Verify return false if the element is disabled', () => {
    element.setAttribute('disabled', 'true');
    const result = isFocusable(element);
    expect(result).toBe(false);
  });

  test('Verify return false if the element has tabindex="-1"', () => {
    element.setAttribute('tabindex', '-1');
    const result = isFocusable(element);
    expect(result).toBe(false);
  });

  test('Verify return false if the element is hidden', () => {
    element.setAttribute('hidden', 'true');
    const result = isFocusable(element);
    expect(result).toBe(false);
  });

  test('Verify return false if the element has data-id matching BEFORE_BORDER_ID', () => {
    element.setAttribute('data-id', BEFORE_BORDER_ID);
    const result = isFocusable(element);
    expect(result).toBe(false);
  });

  test('Verify return false if the element has data-id matching AFTER_BORDER_ID', () => {
    element.setAttribute('data-id', AFTER_BORDER_ID);
    const result = isFocusable(element);
    expect(result).toBe(false);
  });

  test('Verify return true if the element is a focusable tag', () => {
    const button = document.createElement('BUTTON');
    const result = isFocusable(button);
    expect(result).toBe(true);
  });

  test('Verify return true if the element has a focusable attribute (e.g., href)', () => {
    const link = document.createElement('A');
    link.setAttribute('href', '#');
    const result = isFocusable(link);
    expect(result).toBe(true);
  });

  test('Verify return true if the element has contenteditable attribute', () => {
    element.setAttribute('contenteditable', 'true');
    const result = isFocusable(element);
    expect(result).toBe(true);
  });

  test('Verify return false if the element is hidden with CSS', () => {
    element.style.display = 'none';
    const result = isFocusable(element);
    expect(result).toBe(false);
  });

  test('Verify return true if the element is visible and focusable', () => {
    const input = document.createElement('INPUT');
    const result = isFocusable(input);
    expect(result).toBe(true);
  });
});
