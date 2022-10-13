import React, { RefObject, useRef, useMemo, useState, useLayoutEffect } from 'react';
import createComponent, { Component, sstyled } from '@semcore/core';
import Tooltip from '@semcore/tooltip';
import { Flex } from '@semcore/flex-box';
import { useResizeObserver } from './useResizeObserver';

import style from './style/ellipsis.shadow.css';
import reactToText from '@semcore/utils/lib/reactToText';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

type AsProps = {
  maxLine?: number;
  trim?: 'end' | 'middle';
  tooltip?: boolean;
  styles?: React.CSSProperties;
  containerRect?: { width: number };
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  containerRef?: RefObject<HTMLElement | null>;
};

type AsPropsMiddle = {
  text: string;
  tooltip?: boolean;
  styles?: React.CSSProperties;
  containerRect?: { width: number };
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  containerRef?: RefObject<HTMLElement | null>;
};

class RootEllipsis extends Component<AsProps> {
  static displayName = 'Ellipsis';
  static style = style;
  static defaultProps: AsProps = {
    trim: 'end',
    tooltip: true,
  };

  render() {
    const SEllipsis = this.Root;
    const SContainer = Flex;
    const { styles, Children, maxLine, tooltip, trim, containerRect, containerRef } = this.asProps;
    const text = reactToText(getOriginChildren(Children));

    if (trim === 'middle') {
      return sstyled(styles)(
        <EllipsisMiddle
          text={text}
          styles={styles}
          tooltip={tooltip}
          containerRect={containerRect}
          containerRef={containerRef}
        />,
      );
    }
    if (tooltip) {
      return sstyled(styles)(
        <SContainer interaction="hover" title={text} tag={Tooltip}>
          <SEllipsis use:maxLine={maxLine} render="div" tag="div">
            <Children />
          </SEllipsis>
        </SContainer>,
      );
    }
    return sstyled(styles)(
      <SEllipsis use:maxLine={maxLine} render="div" tag="div">
        <Children />
      </SEllipsis>,
    );
  }
}

const EllipsisMiddle: React.FC<AsPropsMiddle> = (props) => {
  const { styles, text, tooltip, containerRect, containerRef } = props;
  const resizeElement = useRef<RefObject<HTMLElement | null>>(null);
  const [dimension, setDimension] = useState<{ fontSize: string; symbolWidth: number }>({
    fontSize: '14',
    symbolWidth: 0,
  });
  const blockWidth = useResizeObserver(resizeElement, containerRect).width;

  useLayoutEffect(() => {
    const dateSpan = document.createElement('temporary-block');
    dateSpan.setAttribute('style', `fontSize: ${dimension.fontSize}px`);
    dateSpan.innerHTML = 'a';
    document.body.appendChild(dateSpan);
    const rect = dateSpan.getBoundingClientRect();
    dateSpan.remove();

    setDimension({
      fontSize: window
        .getComputedStyle(containerRef?.current ?? resizeElement.current, null)
        .getPropertyValue('font-size'),
      symbolWidth: rect.width,
    });
  }, []);

  const STail = 'span';
  const SBeginning = 'span';
  const SContainerMiddle = Flex;
  const displayedSymbols = useMemo(
    () => Math.round(blockWidth / dimension.symbolWidth),
    [blockWidth, dimension.symbolWidth],
  );

  if (tooltip) {
    return sstyled(styles)(
      <SContainerMiddle
        interaction="hover"
        title={text}
        ref={containerRef ?? resizeElement}
        tag={Tooltip}
      >
        <SBeginning>{text.substring(0, text.length - displayedSymbols / 2 - 1)}</SBeginning>
        <STail>{text.substring(text.length - displayedSymbols / 2 - 1)}</STail>
      </SContainerMiddle>,
    ) as any;
  } else {
    return sstyled(styles)(
      <SContainerMiddle ref={containerRef ?? resizeElement}>
        <SBeginning>{text.substring(0, text.length - displayedSymbols / 2 - 1)}</SBeginning>
        <STail>{text.substring(text.length - displayedSymbols / 2 - 1)}</STail>
      </SContainerMiddle>,
    ) as any;
  }
};

const Ellipsis = createComponent(RootEllipsis);

export default Ellipsis;
