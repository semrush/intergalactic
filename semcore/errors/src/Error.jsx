import { Box, Flex } from '@semcore/base-components';
import { createComponent, Root, AbstractComponent, sstyled } from '@semcore/core';
import { getIllustrationPath } from '@semcore/illustration';
import React from 'react';

import style from './style/errors.shadow.css';

export const getIconPath = (name) => getIllustrationPath(name);

class RootError extends AbstractComponent {
  static displayName = 'Error';
  static style = style;

  render() {
    const SError = Root;
    const { Children, styles, icon } = this.asProps;
    const SInner = 'div';
    const SImageWrapper = 'div';
    const SWrapper = 'div';
    const SImage = 'img';
    return sstyled(styles)(
      <SError render={Flex}>
        <SInner>
          {icon && (
            <SImageWrapper>
              {typeof icon === 'string' ? <SImage src={icon} alt='' /> : icon}
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
  const STitle = Root;
  return sstyled(props.styles)(<STitle render={Box} data-errors-title tag='h2' />);
}

function Description(props) {
  const SDescription = Root;
  return sstyled(props.styles)(<SDescription render={Box} tag='p' />);
}

function Controls(props) {
  const SControls = Root;
  return sstyled(props.styles)(<SControls render={Box} />);
}

export default createComponent(RootError, {
  Title,
  Description,
  Controls,
});
