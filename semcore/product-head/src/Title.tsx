import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, { Component, Merge, sstyled, Root } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import isNode from '@semcore/utils/lib/isNode';

import style from './style/title.shadow.css';

export interface IHeaderTitleProps extends IBoxProps {
  toolName?: React.ReactNode;
}

class TitleRoot extends Component<IHeaderTitleProps> {
  static displayName = 'Title';
  static style = style;

  render() {
    const STitle = Root;
    const SName = 'div';
    const { Children, styles, toolName } = this.asProps;
    return sstyled(styles)(
      <STitle render={Box}>
        {isNode(toolName) && <Title.Tool>{toolName}</Title.Tool>}
        <SName>
          <Children />
        </SName>
      </STitle>,
    );
  }
}

function Tool(props) {
  const STool = Root;
  return sstyled(props.styles)(<STool render={Box} />);
}

const Title = createComponent<
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  Merge<IHeaderTitleProps, HTMLAttributes<HTMLDivElement>>,
  {
    Tool: ComponentProps<typeof Box>;
  }
>(TitleRoot, {
  Tool,
});

export default Title;
