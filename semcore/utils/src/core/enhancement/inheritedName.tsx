export const INHERITED_NAME = Symbol('INHERITED_NAME');

function Enhancement() {
  return {
    condition: (Component: any) => Boolean(Component.displayName),
    static: (WrapperComponent: any) => ({
      [INHERITED_NAME]: [
        ...new Set([...(WrapperComponent[INHERITED_NAME] || []), WrapperComponent.displayName]),
      ],
    }),
  };
}

export default Enhancement;
