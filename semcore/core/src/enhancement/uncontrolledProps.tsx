import { callAllEventHandlers } from '../utils/assignProps';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

function assign(target: any, source: any) {
  return Object.defineProperties(
    target,
    Object.keys(source).reduce((descriptors: any, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {}),
  );
}

function defaultProp(prop: any) {
  return `default${capitalizeFirstLetter(prop)}`;
}

function handlerProp(prop: any) {
  if (prop === 'value') prop = '';
  if (prop === 'checked') prop = '';
  return `on${capitalizeFirstLetter(prop)}Change`;
}

function isControlled(propValue: any) {
  return propValue !== undefined;
}

function uncontrolledProp(
  self: any,
  propName: any,
  propValue: any,
  propDefaultValue: any,
  propHandler: any,
  chainHandler: any,
) {
  function getValue() {
    return isControlled(propValue)
      ? propValue
      : propName in self.state
      ? self.state[propName]
      : propDefaultValue;
  }

  return [
    getValue(),
    (value: any, ...args: any[]) => {
      const oldValue = getValue();
      if (oldValue === value) return false;
      if (!isControlled(propValue)) self.setState({ [propName]: value });
      return callAllEventHandlers(propHandler, ...chainHandler)(value, ...args);
    },
  ];
}

function uncontrolledUniversal(props: any, config: any, uncontrolledProp: any) {
  const handlerProps = {};
  const uncontrolledProps = Object.keys(config).reduce((result, propName) => {
    const handlerName = handlerProp(propName);
    const defaultPropName = defaultProp(propName);
    const {
      [defaultPropName]: propDefaultValue,
      [propName]: propValue,
      [handlerName]: propHandler,
      ...other
    } = result;

    if (propDefaultValue === undefined) {
      console.warn(defaultPropName, 'must be installed in "defaultProps"');
    }

    // if (typeof propDefaultValue === 'function' && propDefaultValue.defaultInit) {
    //   propDefaultValue = propDefaultValue(result);
    // }

    let setter = config[propName];
    let chainHandler = [];

    if (Array.isArray(setter)) [setter, ...chainHandler] = setter;
    setter = setter || ((v: any) => v);

    const [value, handler] = uncontrolledProp(
      propName,
      propValue,
      propDefaultValue,
      propHandler,
      chainHandler,
    );
    // TODO: need to warn about recursion (by lsroman)
    (handlerProps as any)[propName] = handler;

    return {
      ...other,
      [propName]: value,
      [handlerName]: (eventOrValue: any, ...args: any[]) => {
        const result = [setter(eventOrValue, ...args), ...args];
        if (eventOrValue?.target) {
          result.push(eventOrValue);
        }
        return handler(...result);
      },
    };
  }, props);
  return [uncontrolledProps, handlerProps];
}

function uncontrolled(self: any, props: any, config: any) {
  return uncontrolledUniversal(props, config, uncontrolledProp.bind(undefined, self));
}

function Enhancement() {
  return {
    condition: function (Component: any) {
      return Boolean(Component.prototype.uncontrolledProps);
    },
    init: function (this: any) {
      this.state = this.state || {};
      assign(this, {
        get handlers() {
          const [, uncontrolledHandlers] = uncontrolled(this, this.props, this.uncontrolledProps());
          return uncontrolledHandlers;
        },
      });
    },
    context: function (this: any, context: any) {
      return {
        ...context,
        handlers: this.handlers,
      };
    },
    asProps: function (this: any, props: any) {
      // TODO: need to omit unneccessary props (by lsroman)
      const [uncontrolledProps] = uncontrolled(this, props, this.uncontrolledProps());
      return uncontrolledProps;
    },
  };
}

export default Enhancement;
