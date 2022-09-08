import React, { useRef } from 'react';
import createComponent, { Component, sstyled } from '@semcore/core';
import Tooltip from '@semcore/tooltip';
import { Flex } from '@semcore/flex-box';
import { useResizeObserver } from './useResizeObserver';

import style from './style/ellipsis.shadow.css';
import reactToText from '@semcore/utils/lib/reactToText';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

type AsProps = {
  maxline?: number;
  trim?: string;
  tooltip?: string;
  styles?: React.CSSProperties;
};

const gotSize = () => {
  const dateSpan = document.createElement('span');
  dateSpan.innerHTML = 'a';
  document.body.appendChild(dateSpan);
  const rect = dateSpan.getBoundingClientRect();
  dateSpan.remove();
  return rect.width;
};

class RootEllipsis extends Component<AsProps> {
  static displayName = 'Ellipsis';
  static style = style;
  static defaultProps: AsProps = {
    maxline: 1,
    trim: 'end',
    tooltip: 'visible',
  };

  render() {
    const SEllipsis = this.Root;
    const { styles, Children, maxline, tooltip, trim } = this.asProps;
    const text = reactToText(getOriginChildren(Children));

    if (trim === 'middle') {
      return sstyled(styles)(<EllipsisMiddle text={text} styles={styles} tooltip={tooltip} />);
    }
    if (tooltip) {
      return sstyled(styles)(
        <Tooltip interaction="hover" title={text}>
          <SEllipsis use:maxline={maxline} render="div" tag="div">
            <Children />
          </SEllipsis>
        </Tooltip>,
      );
    }
    return sstyled(styles)(
      <SEllipsis use:maxline={maxline} render="div" tag="div">
        <Children />
      </SEllipsis>,
    );
  }
}

const EllipsisMiddle = (props) => {
  const { styles, text, tooltip } = props;
  const resizeElement = useRef(null);
  const size = gotSize();

  const blockWidth = useResizeObserver(resizeElement).width;

  const STail = 'span';
  const SBeginning = 'span';
  const symbolAmount = blockWidth ? Math.round(blockWidth / size) : 20;

  if (tooltip) {
    return sstyled(styles)(
      <Tooltip
        interaction="hover"
        title={text}
        ref={resizeElement}
        className="observable"
        tag={Flex}
      >
        <SBeginning>{text.slice(0, text.length - symbolAmount / 2 - 1)}</SBeginning>
        <STail>{text.slice(text.length - symbolAmount / 2 - 1)}</STail>
      </Tooltip>,
    );
  } else {
    return sstyled(styles)(
      <Flex tag="span" ref={resizeElement} className="observable">
        <SBeginning>{text.slice(0, text.length - symbolAmount / 2 - 1)}</SBeginning>
        <STail>{text.slice(text.length - symbolAmount / 2 - 1)}</STail>
      </Flex>,
    );
  }
};

const Ellipsis = createComponent(RootEllipsis);

export default Ellipsis;
