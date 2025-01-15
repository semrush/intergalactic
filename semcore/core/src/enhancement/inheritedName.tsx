export const INHERITED_NAME = Symbol('INHERITED_NAME');

function Enhancement() {
  return {
    condition: function (Component: any) {
      return Boolean(Component.displayName);
    },
    static: function (WrapperComponent: any) {
      return {
        [INHERITED_NAME]: [
          ...new Set([...(WrapperComponent[INHERITED_NAME] || []), WrapperComponent.displayName]),
        ],
      };
    },
  };
}

export default Enhancement;
