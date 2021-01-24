import React, { ComponentClass, ComponentType, PureComponent } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getDisplayName from './getDisplayName';

function createHoc(
  EnhancedComponent,
): (options?: {}) => (WrappedComponent: ComponentType) => ComponentClass {
  return function createWrapper(options = {}) {
    return (WrappedComponent) => {
      class Component extends PureComponent {
        static displayName = getDisplayName(WrappedComponent);
        static defaultProps = WrappedComponent.defaultProps || {};

        render() {
          // @ts-ignore
          const { forwardedRef, ...others } = this.props;
          return (
            <EnhancedComponent {...options} {...this.props}>
              {(enhancedComponentProps) => (
                <WrappedComponent
                  forwardedRef={forwardedRef}
                  {...others}
                  {...enhancedComponentProps}
                />
              )}
            </EnhancedComponent>
          );
        }
      }

      return hoistNonReactStatics(Component, WrappedComponent);
    };
  };
}

export default createHoc;
