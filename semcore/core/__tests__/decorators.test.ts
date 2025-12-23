import { describe, it, expect, vi, Test } from '@semcore/testing-utils/vitest';

import callOnPropsChange from '../src/decorators/callOnPropsChange';
import reactive from '../src/decorators/reactive';

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

        @reactive(function (this: TestClass) {
          capturedThis = this;
        })
        value = 10;
      }

      const instance = new TestClass();
      instance.value = 20;

      expect(capturedThis).toBe(instance);
      expect(capturedThis.name).toBe('TestInstance');
    });

    it('should handle string primitive', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        text = 'initial';
      }

      const instance = new TestClass();
      instance.text = 'updated';

      expect(callback).toHaveBeenCalledWith('text', 'updated');
      expect(instance.text).toBe('updated');
    });

    it('should handle boolean primitive', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        isActive = false;
      }

      const instance = new TestClass();
      instance.isActive = true;

      expect(callback).toHaveBeenCalledWith('isActive', true);
      expect(instance.isActive).toBe(true);
    });

    it('should handle null primitive', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        value: number | null = null;
      }

      const instance = new TestClass();
      instance.value = 42;

      expect(callback).toHaveBeenCalledWith('value', 42);
    });

    it('should handle undefined primitive', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        value?: string = undefined;
      }

      const instance = new TestClass();
      instance.value = 'defined';

      expect(callback).toHaveBeenCalledWith('value', 'defined');
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

    it('should preserve getter functionality', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        value = 100;
      }

      const instance = new TestClass();
      expect(instance.value).toBe(100);

      instance.value = 200;
      expect(instance.value).toBe(200);
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

        @reactive(['value'], function (this: TestClass) {
          capturedThis = this;
        })
        readonly data = { value: 0 };
      }

      const instance = new TestClass();
      instance.data.value = 42;

      expect(capturedThis).toBe(instance);
      expect(capturedThis.id).toBe('test-123');
    });

    it('should preserve object functionality', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(['count'], callback)
        readonly data = { count: 0, label: 'test' };
      }

      const instance = new TestClass();

      expect(instance.data.count).toBe(0);
      expect(instance.data.label).toBe('test');

      instance.data.count = 5;
      expect(instance.data.count).toBe(5);
    });

    it('should handle nested object structures', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(['settings'], callback)
        readonly config = { settings: { theme: 'dark' }, version: 1 };
      }

      const instance = new TestClass();
      instance.config.settings = { theme: 'light' };

      expect(callback).toHaveBeenCalledWith('settings', { theme: 'light' });
    });

    it('should work with arrays', () => {
      const callback = vi.fn();

      // TODO: 111
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

    it('should be called for every change when watchedFields=undefined', () => {
      const arrCallback = vi.fn();
      const objCallback = vi.fn();

      class TestClass {
        @reactive(arrCallback)
        readonly items = ['a', 'b', 'c'];

        @reactive(objCallback)
        obj = { a: 1, b: 2, c: 3 };
      }

      const instance = new TestClass();

      instance.items[0] = 'x';
      expect(arrCallback).toHaveBeenCalledWith('0', 'x');

      instance.items[1] = 'y';
      expect(arrCallback).toHaveBeenCalledWith('1', 'y');

      instance.items[2] = 'z';
      expect(arrCallback).toHaveBeenCalledWith('2', 'z');

      expect(arrCallback).toHaveBeenCalledTimes(3);

      instance.obj.a = 4;
      expect(objCallback).toHaveBeenCalledWith('a', 4);

      instance.obj.b = 5;
      expect(objCallback).toHaveBeenCalledWith('b', 5);

      instance.obj.c = 6;
      expect(objCallback).toHaveBeenCalledWith('c', 6);

      expect(objCallback).toHaveBeenCalledTimes(3);
    });
  });

  describe('decorator signature overloads', () => {
    it('should work with callback-only signature for primitives', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        value = 42;
      }

      const instance = new TestClass();
      instance.value = 100;

      expect(callback).toHaveBeenCalledWith('value', 100);
    });

    it('should work with watchedFields + callback signature for objects', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(['x'], callback)
        readonly point = { x: 0, y: 0 };
      }

      const instance = new TestClass();
      instance.point.x = 10;

      expect(callback).toHaveBeenCalledWith('x', 10);
    });
  });

  describe('multiple decorated fields', () => {
    it('should handle multiple decorated fields independently', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      class TestClass {
        @reactive(callback1)
        counter = 0;

        @reactive(callback2)
        name = 'test';
      }

      const instance = new TestClass();

      instance.counter = 5;
      expect(callback1).toHaveBeenCalledWith('counter', 5);
      expect(callback2).not.toHaveBeenCalled();

      instance.name = 'updated';
      expect(callback2).toHaveBeenCalledWith('name', 'updated');
      expect(callback1).toHaveBeenCalledTimes(1);
    });

    it('should handle mix of primitive and non-primitive decorated fields', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      class TestClass {
        @reactive(callback1)
        count = 0;

        @reactive(['status'], callback2)
        readonly state = { status: 'idle', progress: 0 };
      }

      const instance = new TestClass();

      instance.count = 10;
      expect(callback1).toHaveBeenCalledWith('count', 10);

      instance.state.status = 'loading';
      expect(callback2).toHaveBeenCalledWith('status', 'loading');

      instance.state.progress = 50;
      expect(callback2).toHaveBeenCalledTimes(1); // progress not watched
    });
  });

  describe('multiple instances', () => {
    it('should maintain separate reactive state per instance', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        value = 0;
      }

      const instance1 = new TestClass();
      const instance2 = new TestClass();

      instance1.value = 10;
      expect(callback).toHaveBeenCalledWith('value', 10);
      expect(callback).toHaveBeenCalledTimes(1);

      instance2.value = 20;
      expect(callback).toHaveBeenCalledWith('value', 20);
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('edge cases', () => {
    it('should handle empty watchedFields array for objects', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive([], callback)
        readonly data = { value: 0 };
      }

      const instance = new TestClass();
      instance.data.value = 42;

      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle symbol property keys in objects', () => {
      const callback = vi.fn();
      const symbolKey = Symbol('key');

      class TestClass {
        @reactive([symbolKey], callback)
        readonly data = { [symbolKey]: 'value' };
      }

      const instance = new TestClass();
      instance.data[symbolKey] = 'updated';

      expect(callback).toHaveBeenCalledWith(symbolKey, 'updated');
    });

    it('should work when setting same value multiple times', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        value = 0;
      }

      const instance = new TestClass();
      instance.value = 5;
      instance.value = 5;
      instance.value = 5;

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should handle Date objects as non-primitive', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(['time'], callback)
        readonly date = { time: new Date() };
      }

      const instance = new TestClass();
      const newDate = new Date('2024-01-01');
      instance.date.time = newDate;

      expect(callback).toHaveBeenCalledWith('time', newDate);
    });
  });

  describe('property descriptors', () => {
    it('should make primitive property enumerable', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        value = 42;
      }

      const instance = new TestClass();
      const descriptor = Object.getOwnPropertyDescriptor(instance, 'value');

      expect(descriptor?.enumerable).toBe(true);
    });

    it('should make primitive property configurable', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        value = 42;
      }

      const instance = new TestClass();
      const descriptor = Object.getOwnPropertyDescriptor(instance, 'value');

      expect(descriptor?.configurable).toBe(true);
    });

    it('should allow primitive property to be enumerated', () => {
      const callback = vi.fn();

      class TestClass {
        @reactive(callback)
        reactiveValue = 42;

        normalValue = 100;
      }

      const instance = new TestClass();
      const keys = Object.keys(instance);

      expect(keys).toContain('reactiveValue');
      expect(keys).toContain('normalValue');
    });
  });
});

