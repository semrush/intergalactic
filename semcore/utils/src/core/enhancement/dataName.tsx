function Enhancement() {
  return {
    wrapperProps: (props: any, WrapperComponent: any) => ({
      'data-ui-name': WrapperComponent.displayName,
      ...props,
    }),
  };
}

export default Enhancement;
