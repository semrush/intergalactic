import React, { HTMLAttributes } from 'react';
import { cleanup, fireEvent, render } from 'jest-preset-ui/testing';
import { shouldSupportRef } from 'jest-preset-ui/shared';
import createComponent, { createBaseComponent, Component, IComponentProps } from '../src';

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

  shouldSupportChildren(ChildrenTestClass, 'Class');
  shouldSupportChildren(ChildrenTestFunc, 'Function');

  test('should support move props from Root in Children Function', () => {
    const spy = jest.fn();
    function ChildrenTestFunc(props) {
      const { Root, test } = props;
      spy(test);
      return <Root render="div" />;
    }

    const Test = createComponent<CompType, ItemType>(RootTestClass, { Item: ChildrenTestFunc });
    render(
      <Test>
        <Test.Item />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('should support move props from Root in Children Class', () => {
    const spy = jest.fn();
    class ChildrenTestClass extends Component<IComponentProps<{ test: unknown }>> {
      render() {
        const { Root } = this;
        spy(this.asProps.test);
        return <Root render="div" />;
      }
    }

    const Test = createComponent<CompType, ItemType>(RootTestClass, { Item: ChildrenTestClass });
    render(
      <Test>
        <Test.Item />
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

    const Test = createComponent<CompType, ItemType>(RootComponent, { Item: ChildrenTestClass });
    render(
      <Test>
        <Test.Item test="test" />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('should support hoist props from Children Function to Root', () => {
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

    const Test = createComponent<CompType, ItemType>(RootComponent, { Item: ChildrenTestFunc });
    render(
      <Test>
        <Test.Item test="test" />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('should support hoist props from Children Function to Root', () => {
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

    const Test = createComponent<CompType, ItemType>(RootComponent, { Item: ChildrenTestFunc });
    render(
      <Test>
        <Test.Item test="test" />
      </Test>,
    );
    expect(spy).toHaveBeenCalledWith('test');
  });

  test('should support custom props name', () => {
    const RootClass = ChildrenTestClass;
    const Test = createComponent(RootClass);
    const TestWithChildren = createComponent<CompType, ItemType>(RootClass, {
      Item: ChildrenTestFunc,
    });
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
    );
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

  test('should support set data-ui-name', () => {
    const InheritTest = createComponent(RootTestClass);
    class TestClass extends Component<IComponentProps<{}>> {
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

  test('should support normal nested name getChildrenProps', () => {
    const mock = { value: 'test' };

    class TestRoot extends RootTestClass {
      getItemValueProps() {
        return mock;
      }
    }

    type ItemWithValue = { Item: [HTMLAttributes<HTMLDivElement>, { Value: { value?: unknown } }] };

    const Test = createComponent<CompType, ItemWithValue>(TestRoot, {
      Item: [ChildrenTestClass, { Value: ChildrenTestClass }],
    });

    render(
      <Test>
        <Test.Item>
          <Test.Item.Value>
            {(props) => {
              expect(mock.value).toEqual(props.value);
              return null;
            }}
          </Test.Item.Value>
        </Test.Item>
      </Test>,
    );
  });

  test('createBaseComponent should support set data-ui-name for Component', () => {
    function TestComponent(props, ref) {
      return <div ref={ref} {...props} />;
    }
    TestComponent.displayName = 'Test';
    const Test = createBaseComponent(TestComponent);
    const { getByTestId } = render(<Test data-testid="test" />);
    expect(getByTestId('test').dataset.uiName).toBe(TestComponent.displayName);
  });

  test('should support optimization function in getter method', () => {
    const spy = jest.fn();

    class TestRoot extends Component {
      static displayName = 'TestRoot';

      bindHandlerClick = (value) => (e) => {};

      getItemProps({ value }) {
        return {
          onClick: this.bindHandlerClick(value),
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

    const Test = createComponent<CompType, ItemType>(TestRoot, {
      Item: TestChildren,
    });

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

  test('Should merge prop-getters for nested components', () => {
    type GetterReturn = { foo?: string; bar?: string; baz?: string };
    type InnerItemType = { Item: GetterReturn };
    type ContextType = { getItemProps?: () => GetterReturn };

    class FirstRoot extends Component {
      static displayName = 'First';

      getItemProps() {
        return { foo: 'foo' };
      }

      render() {
        const { Root } = this;
        return <Root render="div" />;
      }
    }

    class SecondRoot extends Component {
      static displayName = 'Second';

      getItemProps() {
        return { bar: 'bar' };
      }

      render() {
        const { Root } = this;
        return <Root render={First} />;
      }
    }

    class ThirdRoot extends Component {
      static displayName = 'Third';

      getItemProps() {
        return { baz: 'baz' };
      }

      render() {
        const { Root } = this;
        return <Root render={Second} />;
      }
    }

    function Item(props) {
      const { Root } = props;
      return <Root render="div" />;
    }

    const First = createComponent<CompType, InnerItemType, ContextType>(FirstRoot, { Item });
    const Second = createComponent<CompType, InnerItemType, ContextType>(
      SecondRoot,
      { Item },
      { parent: First },
    );
    const Third = createComponent<CompType, InnerItemType, ContextType>(
      ThirdRoot,
      { Item },
      { parent: Second },
    );

    const tests = [
      {
        Component: First,
        expected: ['foo', undefined, undefined],
      },
      {
        Component: Second,
        expected: ['foo', 'bar', undefined],
      },
      {
        Component: Third,
        expected: ['foo', 'bar', 'baz'],
      },
    ];

    tests.forEach(({ Component, expected }) => {
      const spy = jest.fn();
      render(
        <Component>
          {({ getItemProps }) => {
            const { foo, bar, baz } = getItemProps();
            spy(foo, bar, baz);
            return 'test';
          }}
        </Component>,
      );

      expect(spy).toBeCalledWith(...expected);
    });
  });

  test('Should merge prop-getters handlers for nested components, and call em in wright order', () => {
    type GetterReturn = { onClick?: () => void };
    type InnerItemType = { Item: GetterReturn };
    type ContextType = { getItemProps?: <T extends {}>(props: T) => GetterReturn & T };

    const firstSpy = jest.fn();

    class FirstRoot extends Component {
      static displayName = 'First';

      getItemProps() {
        return { onClick: firstSpy };
      }

      render() {
        const { Root } = this;
        return <Root render="div" />;
      }
    }

    const secondSpy = jest.fn();

    class SecondRoot extends Component {
      static displayName = 'Second';

      getItemProps() {
        return { onClick: secondSpy };
      }

      render() {
        const { Root } = this;
        return <Root render={First} />;
      }
    }

    const thirdSpy = jest.fn();

    class ThirdRoot extends Component {
      static displayName = 'Third';

      getItemProps() {
        return { onClick: thirdSpy };
      }

      render() {
        const { Root } = this;
        return <Root render={Second} />;
      }
    }

    function Item(props) {
      const { Root } = props;
      return <Root render="div" />;
    }

    const First = createComponent<CompType, InnerItemType, ContextType>(FirstRoot, { Item });
    const Second = createComponent<CompType, InnerItemType, ContextType>(
      SecondRoot,
      { Item },
      { parent: First },
    );
    const Third = createComponent<CompType, InnerItemType, ContextType>(
      ThirdRoot,
      { Item },
      { parent: Second },
    );

    const handlerSpy = jest.fn();

    const component = render(
      <Third>
        {({ getItemProps }) => {
          const props = {
            onClick: handlerSpy,
          };
          const { onClick } = getItemProps(props);
          onClick();
          return 'test';
        }}
      </Third>,
    );

    expect(firstSpy).toBeCalledTimes(1);
    expect(secondSpy).toBeCalledTimes(1);
    expect(thirdSpy).toBeCalledTimes(1);
    expect(handlerSpy).toBeCalledTimes(1);

    const falsySpy = jest.fn(() => false);

    component.rerender(
      <Third>
        {({ getItemProps }) => {
          const props = {
            onClick: falsySpy,
          };
          const { onClick } = getItemProps(props);
          onClick();
          return 'test';
        }}
      </Third>,
    );

    expect(firstSpy).toBeCalledTimes(1);
    expect(secondSpy).toBeCalledTimes(1);
    expect(thirdSpy).toBeCalledTimes(1);
    expect(falsySpy).toBeCalledTimes(1);
  });
});