describe('@callOnPropsChange', () => {
  describe('basic functionality', () => {
    it('should call decorated function when watched prop changes', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { count: 0, name: 'test' };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['count'])
        handleChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.count = 1;
      instance.handleChange();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should NOT call decorated function when watched prop has not changed', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { count: 0 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['count'])
        handleChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.handleChange();
      instance.handleChange();

      expect(mockFn).toHaveBeenCalledTimes(0);
    });

    it('should NOT call function when non-watched prop changes', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { count: 0, name: 'test' };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['count'])
        handleChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.name = 'updated';
      instance.handleChange();

      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('multiple watched props', () => {
    it('should call function when any watched prop changes', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { count: 0, name: 'test', status: 'idle' };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['count', 'name'])
        handleChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.count = 1;
      instance.handleChange();
      expect(mockFn).toHaveBeenCalledTimes(1);

      instance.props.name = 'updated';
      instance.handleChange();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should NOT call function when all watched props remain unchanged', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { x: 0, y: 0, z: 0 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['x', 'y'])
        handleChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.z = 10;
      instance.handleChange();
      expect(mockFn).toHaveBeenCalledTimes(0);
    });

    it('should update all changed props tracking on single call', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { a: 1, b: 2, c: 3 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['a', 'b', 'c'])
        handleChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.a = 10;
      instance.props.b = 20;
      instance.props.c = 30;
      instance.handleChange();

      expect(mockFn).toHaveBeenCalledTimes(1);

      instance.handleChange();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('function arguments and return values', () => {
    it('should pass arguments to decorated function', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { value: 0 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['value'])
        handleChange(arg1: string, arg2: number) {
          mockFn(arg1, arg2);
        }
      }

      const instance = new TestClass();

      instance.props.value = 1;
      instance.handleChange('test', 42);

      expect(mockFn).toHaveBeenCalledWith('test', 42);
    });

    it('should return value from decorated function', () => {
      class RootClass {
        props = { count: 0 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['count'])
        calculate(multiplier: number): number {
          return this.props.count * multiplier;
        }
      }

      const instance = new TestClass();

      instance.props.count = 5;
      const result = instance.calculate(3);

      expect(result).toBe(15);
    });

    it('should return undefined when function is not called', () => {
      class RootClass {
        props = { value: 10 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['value'])
        getValue(): number {
          return this.props.value;
        }
      }

      const instance = new TestClass();

      const result = instance.getValue();

      expect(result).toBeUndefined();
    });

    it('should handle functions with no arguments', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { flag: false };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['flag'])
        toggle() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.flag = true;
      instance.toggle();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('context (this) binding', () => {
    it('should preserve correct "this" context', () => {
      let capturedThis: any;

      class RootClass {
        props = { value: 0 };
      }

      class TestClass extends RootClass {
        id = 'test-123';

        @callOnPropsChange(['value'])
        handleChange() {
          capturedThis = this;
        }
      }

      const instance = new TestClass();

      instance.props.value = 1;
      instance.handleChange();

      expect(capturedThis).toBe(instance);
      expect(capturedThis.id).toBe('test-123');
    });

    it('should allow accessing other instance properties', () => {
      class RootClass {
        props = { multiplier: 2 };
      }

      class TestClass extends RootClass {
        baseValue = 10;

        @callOnPropsChange(['multiplier'])
        calculate(): number {
          return this.baseValue * this.props.multiplier;
        }
      }

      const instance = new TestClass();

      instance.props.multiplier = 3;
      const result = instance.calculate();

      expect(result).toBe(30);
    });
  });

  describe('different prop value types', () => {
    it('should handle string props', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { name: 'John' };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['name'])
        onNameChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.name = 'Jane';
      instance.onNameChange();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle boolean props', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { isActive: false };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['isActive'])
        onToggle() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.isActive = true;
      instance.onToggle();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle null and undefined props', () => {
      const mockFn = vi.fn();

      class RootClass {
        props: { value: string | null } = { value: null };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['value'])
        onChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.value = 'defined';
      instance.onChange();
      expect(mockFn).toHaveBeenCalledTimes(1);

      instance.props.value = null;
      instance.onChange();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle object props with reference comparison', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { user: { name: 'John' } };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['user'])
        onUserChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.onUserChange();
      expect(mockFn).toHaveBeenCalledTimes(0);

      instance.onUserChange();
      expect(mockFn).toHaveBeenCalledTimes(0);

      instance.props.user = { name: 'Jane' };
      instance.onUserChange();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle array props with reference comparison', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { items: [1, 2, 3] };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['items'])
        onItemsChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.onItemsChange();
      expect(mockFn).toHaveBeenCalledTimes(0);

      instance.props.items.push(4);
      instance.onItemsChange();
      expect(mockFn).toHaveBeenCalledTimes(0);

      instance.props.items = [5, 6, 7];
      instance.onItemsChange();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('multiple decorated methods', () => {
    it('should track props independently for different methods', () => {
      const mockFn1 = vi.fn();
      const mockFn2 = vi.fn();

      class RootClass {
        props = { count: 0, name: 'test' };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['count'])
        onCountChange() {
          mockFn1();
        }

        @callOnPropsChange(['name'])
        onNameChange() {
          mockFn2();
        }
      }

      const instance = new TestClass();

      instance.props.count = 1;
      instance.onCountChange();
      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).not.toHaveBeenCalled();

      instance.props.name = 'updated';
      instance.onNameChange();
      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });

    it('should allow same prop watched by multiple methods', () => {
      const mockFn1 = vi.fn();
      const mockFn2 = vi.fn();

      class RootClass {
        props = { value: 0 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['value'])
        handler1() {
          mockFn1();
        }

        @callOnPropsChange(['value'])
        handler2() {
          mockFn2();
        }
      }

      const instance = new TestClass();

      instance.props.value = 1;
      instance.handler1();
      instance.handler2();

      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });
  });

  describe('inheritance scenarios', () => {
    it('should work with multi-level inheritance', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { value: 0 };
      }

      class MiddleClass extends RootClass {
        multiplier = 2;
      }

      class TestClass extends MiddleClass {
        @callOnPropsChange(['value'])
        calculate() {
          mockFn(this.props.value * this.multiplier);
        }
      }

      const instance = new TestClass();

      instance.props.value = 5;
      instance.calculate();

      expect(mockFn).toHaveBeenCalledWith(10);
    });

    it('should work when props are defined in parent constructor', () => {
      const mockFn = vi.fn();

      class RootClass {
        props: { count: number };

        constructor() {
          this.props = { count: 0 };
        }
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['count'])
        onChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.count = 5;
      instance.onChange();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should work with child class overriding props', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { value: 0 };
      }

      class TestClass extends RootClass {
        props = { value: 10, extra: 'test' };

        @callOnPropsChange(['value'])
        onChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.value = 20;
      instance.onChange();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle empty watched props array', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { value: 0 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange([])
        handleChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.value = 1;
      instance.handleChange();

      expect(mockFn).not.toHaveBeenCalled();
    });

    it('should handle props changing from undefined to defined', () => {
      const mockFn = vi.fn();

      class RootClass {
        props: { value?: number } = {};
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['value'])
        onChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.props.value = 42;
      instance.onChange();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle setting prop to same value (no change)', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { count: 5 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['count'])
        onChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.onChange();
      expect(mockFn).toHaveBeenCalledTimes(0);

      instance.props.count = 5;
      instance.onChange();
      expect(mockFn).toHaveBeenCalledTimes(0);
    });

    it('should handle rapid prop changes', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { value: 0 };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['value'])
        onChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      for (let i = 1; i <= 10; i++) {
        instance.props.value = i;
        instance.onChange();
      }

      expect(mockFn).toHaveBeenCalledTimes(10);
    });

    it('should handle prop changing back to original value', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { flag: false };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['flag'])
        onToggle() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.onToggle();
      expect(mockFn).toHaveBeenCalledTimes(0);

      instance.props.flag = true;
      instance.onToggle();
      expect(mockFn).toHaveBeenCalledTimes(1);

      instance.props.flag = false;
      instance.onToggle();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle NaN comparison correctly', () => {
      const mockFn = vi.fn();

      class RootClass {
        props = { value: NaN };
      }

      class TestClass extends RootClass {
        @callOnPropsChange(['value'])
        onChange() {
          mockFn();
        }
      }

      const instance = new TestClass();

      instance.onChange();
      expect(mockFn).toHaveBeenCalledTimes(1);

      instance.onChange();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});
