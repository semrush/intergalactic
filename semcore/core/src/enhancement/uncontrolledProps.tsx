import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import capitalizeFirstLetter from '@semcore/utils/lib/capitalizeFirstLetter';

function assign(target, source) {
  return Object.defineProperties(
    target,
    Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {}),
  );
}

function defaultProp(prop) {
  return 'default' + capitalizeFirstLetter(prop);
}

function handlerProp(prop) {
  if (prop === 'value') prop = '';
  if (prop === 'checked') prop = '';
  return `on${capitalizeFirstLetter(prop)}Change`;
}

function isControlled(propValue) {
  return propValue !== undefined;
}

function uncontrolledProp(self, propName, propValue, propDefaultValue, propHandler, chainHandler) {
  function getValue() {
    return isControlled(propValue)
      ? propValue
      : propName in self.state
      ? self.state[propName]
      : propDefaultValue;
  }

  return [
    getValue(),
    (value, ...args) => {
      const oldValue = getValue();
      if (oldValue === value) return false;
      if (!isControlled(propValue)) self.setState({ [propName]: value });
      return callAllEventHandlers(propHandler, ...chainHandler)(value, ...args);
    },
  ];
}

function uncontrolledUniversal(props, config, uncontrolledProp) {
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
      // eslint-disable-next-line no-console
      console.warn(defaultPropName, 'must be installed in "defaultProps"');
    }

    // if (typeof propDefaultValue === 'function' && propDefaultValue.defaultInit) {
    //   propDefaultValue = propDefaultValue(result);
    // }

    let setter = config[propName];
    let chainHandler = [];

    if (Array.isArray(setter)) [setter, ...chainHandler] = setter;
    setter = setter || ((v) => v);

    const [value, handler] = uncontrolledProp(
      propName,
      propValue,
      propDefaultValue,
      propHandler,
      chainHandler,
    );
    // TODO: предупреждение из-за циклических вызовов
    handlerProps[propName] = handler;

    return {
      ...other,
      [propName]: value,
      [handlerName]: (eventOrValue, ...args) => {
        const result = [setter(eventOrValue, ...args), ...args];
        if (eventOrValue && eventOrValue.target) {
          result.push(eventOrValue);
        }
        return handler(...result);
      },
    };
  }, props);
  return [uncontrolledProps, handlerProps];
}

function uncontrolled(self, props, config) {
  return uncontrolledUniversal(props, config, uncontrolledProp.bind(undefined, self));
}

function Enhancement() {
  return {
    condition: function (Component) {
      return Boolean(Component.prototype.uncontrolledProps);
    },
    init: function () {
      this.state = this.state || {};
      assign(this, {
        get handlers() {
          const [, uncontrolledHandlers] = uncontrolled(this, this.props, this.uncontrolledProps());
          return uncontrolledHandlers;
        },
      });
    },
    context: function (context) {
      return {
        ...context,
        handlers: this.handlers,
      };
    },
    asProps: function (props) {
      // TODO возвращать только нужные свойства
      const [uncontrolledProps] = uncontrolled(this, props, this.uncontrolledProps());
      return uncontrolledProps;
    },
  };
}

export default Enhancement;
