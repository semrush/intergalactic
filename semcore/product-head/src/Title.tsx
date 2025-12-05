import { Box, type BoxProps } from '@semcore/base-components';
import {
  createComponent,
  Component,
  sstyled,
  Root,
  type Intergalactic,
} from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import style from './style/title.shadow.css';

export type HeaderTitleProps = BoxProps & {
  /** A tool name that appears as part of the header title */
  toolName?: React.ReactNode;
};

class TitleRoot extends Component<HeaderTitleProps> {
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
