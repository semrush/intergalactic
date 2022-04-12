import React, { HTMLAttributes } from 'react';
import { testing, shared as testsShared } from '@semcore/jest-preset-ui';

const { cleanup, fireEvent, render } = testing;

const { shouldSupportRef } = testsShared;
import createComponent, {
  createBaseComponent,
  Component,
  IComponentProps,
  CORE_COMPONENT,
} from '../src';

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
    return <Root render="div" />;
  }
}

class ChildrenTestClass extends Component<IComponentProps<{}>> {
  static displayName = 'ChildrenTestClass';

  render() {
    const { Root } = this;
    return <Root render="div" />;
  }
}

function RootTestFunc(props) {
  const { Root } = props;
  return <Root render="div" />;
}

RootTestFunc.displayName = 'RootTestFunc';

function ChildrenTestFunc(props) {
  const { Root } = props;
  return <Root render="div" />;
}

ChildrenTestFunc.displayName = 'ChildrenTestFunc';

type CompType = HTMLAttributes<HTMLDivElement>;
type ItemType = { Item: HTMLAttributes<HTMLDivElement> };

function shouldSupportRender(RootComponent, typeRootComponent) {
  test(`should support just render ${typeRootComponent}`, () => {
    const Test = createComponent<CompType>(RootComponent);
    const { getByTestId } = render(<Test data-testid="core">test</Test>);
    expect(getByTestId('core').innerHTML).toBe('test');
  });
}

function shouldSupportRenderChildrenRoot(RootComponent, ChildrenComponent, description) {
  test(`should support render ${description}`, () => {
    const Item = createComponent<ItemType['Item']>(ChildrenComponent);
    const Test = createComponent<CompType, ItemType>(RootComponent, { Item });
    const { getByTestId } = render(
      <Test>
        <Test.Item data-testid="core">test</Test.Item>
      </Test>,
    );
    expect(getByTestId('core').innerHTML).toBe('test');
  });
}

function shouldSupportChildren(ChildrenComponent, typeChildrenComponent) {
  test(`should support children components ${typeChildrenComponent}`, () => {
    const Test = createComponent<CompType, ItemType>(RootTestClass, {
      Item: ChildrenComponent,
    });

    expect(Test.Item).not.toBeNull();
    expect(Test.Item.displayName).toBe(Test.displayName + '.Item');
  });
}

