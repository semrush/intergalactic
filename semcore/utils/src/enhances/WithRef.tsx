/* eslint-disable */
import React from 'react';
import getDisplayName from '../getDisplayName';
import hoistNonReactStatics from 'hoist-non-react-statics';

function WithForwardRef() {
  return function ForwardRef<T extends React.ComponentType>(Component: T) {
    const Wrapped = React.forwardRef((props, ref) => {
      // @ts-ignore
      return <Component {...props} forwardedRef={ref} />;
    });
    Wrapped.displayName = getDisplayName(Component);
    Wrapped.defaultProps = Component.defaultProps;
    return hoistNonReactStatics(Wrapped, Component);
  };
}

export default WithForwardRef;
