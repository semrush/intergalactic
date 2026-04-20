import { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Root, Component, sstyled } from '@semcore/core';
import { getIllustrationPath } from '@semcore/illustration';
import React from 'react';

import type { NSError } from './Error.type';
import style from './style/errors.shadow.css';

export const getIconPath = (name: NSError.IconName) => getIllustrationPath(name);

class RootError extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSError.Component>
> {
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

function Title(props: Intergalactic.InternalTypings.InferComponentProps<NSError.Title.Component>) {
  const STitle = Root;
  return sstyled(props.styles)(<STitle render={Box} data-errors-title tag='h2' />);
}

function Description(props: Intergalactic.InternalTypings.InferComponentProps<NSError.Description.Component>) {
  const SDescription = Root;
  return sstyled(props.styles)(<SDescription render={Box} tag='p' />);
}

function Controls(props: Intergalactic.InternalTypings.InferComponentProps<NSError.Controls.Component>) {
  const SControls = Root;
  return sstyled(props.styles)(<SControls render={Box} />);
}

const Error = createComponent(RootError, {
  Title,
  Description,
  Controls,
}) as NSError.Component;

export default Error;
