import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import style from './style/title.shadow.css';
import type { NSProductHeadTitle } from './Title.type';

class TitleRoot extends Component<Intergalactic.InternalTypings.InferComponentProps<NSProductHeadTitle.Component>> {
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

function Tool(props: Intergalactic.InternalTypings.InferComponentProps<NSProductHeadTitle.Tool.Component>) {
  const STool = Root;
  return sstyled(props.styles)(<STool render={Box} />);
}

const Title = createComponent<NSProductHeadTitle.Component, typeof TitleRoot>(TitleRoot, {
  Tool,
});

export default Title;
