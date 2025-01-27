function Enhancement() {
  return {
    condition: (Component: any) => Boolean(Component.enhance?.length),
    wrapperProps: (props: any, WrapperComponent: any) =>
      WrapperComponent.enhance.reduce((acc: any, enhance: any) => enhance(acc), props),
  };
}

export default Enhancement;
