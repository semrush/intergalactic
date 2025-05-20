function Enhancement() {
  return {
    wrapperProps: function (props: any, WrapperComponent: any) {
      return {
        'data-ui-name': WrapperComponent.displayName,
        ...props,
      };
    },
  };
}

export default Enhancement;
