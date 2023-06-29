import React from 'react';
import ReactDOM from 'react-dom';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup } from '@semcore/testing-utils/testing-library';

import isNode from '../src/isNode';
import compose from '../src/compose';
import useCss from '../src/use/useCss';
import resolveColor, { shade, opacity } from '../src/color';
import { interpolate } from '../src/enhances/i18nEnhance';
import assignProps, { assignHandlers } from '../src/assignProps';
import reactToText from '../src/reactToText';
import { getRef, setRef, getNodeByRef } from '../src/ref';

describe('Utils CSS in JS', () => {
  beforeEach(cleanup);

  test.concurrent('Utils assignProps other prop', () => {
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

  test.concurrent('Utils assignProps style', () => {
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

  test.concurrent('Utils assignProps className', () => {
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

  test.concurrent('Utils assignProps ref', () => {
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
    expect(spy1).toBeCalledTimes(2);
    expect(spy2).toBeCalledTimes(1);
    expect(result2.ref).toEqual(spy2);
    expect(spy3).toBeCalledTimes(1);
    expect(result3.ref).toEqual(spy3);
  });

  test.concurrent('Utils assignProps handler', () => {
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

  test.concurrent('Utils assignHandlers', () => {
    const spy1 = vi.fn();
    const result1 = assignHandlers(
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
    const result3 = assignHandlers(
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

  test.concurrent('CSS in JS', async ({ task }) => {
    const CSSJS = ({ css }) => {
      const className = useCss(css);
      return <div className={className} />;
    };
    const component = <CSSJS css={{ background: 'red', width: '20px', height: '20px' }} />;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.skip('get stylesheet', async () => {
    // because nano singleton
    vi.resetModules();
    // TODO: resolve "Invalid hook call" issue
    const { default: useCss, getStylesheet, Provider } = require(`${__dirname}/../src/use/useCss`);
    const CSSJS = ({ css }) => {
      const className = useCss(css);
      return <div className={className} />;
    };
    const component = (
      /* For server render emulation */
      <Provider value={{ client: false }}>
        <CSSJS css={{ background: 'red', width: '20px', height: '20px' }} />
      </Provider>
    );

    ReactDOM.render(component, document.createElement('div'));
    expect(getStylesheet()).not.toBe('');
  });
});

describe('Utils isNode', () => {
  beforeEach(cleanup);

  test.concurrent('should return false for invalid React elements', () => {
    const nodes = [Infinity, undefined, false, null];
    const factory = (node) => {
      expect(isNode(node)).toBeFalsy();
    };
    nodes.forEach((i) => factory(i));
  });

  test.concurrent('should return false by default', () => {
    expect(isNode()).toBeFalsy();
  });

  test.concurrent('should return true for valid React elements', () => {
    const nodes = [
      'test',
      1,
      <div>test</div>,
      [<div>test</div>, <div>test2</div>, <div>test3</div>],
    ];
    const factory = (node) => {
      expect(isNode(node)).toBeTruthy();
    };
    nodes.forEach((i) => factory(i));
  });
});

describe('Utils compose', () => {
  test.concurrent('should compose functions', () => {
    const functions = [(i) => `3, ${i}`, (i) => `2, ${i}`, (i) => `1, ${i}`];
    expect(compose(...functions)('go!')).toBe('3, 2, 1, go!');
  });
});

describe('Utils color', () => {
  beforeEach(cleanup);

  test.concurrent('should support resolveColor for empty value', () => {
    expect(resolveColor(undefined)).toBe(undefined);
    expect(resolveColor('')).toBe(undefined);
    expect(resolveColor(null)).toBe(undefined);
  });

  test.concurrent('should support shade for empty value', () => {
    expect(shade('', -0.08)).toBe(undefined);
  });

  test(`shouldn't support opacity for string color`, () => {
    expect(opacity('green', 0.2)).toBe(undefined);
  });

  test.concurrent('should support opacity for hex color', () => {
    expect(opacity('#008000', 0.2)).toBe('rgba(0, 128, 0, 0.2)');
  });

  test.concurrent('should support opacity for rgb color', () => {
    expect(opacity('rgb(0,128,0)', 0.2)).toBe('rgba(0, 128, 0, 0.2)');
  });

  test.concurrent('should support opacity regardless of case', () => {
    expect(opacity('#9EF2C9', 0.5)).toBe('rgba(158, 242, 201, 0.5)');
    expect(opacity('#9ef2c9', 0.5)).toBe('rgba(158, 242, 201, 0.5)');
  });
});

describe('Utils interpolate', () => {
  test.concurrent('Should interpolate variable with equal name', () => {
    const Template = '{name}, dont turn this rape into a murder';
    expect(interpolate(Template, { name: 'Sarah' })).toBe(
      'Sarah, dont turn this rape into a murder',
    );
  });

  test.concurrent('Should interpolate more then one variable', () => {
    const Template = '{a}{b}{c}';
    expect(interpolate(Template, { a: 'A', b: 'B', c: 'C' })).toBe('ABC');
  });

  test.concurrent('Should not fail if variable for template is not specified', () => {
    const Template = '{name}, dont turn this rape into a murder';
    expect(interpolate(Template, {})).toBe(Template);
  });

  test.concurrent('Should mirror HTML tags', () => {
    const Template = '{name}';
    expect(interpolate(Template, { name: `<script>console.log('oh my!')</script>` })).toBe(
      `&lt;script&gt;console.log('oh my!')&lt;/script&gt;`,
    );
  });
});

describe('Utils reactToText', () => {
  beforeEach(cleanup);

  test.concurrent('support string', () => {
    expect(reactToText('string')).toBe('string');
  });

  test.concurrent('support number', () => {
    expect(reactToText(0)).toBe('0');
    expect(reactToText(1)).toBe('1');
  });

  test.concurrent('support boolean', () => {
    expect(reactToText(false)).toBe('false');
    expect(reactToText(true)).toBe('true');
  });

  test.concurrent('support undefined types', () => {
    expect(reactToText(undefined)).toBe('');
    expect(reactToText(null)).toBe('');
    expect(reactToText(NaN)).toBe('');
  });

  test.concurrent('support array and obj', () => {
    expect(reactToText(['arr', '-', 'arr'])).toBe('arr-arr');
    expect(reactToText({})).toBe('');
  });

  test.concurrent('support react component', () => {
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
    expect(getRef(undefined)).toBe(null);
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
