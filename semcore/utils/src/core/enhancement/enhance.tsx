function Enhancement() {
  return {
    condition: function (Component: any) {
      return Boolean(Component.enhance?.length);
    },
    wrapperProps: function (props: any, WrapperComponent: any) {
      return WrapperComponent.enhance.reduce((acc: any, enhance: any) => enhance(acc), props);
    },
  };
}

export default Enhancement;
