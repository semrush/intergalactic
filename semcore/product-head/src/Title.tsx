import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import isNode from '@semcore/utils/lib/isNode';

import style from './style/title.shadow.css';
import { IInfoItemProps } from './Info';

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
      <STitle render={Box} tag="h1">
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

const Title = createComponent(TitleRoot, {
  Tool,
}) as (<T>(props: IInfoItemProps & T) => React.ReactElement) & {
  Tool: typeof Box;
};

export default Title;
