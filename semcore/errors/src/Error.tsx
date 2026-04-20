import { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Root, Component, sstyled } from '@semcore/core';
import { getIllustrationPath } from '@semcore/illustration';
import React from 'react';

import type { ErrorComponent, ErrorControlsComponent, ErrorDescriptionComponent, ErrorRootComponent, ErrorTitleComponent, IconNamesErrors } from './Error.type';
import style from './style/errors.shadow.css';

export const getIconPath = (name: IconNamesErrors) => getIllustrationPath(name);

class RootError extends Component<
  Intergalactic.InternalTypings.InferComponentProps<ErrorRootComponent>
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

function Title(props: Intergalactic.InternalTypings.InferComponentProps<ErrorTitleComponent>) {
  const STitle = Root;
  return sstyled(props.styles)(<STitle render={Box} data-errors-title tag='h2' />);
}

function Description(props: Intergalactic.InternalTypings.InferComponentProps<ErrorDescriptionComponent>) {
  const SDescription = Root;
  return sstyled(props.styles)(<SDescription render={Box} tag='p' />);
}

function Controls(props: Intergalactic.InternalTypings.InferComponentProps<ErrorControlsComponent>) {
  const SControls = Root;
  return sstyled(props.styles)(<SControls render={Box} />);
}

const Error = createComponent(RootError, {
  Title,
  Description,
  Controls,
}) as ErrorComponent;

export default Error;
