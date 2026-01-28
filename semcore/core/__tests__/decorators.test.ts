import { describe, it, expect, vi, Test } from '@semcore/testing-utils/vitest';

import propsObserver from '../src/decorators/propsObserver';
import reactive from '../src/decorators/reactive';

interface TestProps {
  name: string;
  age: number;
}

describe('@reactive', () => {
  describe('primitive values', () => {
    it('should call callback when primitive value changes', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        counter = 0;
      }

      const instance = new TestClass();
      instance.counter = 5;

      expect(callback).toHaveBeenCalledWith('counter', 5);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call callback with correct "this" context', () => {
      let capturedThis: any;

      class TestClass {
        name = 'TestInstance';

        @reactive(function () {
          capturedThis = this;
        })
        value = 10;
      }

      const instance = new TestClass();
      instance.value = 20;

      expect(capturedThis).toBe(instance);
      expect(capturedThis.name).toBe('TestInstance');
    });

    it('should call callback multiple times on multiple changes', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        counter = 0;
      }

      const instance = new TestClass();
      instance.counter = 1;
      instance.counter = 2;
      instance.counter = 3;

      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenNthCalledWith(1, 'counter', 1);
      expect(callback).toHaveBeenNthCalledWith(2, 'counter', 2);
      expect(callback).toHaveBeenNthCalledWith(3, 'counter', 3);
    });
  });
  describe('non-primitive values (objects)', () => {
    it('should call callback when watched field changes in object', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(['name'], callback)
        readonly user = { name: 'John', age: 30 };
      }

      const instance = new TestClass();
      instance.user.name = 'Jane';

      expect(callback).toHaveBeenCalledWith('name', 'Jane');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should NOT call callback when non-watched field changes', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(['name'], callback)
        readonly user = { name: 'John', age: 30 };
      }

      const instance = new TestClass();
      instance.user.age = 31;

      expect(callback).not.toHaveBeenCalled();
    });

    it('should watch multiple fields in object', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(['name', 'age'], callback)
        readonly user = { name: 'John', age: 30, city: 'NYC' };
      }

      const instance = new TestClass();

      instance.user.name = 'Jane';
      expect(callback).toHaveBeenCalledWith('name', 'Jane');

      instance.user.age = 31;
      expect(callback).toHaveBeenCalledWith('age', 31);

      instance.user.city = 'LA';
      expect(callback).toHaveBeenCalledTimes(2); // city is not watched
    });

    it('should call callback with correct "this" context for objects', () => {
      let capturedThis: any;

      class TestClass {
        id = 'test-123';

        @reactive(['value'], function () {
          capturedThis = this;
        })
        readonly data = { value: 0 };
      }

      const instance = new TestClass();
      instance.data.value = 42;

      expect(capturedThis).toBe(instance);
      expect(capturedThis.id).toBe('test-123');
    });

    it('should work with arrays', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(['0', '1'], callback)
        readonly items = ['a', 'b', 'c'];
      }

      const instance = new TestClass();

      instance.items[0] = 'x';
      expect(callback).toHaveBeenCalledWith('0', 'x');

      instance.items[1] = 'y';
      expect(callback).toHaveBeenCalledWith('1', 'y');

      instance.items[2] = 'z';
      expect(callback).toHaveBeenCalledTimes(2); // index 2 not watched
    });
  });

  describe('edge cases', () => {
    it('should handle empty watchedFields array for objects', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive([], callback)
        readonly data = { value: 0, name: 'test' };
      }

      const instance = new TestClass();
      instance.data.value = 42;
      instance.data.name = 'updated name';

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should call only once for the same value', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        value = 0;
      }

      const instance = new TestClass();
      instance.value = 5;
      instance.value = 5;
      instance.value = 5;

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});

