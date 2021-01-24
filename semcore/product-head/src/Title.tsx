import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, { Component, Merge, styled } from '@semcore/core';
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
    const STitle = this.Root;
    const { Children, styles, toolName } = this.asProps;
    const SName = 'div';
    return styled(styles)(
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
  const { Root: STool, styles } = props;
  return styled(styles)(<STool render={Box} />);
}

const Title = createComponent<
  Merge<IHeaderTitleProps, HTMLAttributes<HTMLDivElement>>,
  {
    Tool: ComponentProps<typeof Box>;
  }
>(TitleRoot, {
  Tool,
});

export default Title;
