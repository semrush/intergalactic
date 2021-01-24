function Enhancement() {
  let defaultProps = {};
  return {
    condition: function (Component) {
      if (!Component.defaultProps) {
        return false;
      }
      if (typeof Component.defaultProps === 'function') {
        return true;
      }
      return Boolean(Object.keys(Component.defaultProps).length);
    },
    static: function (WrapperComponent) {
      defaultProps = WrapperComponent.defaultProps;
      return {
        defaultProps: {},
      };
    },
    wrapperProps: function (props) {
      if (typeof defaultProps === 'function') {
        // TODO: optimization
        return Object.assign({}, defaultProps(props), props);
      }
      return Object.assign({}, defaultProps, props);
    },
  };
}

export default Enhancement;
