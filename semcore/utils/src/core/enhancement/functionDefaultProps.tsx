function Enhancement() {
  let defaultProps = {};
  return {
    condition: (Component: any) => {
      if (!Component.defaultProps) {
        return false;
      }
      if (typeof Component.defaultProps === 'function') {
        return true;
      }
      return Boolean(Object.keys(Component.defaultProps).length);
    },
    static: (WrapperComponent: any) => {
      defaultProps = WrapperComponent.defaultProps;
      return {
        defaultProps: {},
      };
    },
    wrapperProps: (props: any) => {
      if (typeof defaultProps === 'function') {
        // TODO: optimization
        return Object.assign({}, defaultProps(props), props);
      }
      return Object.assign({}, defaultProps, props);
    },
  };
}

export default Enhancement;
