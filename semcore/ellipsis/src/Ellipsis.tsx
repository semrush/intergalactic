import React, { RefObject, useRef, useMemo } from 'react';
import createComponent, { Component, sstyled } from '@semcore/core';
import Tooltip from '@semcore/tooltip';
import { Flex } from '@semcore/flex-box';
import { useResizeObserver } from './useResizeObserver';

import style from './style/ellipsis.shadow.css';
import reactToText from '@semcore/utils/lib/reactToText';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

type AsProps = {
  maxline?: number;
  trim?: 'end' | 'middle';
  tooltip?: string;
  styles?: React.CSSProperties;
  resizeObserver?: { width: number };
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  containerRef?: RefObject<HTMLElement | null>;
};

type AsPropsMiddle = {
  text: string;
  tooltip?: string;
  styles?: React.CSSProperties;
  resizeObserver?: { width: number };
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  containerRef?: RefObject<HTMLElement | null>;
};

const gotSize = (fontSize: string) => {
  const dateSpan = document.createElement('span');
  dateSpan.setAttribute('style', `fontSize: ${fontSize}px`);
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
    trim: 'end',
    tooltip: 'visible',
  };

  render() {
    const SEllipsis = this.Root;
    const SContainer = Flex;
    const { styles, Children, maxline, tooltip, trim, resizeObserver, containerRef } = this.asProps;
    const text = reactToText(getOriginChildren(Children));

    if (trim === 'middle') {
      return sstyled(styles)(
        <EllipsisMiddle
          text={text}
          styles={styles}
          tooltip={tooltip}
          resizeObserver={resizeObserver}
          containerRef={containerRef}
        />,
      );
    }
    if (tooltip) {
      return sstyled(styles)(
        <SContainer interaction="hover" title={text} tag={Tooltip}>
          <SEllipsis use:maxline={maxline} render="div" tag="div">
            <Children />
          </SEllipsis>
        </SContainer>,
      );
    }
    return sstyled(styles)(
      <SEllipsis use:maxline={maxline} render="div" tag="div">
        <Children />
      </SEllipsis>,
    );
  }
}

const EllipsisMiddle: React.FC<AsPropsMiddle> = (props) => {
  const { styles, text, tooltip, resizeObserver, containerRef } = props;
  const resizeElement = useRef(null);
  const blockWidth = useResizeObserver(resizeElement, resizeObserver).width;
  const element = containerRef?.current ?? resizeElement.current;
  const fontSize = element
    ? window.getComputedStyle(element, null).getPropertyValue('font-size')
    : '14';
  const size = useMemo(() => gotSize(fontSize), [fontSize]);
  const STail = 'span';
  const SBeginning = 'span';
  const SContainerMiddle = Flex;
  const symbolAmount = Math.round(blockWidth / size);

  if (tooltip) {
    return sstyled(styles)(
      <SContainerMiddle
        interaction="hover"
        title={text}
        ref={containerRef ?? resizeElement}
        tag={Tooltip}
      >
        <SBeginning>{text.slice(0, text.length - symbolAmount / 2 - 1)}</SBeginning>
        <STail>{text.slice(text.length - symbolAmount / 2 - 1)}</STail>
      </SContainerMiddle>,
    ) as any;
  } else {
    return sstyled(styles)(
      <SContainerMiddle ref={containerRef ?? resizeElement}>
        <SBeginning>{text.slice(0, text.length - symbolAmount / 2 - 1)}</SBeginning>
        <STail>{text.slice(text.length - symbolAmount / 2 - 1)}</STail>
      </SContainerMiddle>,
    ) as any;
  }
};

const Ellipsis = createComponent(RootEllipsis);

export default Ellipsis;
