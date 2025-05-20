import React from 'react';
import {
  createComponent,
  Component,
  sstyled,
  Root,
  UnknownProperties,
  Intergalactic,
} from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import isNode from '@semcore/core/lib/utils/isNode';

import style from './style/title.shadow.css';

/** @deprecated */
export interface IHeaderTitleProps extends HeaderTitleProps, UnknownProperties {}
export type HeaderTitleProps = BoxProps & {
  toolName?: React.ReactNode;
};

class TitleRoot extends Component<IHeaderTitleProps> {
  static displayName = 'Title';
  static style = style;

  render() {
    const STitle = Root;
    const SName = 'div';
    const { Children, styles, toolName } = this.asProps;
    return sstyled(styles)(
      <STitle render={Box} tag='h1'>
        {isNode(toolName) && <Title.Tool>{toolName}</Title.Tool>}
        <SName>
          <Children />
        </SName>
      </STitle>,
    );
  }
}

function Tool(props: any) {
  const STool = Root;
  return sstyled(props.styles)(<STool render={Box} />);
}

const Title = createComponent(TitleRoot, {
  Tool,
}) as any as Intergalactic.Component<'h1', HeaderTitleProps> & {
  Tool: typeof Box;
};

export default Title;
