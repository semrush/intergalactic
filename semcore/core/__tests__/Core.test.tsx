import React, { HTMLAttributes } from 'react';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, fireEvent, render } from '@semcore/testing-utils/testing-library';

const { shouldSupportRef } = sharedTests;
import { createComponent, createBaseComponent, Component, IComponentProps } from '../src';

import { CORE_COMPONENT } from '../src/core-types/symbols';

/*
 * - control/uncontrollprops
 * - Root
 * - Children
 * - getProps
 * - data-ui-name
 * - bindHandler
 * - default props
 * - enhance
 * - hoistProps
 * - inheritedName
 * - assainProps
 * - assain function
 * - style
 * - createBase
 * -
 * */

class RootTestClass extends Component<IComponentProps<{ test: 'test' }>> {
  static displayName = 'RootTestClass';

  getItemProps() {
    return { test: 'test' };
  }

  render() {
    const { Root } = this;
    return <Root render='div' />;
  }
}

class ChildrenTestClass extends Component<IComponentProps<{}>> {
  static displayName = 'ChildrenTestClass';

  render() {
    const { Root } = this;
    return <Root render='div' />;
  }
}

function RootTestFunc(props: any) {
  const { Root } = props;
  return <Root render='div' />;
}

RootTestFunc.displayName = 'RootTestFunc';

function ChildrenTestFunc(props: any) {
  const { Root } = props;
  return <Root render='div' />;
}

ChildrenTestFunc.displayName = 'ChildrenTestFunc';

type CompType = HTMLAttributes<HTMLDivElement>;
type ItemType = { Item: HTMLAttributes<HTMLDivElement> };

function shouldSupportRender(RootComponent: any, typeRootComponent: any) {
  test(`Should support just render ${typeRootComponent}`, () => {
    const Test = createComponent<CompType>(RootComponent);
    const { getByTestId } = render(<Test data-testid='core'>test</Test>);
    expect(getByTestId('core').innerHTML).toBe('test');
  });
}

function shouldSupportRenderChildrenRoot(
  RootComponent: any,
  ChildrenComponent: any,
  description: any,
) {
  test(`Should support render children root ${description}`, () => {
    const Item = createComponent<ItemType['Item']>(ChildrenComponent);
    const Test = createComponent<CompType, ItemType>(RootComponent, { Item });
    const { getByTestId } = render(
      <Test>
        <Test.Item data-testid='core'>test</Test.Item>
      </Test>,
    );
    expect(getByTestId('core').innerHTML).toBe('test');
  });
}

function shouldSupportChildren(ChildrenComponent: any, typeChildrenComponent: any) {
  test(`Should support children components ${typeChildrenComponent}`, () => {
    const Test = createComponent<CompType, ItemType>(RootTestClass, {
      Item: ChildrenComponent,
    });

    expect(Test.Item).not.toBeNull();
    expect(Test.Item.displayName).toBe(`${Test.displayName}.Item`);
  });
}