function shouldSupportCallEnhance(RootComponent, typeRootComponent) {
  test(`should support call static enhance in Root ${typeRootComponent}`, () => {
    const spy = jest.fn();
    const enhance = (props) => {
      spy(props);
      return props;
    };
    RootComponent.enhance = [enhance];
    const Test = createComponent(RootComponent);
    render(<Test />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
}

function shouldSupportCallEnhanceWithProps(RootComponent, typeRootComponent) {
  test(`should support call enhance with props and data-ui-name in ${typeRootComponent}`, () => {
    const spy = jest.fn();
    const props = {
      children: 'test',
      'data-testid': 'core',
    };
    const enhance = (props) => {
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
  afterEach(cleanup);

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

  test('should support custom props name', () => {
    const Test = createComponent(RootTestClass);
    const TestWithChildren = createComponent(RootTestClass, {
      Item: ChildrenTestFunc,
    }) as any;
    const { getByTestId } = render(
      <>
        <Test data-testid="test" name="test" />
        <TestWithChildren>
          <TestWithChildren.Item data-testid="testWithChildren" name="test" />
        </TestWithChildren>
      </>,
    );
    expect(getByTestId('test').attributes['name'].value).toBe('test');
    expect(getByTestId('testWithChildren').attributes['name'].value).toBe('test');
  });

  test('should support set data-ui-name', () => {
    const InheritTest = createComponent(RootTestClass);

    class TestClass extends Component {
      static displayName = 'TestClass';

      render() {
        const { Root } = this;
        return <Root render={InheritTest} />;
      }
    }

    const Test = createComponent(TestClass);

    const { queryByTestId } = render(<Test data-testid="test" />);
    expect(queryByTestId('test').attributes['data-ui-name'].value).toBe('TestClass');
  });

  test('should support optimization function in getter method', () => {
    const spy = jest.fn();

    class TestRoot extends Component {
      static displayName = 'TestRoot';

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      bindHandlerClick = (value, a, b, c) => (e) => {};

      getItemProps({ value }) {
        return {
          onClick: this.bindHandlerClick(value, 'a', 'b', 'c'),
        };
      }

      render() {
        const { Root } = this;
        return <Root render="div" />;
      }
    }

    class TestChildren extends Component {
      render() {
        const { Root } = this;
        spy();
        return <Root render="div" />;
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
  test('should set props', () => {
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
    const { queryByTestId } = render(<Test id="test" />);

    expect(queryByTestId('root').id).toBe('test');
  });
  test('should support assign props', () => {
    class TestRoot extends Component {
      static displayName = 'Test';

      render() {
        const { Root } = this;
        return (
          <Root
            data-testid={'root'}
            render={'div'}
            id="root-test"
            className="root-test"
            style={{
              left: '5px',
              padding: '5px',
            }}
            onClick={() => spyClick('root-test')}
            ref={(node) => spyRef(node)}
          />
        );
      }
    }

    const spyClick = jest.fn();
    const spyRef = jest.fn();
    const Test = createComponent(TestRoot);
    const { queryByTestId } = render(
      <Test
        id="test"
        className="test"
        style={{
          padding: '10px',
          margin: '10px',
        }}
        onClick={() => spyClick('test')}
        ref={(node) => spyRef(node)}
      />,
    );
    fireEvent.click(queryByTestId('root'));

    expect(queryByTestId('root').id).toBe('test');
    expect(queryByTestId('root').className).toBe('test root-test');
    expect(queryByTestId('root').style).toMatchObject({
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
  test('should support create prop with name and handler in uncontroll mode', () => {
    const spy = jest.fn();

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
        return <Root render="div" />;
      }
    }

    const Test = createComponent(RootTestClass);
    render(<Test />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(RootTestClass.defaultProps.defaultValue, expect.anything());
  });
  test('should support set everything value and call it in handler uncontroll mode', () => {
    const spy = jest.fn();

    class RootTestClass extends Component<IComponentProps<{}>> {
      static defaultProps = {
        defaultValue: '',
      };

      uncontrolledProps() {
        return { value: [(e) => e.currentTarget.value, (value) => spy(value)] };
      }

      render() {
        const { Root } = this;
        return <Root render="textarea" />;
      }
    }

    const Test = createComponent(RootTestClass);
    const { getByTestId } = render(<Test data-testid="textarea" />);
    const TextareaDom = getByTestId('textarea');
    fireEvent.change(TextareaDom, { target: { value: 'test' } });

    expect(spy).toHaveBeenCalledWith('test');
  });
});

describe('Getter props function', () => {
  test('should support move props from Root in Children Class', () => {
    class RootTestClass extends Component {
      static displayName = 'Test';

      getItemProps() {
        return { test: 'test' };
      }

      render() {
        const { Root } = this;
        return <Root render="div" />;
      }
    }

    class ChildrenTestClass extends Component {
      render() {
        const { Root } = this;
        // @ts-ignore
        spy(this.asProps.test);
        return <Root render="div" />;
      }
    }

    const spy = jest.fn();

    const Test = createComponent(RootTestClass, { Item: ChildrenTestClass }) as any;
    render(
      <Test>
        <Test.Item />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });
  test('should support move props from Root in Children Function', () => {
    class RootTestClass extends Component {
      static displayName = 'Test';

      getItemProps() {
        return { test: 'test' };
      }

      render() {
        const { Root } = this;
        return <Root render="div" />;
      }
    }

    function ChildrenTestFunc(props) {
      const { Root, test } = props;
      spy(test);
      return <Root render="div" />;
    }

    const spy = jest.fn();
    const Test = createComponent(RootTestClass, { Item: ChildrenTestFunc }) as any;
    render(
      <Test>
        <Test.Item />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });
  test('should support self props in getter', () => {
    class RootTestClass extends Component {
      static displayName = 'Test';

      getItemProps(props) {
        spy(props.id);
      }

      render() {
        const { Root } = this;
        return <Root render="div" />;
      }
    }

    const spy = jest.fn();

    const Test = createComponent<CompType, ItemType>(RootTestClass, { Item: ChildrenTestFunc });
    render(
      <Test>
        <Test.Item id="test" />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('should support assign props in getter', () => {
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
          ref: (node) => spyRef(node),
        };
      }

      render() {
        const { Root } = this;
        return <Root render="div" />;
      }
    }

    const spyClick = jest.fn();
    const spyRef = jest.fn();

    const Test = createComponent(RootTestClass, { Item: ChildrenTestFunc }) as any;
    const { queryByTestId } = render(
      <Test>
        <Test.Item
          data-testid="item"
          id="test"
          className="test"
          style={{
            padding: '10px',
            margin: '10px',
          }}
          onClick={() => spyClick('test')}
          ref={(node) => spyRef(node)}
        />
      </Test>,
    );

    fireEvent.click(queryByTestId('item'));
    expect(queryByTestId('item').id).toBe('test');
    expect(queryByTestId('item').className).toBe('test root-test');
    expect(queryByTestId('item').style).toMatchObject({
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

describe('Hoist props', () => {
  test('should support hoist props from Children Func to Root', () => {
    const spy = jest.fn();

    class RootComponent extends RootTestClass {
      render() {
        const { Root } = this;
        spy(this.asProps.test);
        return <Root render="div" />;
      }
    }

    function ChildrenTestFunc(props) {
      const { Root } = props;
      return <Root render="div" />;
    }

    ChildrenTestFunc.hoistProps = ['test'];

    const Test = createComponent(RootComponent, { Item: ChildrenTestFunc }) as any;
    render(
      <Test>
        <Test.Item test="test" />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('should support hoist props from Children Class to Root', () => {
    const spy = jest.fn();

    class RootComponent extends RootTestClass {
      render() {
        const { Root } = this;
        spy(this.asProps.test);
        return <Root render="div" />;
      }
    }

    class ChildrenTestClass extends Component<IComponentProps<{}>> {
      static hoistProps = ['test'];

      render() {
        const { Root } = this;
        return <Root render="div" />;
      }
    }

    const Test = createComponent(RootComponent, { Item: ChildrenTestClass }) as any;
    render(
      <Test>
        <Test.Item test="test" />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('should support rename hoist props', () => {
    const spy = jest.fn();

    class RootComponent extends RootTestClass {
      render() {
        const { Root } = this;
        spy(this.asProps.id);
        return <Root render="div" />;
      }
    }

    function ChildrenTestFunc(props) {
      const { Root } = props;
      return <Root render="div" />;
    }

    ChildrenTestFunc.hoistProps = ['test:id'];

    const Test = createComponent(RootComponent, { Item: ChildrenTestFunc }) as any;
    render(
      <Test>
        <Test.Item test="test" />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('should support update hoist props', () => {
    const spy = jest.fn();

    class RootComponent extends RootTestClass {
      render() {
        const { Root } = this;
        spy(this.asProps.test);
        return <Root render="div" />;
      }
    }

    function ChildrenTestFunc(props) {
      const { Root } = props;
      return <Root render="div" />;
    }

    ChildrenTestFunc.hoistProps = ['test'];

    const Test = createComponent(RootComponent, { Item: ChildrenTestFunc }) as any;
    render(
      <Test>
        <Test.Item test="test" />
      </Test>,
    );
    expect(spy).toHaveBeenLastCalledWith('test');
    render(
      <Test>
        <Test.Item test="test-2" />
      </Test>,
    );
    expect(spy).toHaveBeenLastCalledWith('test-2');
  });
});

describe('Props from context', () => {
  afterEach(cleanup);
  test('should support props forwarding', () => {
    const Test = createComponent(RootTestClass);
    render(
      <Test custom="test">
        {(props) => {
          expect(props['custom']).toBe('test');
          return null;
        }}
      </Test>,
    );
  });

  test('should support props forwarding children and not overwrite', () => {
    const Test = createComponent(RootTestClass, {
      Item: ChildrenTestFunc,
    }) as any;
    render(
      <Test custom="test">
        <Test.Item custom="test-overwrite" custom-child="test">
          {(props) => {
            // TODO: that's not how it should work
            expect(props['custom']).toBe('test');
            expect(props['custom-child']).toBe('test');
            return null;
          }}
        </Test.Item>
      </Test>,
    );
  });

  test('should support normal nested name getter function', () => {
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
          <Test.Item.Value data-testid="value">
            {(props) => {
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
  afterEach(cleanup);

  test('should support parent context', () => {
    class RootTestParent extends Component<IComponentProps> {
      static defaultProps = {
        defaultValue: 5,
      };

      uncontrolledProps() {
        return { value: null };
      }

      render() {
        const { Root } = this;
        return <Root render="div" />;
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
        {(props, handlers) => {
          expect(props.value).toEqual(5);
          expect(typeof handlers.value).toEqual('function');
          return null;
        }}
      </Test>,
    );
  });

  test('should merge prop-getters for nested components', () => {
    function createMockComponent(name, render) {
      function Item(props) {
        const { Root } = props;
        return <Root render="div" />;
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
      const spy = jest.fn();
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

  test('should merge prop-getters handlers for nested components, and call em in wright order', () => {
    function createMockComponent(name, render) {
      function Item(props) {
        const { Root } = props;
        return <Root render="div" />;
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

    const clickSpy = jest.fn();

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
  afterEach(cleanup);

  function TestFuncWithRef(props, ref) {
    return <div ref={ref} {...props} />;
  }

  TestFuncWithRef.displayName = 'TestFuncWithRef';

  test('should support symbol CORE_COMPONENT', () => {
    const Test = createBaseComponent(TestFuncWithRef);
    expect(Test[CORE_COMPONENT]).toBe(true);
  });
  test('should support data-ui-name', () => {
    const Test = createBaseComponent(TestFuncWithRef);
    const { getByTestId } = render(<Test data-testid="test" />);
    expect(getByTestId('test').dataset.uiName).toBe(Test.displayName);
  });

  test('should support ref', () => {
    const Test = createBaseComponent(TestFuncWithRef);
    const ref = React.createRef();
    render(<Test ref={ref} />);
    expect(ref.current.nodeName).toBe('DIV');
  });
});
