import { sstyled } from '@semcore/core';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import useEnhancedEffect from '@semcore/core/lib/utils/use/useEnhancedEffect';
import React from 'react';

import styles from './hoveredTick.shadow.css';
import type { ChartMetaData } from '../../ChartMetaData';

const HOVERED_TICK_MARGIN_Y = 8;
const HOVERED_TICK_PADDING_Y = 3;
const HOVERED_TICK_PADDING_X = 12;

type HoveredTickProps = {
  tickFormatter: (value: unknown) => string;
  value: unknown;
  isFirstTick?: boolean;
  isLastTick?: boolean;
  size: ReturnType<ChartMetaData['getTicksSize']>;
  position: ReturnType<ChartMetaData['getTicksPosition']>;
  xRange: number[];
  yRange: number[];
} & ({ x: number; y?: never } | { y: number; x?: never });

export function HoveredTick(props: HoveredTickProps) {
  const { tickFormatter, value, isFirstTick = false, isLastTick = false, x, yRange, y, size, position } = props;

  const formattedValue = tickFormatter(value);

  const contentRef = React.useRef(null);

  const isRendered = size?.width !== undefined && size?.height !== undefined && position !== null;
  const isMightBeInteractive = formattedValue !== null && typeof formattedValue === 'object';

  useEnhancedEffect(() => {
    if (!isRendered || !isMightBeInteractive || !contentRef.current) return;

    getFocusableIn(contentRef.current).forEach((node) => node.setAttribute('tabindex', '-1'));
  }, [value, isRendered, isMightBeInteractive]);

  if (!isRendered) return null;

  const { width, height } = size;

  const SHoveredTickWrapper = 'foreignObject';
  const SHoveredTickContent = 'div';
  const SHoveredTick = 'span';

  const w = width + HOVERED_TICK_PADDING_X * 2;

  let tickX: number;
  let tickY: number;

  if (x !== undefined) {
    tickX = isFirstTick
      ? x
      : isLastTick
        ? x - w
        : x - w / 2;

    tickY = position === 'top'
      ? yRange[1] - height - HOVERED_TICK_MARGIN_Y + HOVERED_TICK_PADDING_Y
      : yRange[0] + HOVERED_TICK_MARGIN_Y - HOVERED_TICK_PADDING_Y;
  } else {
    tickX = 0 - HOVERED_TICK_PADDING_X;

    tickY = isFirstTick
      ? y
      : isLastTick
        ? y - height
        : y - height / 2;
  }

  return sstyled(styles)(
    <SHoveredTickWrapper
      x={tickX}
      y={tickY}
      width={w}
      height={height}
      data-is-first={isFirstTick}
      data-is-last={isLastTick}
      data-hovered-tick
      aria-hidden='true'
      // @ts-expect-error for css only
      position={position}
    >
      <SHoveredTickContent ref={contentRef}>
        <SHoveredTick>{formattedValue}</SHoveredTick>
      </SHoveredTickContent>
    </SHoveredTickWrapper>,
  );
}
