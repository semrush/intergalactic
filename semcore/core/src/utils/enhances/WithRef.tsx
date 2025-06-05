import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';

import getDisplayName from '../getDisplayName';

function WithForwardRef() {
  return function ForwardRef<T extends React.ComponentType>(Component: T) {
    const Wrapped = React.forwardRef((props, ref) => {
      // @ts-ignore
      return <Component {...(Component.defaultProps || {})} {...props} forwardedRef={ref} />;
    });
    Wrapped.displayName = getDisplayName(Component);
    return hoistNonReactStatics(Wrapped, Component) as any;
  };
}

export default WithForwardRef;