function shouldSupportCallEnhance(RootComponent: any, typeRootComponent: any) {
  test(`Should support call static enhance in Root ${typeRootComponent}`, () => {
    const spy = vi.fn();
    const enhance = (props: any) => {
      spy(props);
      return props;
    };
    RootComponent.enhance = [enhance];
    const Test = createComponent(RootComponent);
    render(<Test />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
}

function shouldSupportCallEnhanceWithProps(RootComponent: any, typeRootComponent: any) {
  test(`Should support call enhance with props and data-ui-name in ${typeRootComponent}`, () => {
    const spy = vi.fn();
    const props = {
      children: 'test',
      'data-testid': 'core',
    };
    const enhance = (props: any) => {
      spy(props);
      return props;
    };
    RootComponent.enhance = [enhance];
    const Test = createComponent(RootComponent);
    render(<Test {...props} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      ...props,
      'data-ui-name': RootComponent.displayName,
    });
  });
}

describe('Core', () => {
  beforeEach(cleanup);

  shouldSupportRender(RootTestClass, 'Class');
  shouldSupportRender(RootTestFunc, 'Function');

  shouldSupportRenderChildrenRoot(RootTestClass, ChildrenTestClass, 'Root Class inside Root Class');
  shouldSupportRenderChildrenRoot(
    RootTestClass,
    ChildrenTestFunc,
    'Root Function inside Root Class',
  );
  shouldSupportRenderChildrenRoot(RootTestFunc, RootTestClass, 'Root Class inside Root Function');
  shouldSupportRenderChildrenRoot(
    RootTestFunc,
    ChildrenTestFunc,
    'Root Function inside Root Function',
  );

  shouldSupportRef(createComponent(RootTestClass));

  shouldSupportCallEnhance(RootTestClass, 'Class');
  shouldSupportCallEnhance(RootTestFunc, 'Function');

  shouldSupportCallEnhanceWithProps(RootTestClass, 'Class');
  shouldSupportCallEnhanceWithProps(RootTestFunc, 'Function');

  shouldSupportChildren(ChildrenTestClass, 'Class');
  shouldSupportChildren(ChildrenTestFunc, 'Function');

  test('Should support custom props name', () => {
    const Test = createComponent(RootTestClass);
    const TestWithChildren = createComponent(RootTestClass, {
      Item: ChildrenTestFunc,
    }) as any;
    const { getByTestId } = render(
      <>
        <Test data-testid='test' name='test' />
        <TestWithChildren>
          <TestWithChildren.Item data-testid='testWithChildren' name='test' />
        </TestWithChildren>
      </>,
    );
    expect((getByTestId('test').attributes as any)['name'].value).toBe('test');
    expect((getByTestId('testWithChildren').attributes as any)['name'].value).toBe('test');
  });

  test('Should support set data-ui-name', () => {
    const InheritTest = createComponent(RootTestClass);

    class TestClass extends Component {
      static displayName = 'TestClass';

      render() {
        const { Root } = this;
        return <Root render={InheritTest} />;
      }
    }

    const Test = createComponent(TestClass);

    const { queryByTestId } = render(<Test data-testid='test' />);
    expect((queryByTestId('test')?.attributes as any)['data-ui-name'].value).toBe('TestClass');
  });

  test('Should support optimization function in getter method', () => {
    const spy = vi.fn();

    class TestRoot extends Component {
      static displayName = 'TestRoot';

      bindHandlerClick = (value: any, a: any, b: any, c: any) => (e: any) => {};

      getItemProps({ value }: any) {
        return {
          onClick: this.bindHandlerClick(value, 'a', 'b', 'c'),
        };
      }

      render() {
        const { Root } = this;
        return <Root render='div' />;
      }
    }

    class TestChildren extends Component {
      render() {
        const { Root } = this;
        spy();
        return <Root render='div' />;
      }
    }

    const Test = createComponent(TestRoot, {
      Item: TestChildren,
    }) as any;

    const { rerender } = render(
      <Test>
        <Test.Item value={1} />
      </Test>,
    );
    rerender(
      <Test>
        <Test.Item value={1} />
      </Test>,
    );
    expect(spy).toBeCalledTimes(1);
    rerender(
      <Test>
        <Test.Item value={2} />
      </Test>,
    );
    expect(spy).toBeCalledTimes(2);
  });
});

describe('Root', () => {
  beforeEach(cleanup);

  test('Should set props', () => {
    class TestRoot extends Component {
      static displayName = 'Test';

      render() {
        const { Root } = this;
        return (
          <div>
            <Root data-testid={'root'} render={'div'} />
          </div>
        );
      }
    }

    const Test = createComponent(TestRoot);
    const { queryByTestId } = render(<Test id='test' />);

    expect(queryByTestId('root')?.id).toBe('test');
  });
  test('Should support assign props', () => {
    class TestRoot extends Component {
      static displayName = 'Test';

      render() {
        const { Root } = this;
        return (
          <Root
            data-testid={'root'}
            render={'div'}
            id='root-test'
            className='root-test'
            style={{
              left: '5px',
              padding: '5px',
            }}
            onClick={() => spyClick('root-test')}
            ref={(node: any) => spyRef(node)}
          />
        );
      }
    }

    const spyClick = vi.fn();
    const spyRef = vi.fn();
    const Test = createComponent(TestRoot);
    const { queryByTestId } = render(
      <Test
        id='test'
        className='test'
        style={{
          padding: '10px',
          margin: '10px',
        }}
        onClick={() => spyClick('test')}
        ref={(node) => spyRef(node)}
      />,
    );
    fireEvent.click(queryByTestId('root')!);

    expect(queryByTestId('root')!.id).toBe('test');
    expect(queryByTestId('root')!.className).toBe('test root-test');
    expect(queryByTestId('root')!.style).toMatchObject({
      left: '5px',
      padding: '10px',
      margin: '10px',
    });
    expect(spyClick.mock.calls[0][0]).toBe('test');
    expect(spyClick.mock.calls[1][0]).toBe('root-test');
    expect(spyRef.mock.calls[0][0].nodeName).toBe('DIV');
    expect(spyRef.mock.calls[1][0].nodeName).toBe('DIV');
  });
});

describe('Controll/Uncontroll mode', () => {
  test('Should support create prop with name and handler in uncontroll mode', () => {
    const spy = vi.fn();

    class RootTestClass extends Component<IComponentProps<{}>> {
      static defaultProps = {
        defaultValue: 5,
      };

      uncontrolledProps() {
        return { value: null };
      }

      render() {
        const { Root } = this;
        spy(this.asProps.value, this.asProps.onChange);
        return <Root render='div' />;
      }
    }

    const Test = createComponent(RootTestClass);
    render(<Test />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(RootTestClass.defaultProps.defaultValue, expect.anything());
  });
  test('Should support set everything value and call it in handler uncontroll mode', () => {
    const spy = vi.fn();

    class RootTestClass extends Component<IComponentProps<{}>> {
      static defaultProps = {
        defaultValue: '',
      };

      uncontrolledProps() {
        return { value: [(e: any) => e.currentTarget.value, (value: any) => spy(value)] };
      }

      render() {
        const { Root } = this;
        return <Root render='textarea' />;
      }
    }

    const Test = createComponent(RootTestClass);
    const { getByTestId } = render(<Test data-testid='textarea' />);
    const TextareaDom = getByTestId('textarea');
    fireEvent.change(TextareaDom, { target: { value: 'test' } });

    expect(spy).toHaveBeenCalledWith('test');
  });
});

describe('Getter props function', () => {
  test('Should support move props from Root in Children Class', () => {
    class RootTestClass extends Component {
      static displayName = 'Test';

      getItemProps() {
        return { test: 'test' };
      }

      render() {
        const { Root } = this;
        return <Root render='div' />;
      }
    }

    class ChildrenTestClass extends Component {
      render() {
        const { Root } = this;
        // @ts-ignore
        spy(this.asProps.test);
        return <Root render='div' />;
      }
    }

    const spy = vi.fn();

    const Test = createComponent(RootTestClass, { Item: ChildrenTestClass }) as any;
    render(
      <Test>
        <Test.Item />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });
  test('Should support move props from Root in Children Function', () => {
    class RootTestClass extends Component {
      static displayName = 'Test';

      getItemProps() {
        return { test: 'test' };
      }

      render() {
        const { Root } = this;
        return <Root render='div' />;
      }
    }

    function ChildrenTestFunc(props: any) {
      const { Root, test } = props;
      spy(test);
      return <Root render='div' />;
    }

    const spy = vi.fn();
    const Test = createComponent(RootTestClass, { Item: ChildrenTestFunc }) as any;
    render(
      <Test>
        <Test.Item />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });
  test('Should support self props in getter', () => {
    class RootTestClass extends Component {
      static displayName = 'Test';

      getItemProps(props: any) {
        spy(props.id);
      }

      render() {
        const { Root } = this;
        return <Root render='div' />;
      }
    }

    const spy = vi.fn();

    const Test = createComponent<CompType, ItemType>(RootTestClass, { Item: ChildrenTestFunc });
    render(
      <Test>
        <Test.Item id='test' />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('Should support assign props in getter', () => {
    class RootTestClass extends Component {
      static displayName = 'Test';

      getItemProps() {
        return {
          className: 'root-test',
          style: {
            left: '5px',
            padding: '5px',
          },
          onClick: () => spyClick('root-test'),
          ref: (node: any) => spyRef(node),
        };
      }

      render() {
        const { Root } = this;
        return <Root render='div' />;
      }
    }

    const spyClick = vi.fn();
    const spyRef = vi.fn();

    const Test = createComponent(RootTestClass, { Item: ChildrenTestFunc }) as any;
    const { queryByTestId } = render(
      <Test>
        <Test.Item
          data-testid='item'
          id='test'
          className='test'
          style={{
            padding: '10px',
            margin: '10px',
          }}
          onClick={() => spyClick('test')}
          ref={(node: any) => spyRef(node)}
        />
      </Test>,
    );

    fireEvent.click(queryByTestId('item')!);
    expect(queryByTestId('item')?.id).toBe('test');
    expect(queryByTestId('item')?.className).toBe('test root-test');
    expect(queryByTestId('item')?.style).toMatchObject({
      left: '5px',
      padding: '10px',
      margin: '10px',
    });
    expect(spyClick.mock.calls[0][0]).toBe('test');
    expect(spyClick.mock.calls[1][0]).toBe('root-test');
    expect(spyRef.mock.calls[0][0].nodeName).toBe('DIV');
    expect(spyRef.mock.calls[1][0].nodeName).toBe('DIV');
  });

  test('Should support index in getter', () => {
    class RootTestClass extends Component {
      static displayName = 'Test';

      getItemProps(props: any, i: any) {
        spy(i);
      }

      render() {
        const { Root } = this;
        return <Root render='div' />;
      }
    }

    const spy = vi.fn();

    const Test = createComponent<CompType, ItemType>(RootTestClass, { Item: ChildrenTestFunc });
    render(
      <Test>
        <Test.Item />
        <Test.Item />
      </Test>,
    );
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe(0);
    expect(spy.mock.calls[1][0]).toBe(1);
  });
});

describe('Hoist props', () => {
  test('Should support hoist props from Children Func to Root', () => {
    const spy = vi.fn();

    class RootComponent extends RootTestClass {
      render() {
        const { Root } = this;
        spy(this.asProps.test);
        return <Root render='div' />;
      }
    }

    function ChildrenTestFunc(props: any) {
      const { Root } = props;
      return <Root render='div' />;
    }

    ChildrenTestFunc.hoistProps = ['test'];

    const Test = createComponent(RootComponent, { Item: ChildrenTestFunc }) as any;
    render(
      <Test>
        <Test.Item test='test' />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('Should support hoist props from Children Class to Root', () => {
    const spy = vi.fn();

    class RootComponent extends RootTestClass {
      render() {
        const { Root } = this;
        spy(this.asProps.test);
        return <Root render='div' />;
      }
    }

    class ChildrenTestClass extends Component<IComponentProps<{}>> {
      static hoistProps = ['test'];

      render() {
        const { Root } = this;
        return <Root render='div' />;
      }
    }

    const Test = createComponent(RootComponent, { Item: ChildrenTestClass }) as any;
    render(
      <Test>
        <Test.Item test='test' />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('Should support rename hoist props', () => {
    const spy = vi.fn();

    class RootComponent extends RootTestClass {
      render() {
        const { Root } = this;
        spy(this.asProps.id);
        return <Root render='div' />;
      }
    }

    function ChildrenTestFunc(props: any) {
      const { Root } = props;
      return <Root render='div' />;
    }

    ChildrenTestFunc.hoistProps = ['test:id'];

    const Test = createComponent(RootComponent, { Item: ChildrenTestFunc }) as any;
    render(
      <Test>
        <Test.Item test='test' />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('Should support update hoist props', () => {
    const spy = vi.fn();

    class RootComponent extends RootTestClass {
      render() {
        const { Root } = this;
        spy(this.asProps.test);
        return <Root render='div' />;
      }
    }

    function ChildrenTestFunc(props: any) {
      const { Root } = props;
      return <Root render='div' />;
    }

    ChildrenTestFunc.hoistProps = ['test'];

    const Test = createComponent(RootComponent, { Item: ChildrenTestFunc }) as any;
    render(
      <Test>
        <Test.Item test='test' />
      </Test>,
    );
    expect(spy).toHaveBeenLastCalledWith('test');
    render(
      <Test>
        <Test.Item test='test-2' />
      </Test>,
    );
    expect(spy).toHaveBeenLastCalledWith('test-2');
  });
});

describe('Props from context', () => {
  beforeEach(cleanup);
  test('Should support props forwarding', () => {
    const Test = createComponent(RootTestClass);
    render(
      <Test custom='test'>
        {(props: any) => {
          expect(props['custom']).toBe('test');
          return null;
        }}
      </Test>,
    );
  });

  test('Should support props forwarding children and not overwrite', () => {
    const Test = createComponent(RootTestClass, {
      Item: ChildrenTestFunc,
    }) as any;
    render(
      <Test custom='test'>
        <Test.Item custom='test-overwrite' custom-child='test'>
          {(props: any) => {
            // TODO: that's not how it should work
            expect(props['custom']).toBe('test');
            expect(props['custom-child']).toBe('test');
            return null;
          }}
        </Test.Item>
      </Test>,
    );
  });

  test('Should support normal nested name getter function', () => {
    class TestRoot extends RootTestClass {
      getItemValueProps() {
        return {
          id: 'test',
        };
      }
    }

    const Test = createComponent(TestRoot, {
      Item: [ChildrenTestClass, { Value: ChildrenTestClass }],
    }) as any;

    const { getByTestId } = render(
      <Test>
        <Test.Item>
          <Test.Item.Value data-testid='value'>
            {(props: any) => {
              expect(props.id).toBe('test');
              return null;
            }}
          </Test.Item.Value>
        </Test.Item>
      </Test>,
    );
    expect(getByTestId('value').id).toBe('test');
  });
});

describe('Option "parent"', () => {
  beforeEach(cleanup);

  test('Should support parent context', () => {
    class RootTestParent extends Component<IComponentProps> {
      static defaultProps = {
        defaultValue: 5,
      };

      uncontrolledProps() {
        return { value: null };
      }

      render() {
        const { Root } = this;
        return <Root render='div' />;
      }
    }

    class RootTest extends Component<IComponentProps> {
      render() {
        const { Root } = this;
        return <Root render={TestParent} />;
      }
    }

    const TestParent = createComponent(RootTestParent);
    const Test = createComponent(
      RootTest,
      {},
      {
        parent: TestParent,
      },
    ) as any;
    render(
      <Test>
        {(props: any, handlers: any) => {
          expect(props.value).toEqual(5);
          expect(typeof handlers.value).toEqual('function');
          return null;
        }}
      </Test>,
    );
  });

  test('Should merge prop-getters for nested components', () => {
    function createMockComponent(name: any, render: any) {
      function Item(props: any) {
        const { Root } = props;
        return <Root render='div' />;
      }

      class ComponentRoot extends Component {
        static displayName = name;

        getItemProps() {
          return { [name]: name };
        }

        render() {
          const { Root } = this;
          return <Root render={render || 'div'} />;
        }
      }

      return createComponent(ComponentRoot, { Item }, { parent: render });
    }

    const First = createMockComponent('First', undefined);
    const Second = createMockComponent('Second', First);
    const Third = createMockComponent('Third', Second);

    const tests = [
      {
        Component: First,
        expected: ['First', undefined, undefined],
      },
      {
        Component: Second,
        expected: ['First', 'Second', undefined],
      },
      {
        Component: Third,
        expected: ['First', 'Second', 'Third'],
      },
    ];

    tests.forEach(({ Component, expected }) => {
      const spy = vi.fn();
      render(
        <Component>
          {({ getItemProps }: any) => {
            const { First, Second, Third } = getItemProps();
            spy(First, Second, Third);
            return 'test';
          }}
        </Component>,
      );

      expect(spy).toBeCalledWith(...expected);
    });
  });

  test('Should merge prop-getters handlers for nested components, and call em in wright order', () => {
    function createMockComponent(name: any, render: any) {
      function Item(props: any) {
        const { Root } = props;
        return <Root render='div' />;
      }

      class ComponentRoot extends Component {
        static displayName = name;

        getItemProps() {
          return {
            onClick: () => clickSpy(name),
          };
        }

        render() {
          const { Root } = this;
          return <Root render={render || 'div'} />;
        }
      }

      return createComponent(ComponentRoot, { Item }, { parent: render });
    }

    const clickSpy = vi.fn();

    const First = createMockComponent('First', undefined);
    const Second = createMockComponent('Second', First);
    const Third = createMockComponent('Third', Second);

    const component = render(
      <Third>
        {({ getItemProps }: any) => {
          const props = {
            onClick: () => clickSpy('User'),
          };
          const { onClick } = getItemProps(props);
          onClick();
          return 'test';
        }}
      </Third>,
    );
    expect(clickSpy.mock.calls[0][0]).toBe('User');
    expect(clickSpy.mock.calls[1][0]).toBe('First');
    expect(clickSpy.mock.calls[2][0]).toBe('Second');
    expect(clickSpy.mock.calls[3][0]).toBe('Third');

    component.rerender(
      <Third>
        {({ getItemProps }: any) => {
          const props = {
            onClick: () => {
              clickSpy('User');
              return false;
            },
          };
          const { onClick } = getItemProps(props);
          onClick();
          return 'test';
        }}
      </Third>,
    );
    expect(clickSpy.mock.calls.length).toBe(5);
  });
});

describe('createBaseComponent', () => {
  beforeEach(cleanup);

  function TestFuncWithRef(props: any, ref: any) {
    return <div ref={ref} {...props} />;
  }

  TestFuncWithRef.displayName = 'TestFuncWithRef';

  test('Should support symbol CORE_COMPONENT', () => {
    const Test = createBaseComponent(TestFuncWithRef);
    expect(Test[CORE_COMPONENT]).toBe(true);
  });
  test('Should support data-ui-name', () => {
    const Test = createBaseComponent(TestFuncWithRef);
    const { getByTestId } = render(<Test data-testid='test' />);
    expect(getByTestId('test').dataset.uiName).toBe(Test.displayName);
  });

  test('Should support ref', () => {
    const Test = createBaseComponent(TestFuncWithRef);
    const ref = React.createRef<HTMLDivElement>();
    render(<Test ref={ref} />);
    expect(ref.current?.nodeName).toBe('DIV');
  });
});
