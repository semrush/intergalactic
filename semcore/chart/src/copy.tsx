import React, { Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getDisplayName from '@semcore/utils/lib/getDisplayName';

function copyComponent(WrappedComponent, { defaultProps = {}, ...over }) {
  class CopyComponent extends Component {
    static displayName = getDisplayName(WrappedComponent);
    static defaultProps = {
      ...(WrappedComponent.defaultProps || {}),
      ...defaultProps,
    };

    constructor(props) {
      super(props);

      for (const name in over) {
        if (over.hasOwnProperty(name)) {
          if (typeof over[name] === 'function') {
            this[name] = over[name].bind(this);
          }
        }
      }
    }
  }

  function forwardRef(props, ref) {
    return <CopyComponent {...props} forwardedRef={ref} />;
  }

  const ComponentWithRefForwarding = React.forwardRef(forwardRef);
  ComponentWithRefForwarding.displayName = getDisplayName(WrappedComponent);
  ComponentWithRefForwarding.defaultProps = WrappedComponent.defaultProps
    ? { ...WrappedComponent.defaultProps, ...defaultProps }
    : defaultProps;
  return hoistNonReactStatics(ComponentWithRefForwarding, WrappedComponent);
}

export default copyComponent;
