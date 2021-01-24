function Enhancement() {
  return {
    wrapperProps: function (props, WrapperComponent) {
      return {
        'data-ui-name': WrapperComponent.displayName,
        ...props,
      };
    },
  };
}

export default Enhancement;