describe('@propsObserver', () => {
  describe('Basic functionality', () => {
    it('should track specified props changes', () => {
      const onPropsChangeSpy = vi.fn();

      @propsObserver(['name', 'age'])
      class TestComponent {
        props: TestProps;

        constructor(props: TestProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<TestProps>) {
          onPropsChangeSpy(changedProps);
        }

        render() {
          return 'rendered';
        }
      }

      const component = new TestComponent({ name: 'John', age: 30 });

      component.render();
      expect(onPropsChangeSpy).not.toHaveBeenCalled();

      component.props = { name: 'Jane', age: 30 };
      component.render();

      expect(onPropsChangeSpy).toHaveBeenCalledWith({ name: 'Jane' });
      expect(onPropsChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should detect multiple props changes', () => {
      const onPropsChangeSpy = vi.fn();

      @propsObserver(['name', 'age'])
      class TestComponent {
        props: TestProps;

        constructor(props: TestProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<TestProps>) {
          onPropsChangeSpy(changedProps);
        }

        render() {
          return 'rendered';
        }
      }

      const component = new TestComponent({ name: 'John', age: 30 });
      component.render();

      component.props = { name: 'Jane', age: 25 };
      component.render();

      expect(onPropsChangeSpy).toHaveBeenCalledWith({ name: 'Jane', age: 25 });
    });

    it('should not call onPropsChange when no tracked props changed', () => {
      const onPropsChangeSpy = vi.fn();

      @propsObserver(['name'])
      class TestComponent {
        props: TestProps;

        constructor(props: TestProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<TestProps>) {
          onPropsChangeSpy(changedProps);
        }

        render() {
          return 'rendered';
        }
      }

      const component = new TestComponent({ name: 'John', age: 30 });
      component.render();

      component.props = { name: 'John', age: 25 };
      component.render();

      expect(onPropsChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('Reference equality for objects and arrays', () => {
    it('should detect object reference changes', () => {
      const onPropsChangeSpy = vi.fn();

      interface ObjectProps {
        user: { name: string };
      }

      @propsObserver(['user'])
      class TestComponent {
        props: ObjectProps;

        constructor(props: ObjectProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<ObjectProps>) {
          onPropsChangeSpy(changedProps);
        }

        render() {
          return 'rendered';
        }
      }

      const user = { name: 'John' };
      const component = new TestComponent({ user });
      component.render();

      component.props = { user };
      component.render();
      expect(onPropsChangeSpy).not.toHaveBeenCalled();

      component.props = { user: { name: 'John' } };
      component.render();
      expect(onPropsChangeSpy).toHaveBeenCalledWith({ user: { name: 'John' } });
    });

    it('should detect array reference changes', () => {
      const onPropsChangeSpy = vi.fn();

      interface ArrayProps {
        items: string[];
      }

      @propsObserver(['items'])
      class TestComponent {
        props: ArrayProps;

        constructor(props: ArrayProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<ArrayProps>) {
          onPropsChangeSpy(changedProps);
        }

        render() {
          return 'rendered';
        }
      }

      const items = ['a', 'b'];
      const component = new TestComponent({ items });
      component.render();

      component.props = { items: ['a', 'b'] };
      component.render();

      expect(onPropsChangeSpy).toHaveBeenCalledWith({ items: ['a', 'b'] });
    });
  });

  describe('Edge cases', () => {
    it('should handle empty propsToWatch array', () => {
      const onPropsChangeSpy = vi.fn();

      @propsObserver([])
      class TestComponent {
        props: TestProps;

        constructor(props: TestProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<TestProps>) {
          onPropsChangeSpy(changedProps);
        }

        render() {
          return 'rendered';
        }
      }

      const component = new TestComponent({ name: 'John', age: 30 });
      component.render();

      component.props = { name: 'Jane', age: 25 };
      component.render();

      expect(onPropsChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should work with multiple renders without prop changes', () => {
      const onPropsChangeSpy = vi.fn();

      @propsObserver(['name'])
      class TestComponent {
        props: TestProps;

        constructor(props: TestProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<TestProps>) {
          onPropsChangeSpy(changedProps);
        }

        render() {
          return 'rendered';
        }
      }

      const component = new TestComponent({ name: 'John', age: 30 });

      component.render();
      component.render();
      component.render();

      expect(onPropsChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('Render behavior', () => {
    it('should call onPropsChange before parent render', () => {
      const callOrder: string[] = [];

      @propsObserver(['name'])
      class TestComponent {
        props: TestProps;

        constructor(props: TestProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<TestProps>) {
          callOrder.push('onPropsChange');
        }

        render() {
          callOrder.push('render');
          return 'rendered';
        }
      }

      const component = new TestComponent({ name: 'John', age: 30 });
      component.render();

      component.props = { name: 'Jane', age: 30 };
      component.render();

      expect(callOrder).toEqual(['render', 'onPropsChange', 'render']);
    });
  });

  describe('Unmount behavior', () => {
    it('should call decorated componentWillUnmount', () => {
      const onComponentWillUnmountSpy = vi.fn();

      @propsObserver(['name', 'age'])
      class TestComponent {
        props: TestProps;

        constructor(props: TestProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<TestProps>) {}

        componentWillUnmount() {
          onComponentWillUnmountSpy();
        }

        render() {
          return 'rendered';
        }
      }

      const component = new TestComponent({ name: 'John', age: 30 });

      component.render();
      expect(onComponentWillUnmountSpy).not.toHaveBeenCalled();

      component.componentWillUnmount();
      expect(onComponentWillUnmountSpy).toHaveBeenCalledOnce();
    });

    it('should set observable props to undefined', () => {
      @propsObserver(['name', 'age'])
      class TestComponent {
        props: TestProps;

        constructor(props: TestProps) {
          this.props = props;
        }

        onPropsChange(changedProps: Partial<TestProps>) {}

        componentWillUnmount() {}

        render() {
          return 'rendered';
        }
      }

      const component = new TestComponent({ name: 'John', age: 30 });

      component.render();
      // @ts-expect-error
      expect(component.__observableProps).toEqual({ name: 'John', age: 30 });

      component.componentWillUnmount();
      // @ts-expect-error
      expect(component.__observableProps).toEqual({ name: undefined, age: undefined });
    });
  });
});
