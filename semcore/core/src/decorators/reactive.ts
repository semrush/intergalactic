type Primitive = string | number | boolean | symbol | bigint | null | undefined;
type IsReadonly<This, Property extends keyof This> =
  (<F>() => F extends { [P in Property]: This[Property] } ? 1 : 2) extends
  (<F>() => F extends { -readonly [P in Property]: This[Property] } ? 1 : 2)
    ? false
    : true;
type Callback<This> = (this: This, field: string | symbol, newValue: unknown) => void;
type ReturnType<
  This,
  Property extends keyof This = keyof This,
> = IsReadonly<This, Property> extends true
  ? (_: undefined, ctx: ClassFieldDecoratorContext<This, This[Property]>) => void
  : This[Property] extends Primitive
    ? (_: undefined, ctx: ClassFieldDecoratorContext<This, This[Property]>) => void
    : never;

const isPrimitiveValue = (value: unknown) => value !== Object(value);

function reactive<
  This,
  Property extends keyof This,
  Value = This[Property],
>(cb: Value extends Primitive ? Callback<This> : never): ReturnType<This>;
function reactive<
  This,
  Property extends keyof This,
  Value = This[Property],
>(watchedFields: Value extends Primitive ? never : Array<keyof Value>, cb: Callback<This>): ReturnType<This>;

function reactive<
  This,
  Property extends keyof This,
>(watchedFieldsOrCb: Array<keyof This[Property]> | Callback<This>, cb?: Callback<This>) {
  return function (_: undefined, ctx: ClassFieldDecoratorContext<This, This[Property]>) {
    const { addInitializer, name } = ctx;

    addInitializer(function (this: This) {
      const thisRoot = this;

      const isPrimitive = isPrimitiveValue(this[name as Property]);

      const callback = typeof watchedFieldsOrCb === 'function' ? watchedFieldsOrCb : cb!;
      const fields = Array.isArray(watchedFieldsOrCb) ? watchedFieldsOrCb : null;

      if (isPrimitive) {
        let value = this[name as Property];

        Object.defineProperty(this, name, {
          get() {
            return value;
          },
          set(newValue) {
            const oldValue = value;

            value = newValue;

            if (oldValue !== newValue) {
              callback.call(thisRoot, name, newValue);
            }
          },
          enumerable: true,
          configurable: true,
        });
      } else {
        // @ts-ignore
        this[name] = new Proxy(this[name], {
          set(target, p, newValue) {
            target[p] = newValue;

            if (fields?.length === 0 || fields?.includes(p as keyof This[Property])) {
              callback.call(thisRoot, p, newValue);
            }

            return true;
          },
        });
      }
    });
  };
}

export default reactive;
