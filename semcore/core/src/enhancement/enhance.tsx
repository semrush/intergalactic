function Enhancement() {
  return {
    condition: function (Component) {
      return Boolean(Component.enhance && Component.enhance.length);
    },
    wrapperProps: function (props, WrapperComponent) {
      return WrapperComponent.enhance.reduce((acc, enhance) => enhance(acc), props);
    },
  };
}

export default Enhancement;
