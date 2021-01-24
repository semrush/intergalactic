import React, { ComponentProps, HTMLAttributes } from 'react';
import { Box, Flex, IFlexProps } from '@semcore/flex-box';
import createComponent, { Component, Merge, styled } from '@semcore/core';
import style from './style/errors.shadow.css';
// @ts-ignore
const version = preval`
  module.exports = require('../package.json').version
`;

export type iconNames =
  | 'access_denied'
  | 'blocked'
  | 'confirmation'
  | 'connection_lost'
  | 'deleted_account'
  | 'dns'
  | 'maintenance'
  | 'no_payment'
  | 'page_error'
  | 'page_not_found'
  | 'project_not_found'
  | 'timeout';
export const getIconPath = (name: iconNames) =>
  `//static.semrush.com/ui-kit/errors/${version}/${name}.svg`;

export interface IErrorsProps extends IFlexProps {
  /**
   * Error icon
   */
  icon?: string | React.ReactNode;
}

class RootError extends Component<IErrorsProps> {
  static displayName = 'Error';
  static style = style;

  render() {
    const SError = this.Root;
    const { Children, icon, styles } = this.asProps;
    const SInner = 'div';
    const SImageWrapper = 'div';
    const SWrapper = 'div';
    return styled(styles)(
      <SError render={Flex}>
        <SInner>
          {icon && (
            <SImageWrapper>
              {typeof icon === 'string' ? (
                <img width={240} height={240} src={icon} alt="error icon" />
              ) : (
                icon
              )}
            </SImageWrapper>
          )}
          <SWrapper>
            <Children />
          </SWrapper>
        </SInner>
      </SError>,
    );
  }
}

function Title(props) {
  const { Root: STitle, styles } = props;
  return styled(styles)(<STitle render={Box} />);
}

Title.defaultProps = {
  tag: 'h2',
};

function Description(props) {
  const { Root: SDescription, styles } = props;
  return styled(styles)(<SDescription render={Box} />);
}

Description.defaultProps = {
  tag: 'p',
};

function Controls(props) {
  const { Root: SControls, styles } = props;
  return styled(styles)(<SControls render={Box} />);
}

export default createComponent<
  Merge<IErrorsProps, HTMLAttributes<HTMLDivElement>>,
  {
    Title: ComponentProps<typeof Box>;
    Description: ComponentProps<typeof Box>;
    Controls: ComponentProps<typeof Box>;
  }
>(RootError, {
  Title,
  Description,
  Controls,
});
