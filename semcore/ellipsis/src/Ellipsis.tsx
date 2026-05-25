import { Box, type BoxProps } from '@semcore/base-components';
import { createComponent, Component, type Intergalactic, Root, sstyled } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import findComponent, { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import pick from '@semcore/core/lib/utils/pick';
import reactToText from '@semcore/core/lib/utils/reactToText';
import { forkRef } from '@semcore/core/lib/utils/ref';
import useEnhancedEffect from '@semcore/core/lib/utils/use/useEnhancedEffect';
import Tooltip, { type TooltipProps } from '@semcore/tooltip';
import React, { type RefObject } from 'react';

import style from './style/ellipsis.shadow.css';
import { useResizeObserver } from './useResizeObserver';
import { isTextOverflowing, setFontSettings } from './utils';

type AsProps = {
  maxLine?: number;
  trim?: 'end' | 'middle';
  tooltip?: boolean;
  styles?: React.CSSProperties;
  containerRect?: { width: number };

  containerRef?: RefObject<HTMLDivElement>;
  includeTooltipProps?: string[];
  __excludeProps?: string[];
};

type AsPropsMiddle = {
  text: string;
  textRef: RefObject<HTMLElement>;
  tooltip?: boolean;
  styles?: React.CSSProperties;
  containerRect?: { width: number };

  containerRef?: RefObject<HTMLDivElement>;
  tooltipProps: TooltipProps;
  children?: React.ReactNode;
  advanceMode?: boolean;
  tag?: React.ElementType;
};

type EllipsisProps = BoxProps &
  Partial<TooltipProps> & {
    /**
     * Rows count in multiline Ellipsis
     * @default 1
     */
    maxLine?: number;
    /**
     * Trimming type
     * @default end
     */
    trim?: 'end' | 'middle';
    /**
     * Show tooltip
     * @default true
     */
    tooltip?: boolean;
    /**
     * Ref to the item that will be observed by ResizeObserver
     */
    containerRef?: RefObject<HTMLDivElement>;
    /**
     * Explicit sizes of container text should be trimmed in
     **/
    containerRect?: { width: number };
    /** List of props that will be passed to tooltip
     * @default ['title', 'theme', 'strategy', 'modifiers', 'placement', 'interaction', 'timeout', 'visible', 'defaultVisible', 'onVisibleChange', 'offset', 'preventOverflow', 'arrow', 'flip', 'computeStyles', 'eventListeners', 'onFirstUpdate']
     */
    includeTooltipProps?: string[];
  };

const defaultTooltipProps = [
  'title',
  'theme',
  'strategy',
  'modifiers',
  'placement',
  'interaction',
  'timeout',
  'visible',
  'defaultVisible',
  'onVisibleChange',
  'offset',
  'preventOverflow',
  'arrow',
  'flip',
  'computeStyles',
  'eventListeners',
  'onFirstUpdate',
  'cursorAnchoring',
];

const forcedAdvancedMode = { forcedAdvancedMode: true } as any;
const noAdvancedMode = {} as any;

class RootEllipsis extends Component<AsProps> {
  static displayName = 'Ellipsis';
  static style = style;
  static defaultProps: AsProps = {
    trim: 'end',
    tooltip: true,
    includeTooltipProps: defaultTooltipProps,
    __excludeProps: ['title'],
  };

  state = {
    visible: false,
  };

  textRef = React.createRef<HTMLDivElement>();

  showTooltip() {
    const { maxLine = 1, Children } = this.asProps;
    const text = reactToText(getOriginChildren(Children));
    return isTextOverflowing(this.textRef.current, maxLine > 1, text);
  }

  handlerVisibleChange = (visible: boolean) => {
    this.setState({ visible: visible && this.showTooltip() });
  };

  getContentProps() {
    return {
      ref: this.textRef,
      maxLine: this.asProps.maxLine,
    };
  }

  getPopperProps() {
    const { Children, includeTooltipProps } = this.asProps;
    const text = reactToText(getOriginChildren(Children));
    const tooltipProps = pick(this.asProps, includeTooltipProps as any) as TooltipProps;
    return { children: text, ...tooltipProps };
  }

  render() {
    const SEllipsis = this.Root;
    const SContainer = Tooltip;
    const {
      styles,
      Children,
      maxLine,
      tooltip,
      trim,
      containerRect,
      containerRef,
      includeTooltipProps,
      children: _children,
      ...other
    } = this.asProps;
    const { visible } = this.state;
    const advancedContent = findComponent(Children, [(Ellipsis as any).Content.displayName]);
    const text = reactToText(advancedContent || getOriginChildren(Children));
    const advanceMode = isAdvanceMode(Children, [
      (Ellipsis as any).Content.displayName,
      (Ellipsis as any).Popper.displayName,
    ]);
    const tooltipProps = pick(this.asProps, includeTooltipProps as any) as TooltipProps;

    tooltipProps.visible = tooltipProps.visible ?? visible;
    tooltipProps.onVisibleChange = tooltipProps.onVisibleChange
      ? callAllEventHandlers(tooltipProps.onVisibleChange, this.handlerVisibleChange)
      : this.handlerVisibleChange;

    if (trim === 'middle') {
      return sstyled(styles)(
        <EllipsisMiddle
          text={text}
          styles={styles}
          tooltip={tooltip}
          containerRect={containerRect}
          containerRef={containerRef}
          textRef={this.textRef}
          tooltipProps={tooltipProps}
          advanceMode={advanceMode}
          {...other}
        >
          <Children />
        </EllipsisMiddle>,
      );
    }

    return sstyled(styles)(
      <SContainer
        interaction={tooltip ? 'hover' : 'none'}
        title={!advanceMode ? text : undefined}
        {...tooltipProps}
        {...(advanceMode ? forcedAdvancedMode : noAdvancedMode)}
      >
        {advanceMode
          ? (
              <Children />
            )
          : (
              <SEllipsis render={Box} ref={this.textRef} maxLine={maxLine} {...other}>
                <Children />
              </SEllipsis>
            )}
      </SContainer>,
    );
  }
}

const EllipsisMiddleContext = React.createContext<null | {
  begining: string;
  tail: string;
  ref: React.RefObject<HTMLElement>;
}>(null);

function EllipsisMiddle(props: AsPropsMiddle) {
  const {
    styles,
    text,
    tooltip,
    containerRect,
    containerRef,
    textRef,
    tooltipProps,
    children,
    advanceMode,
    tag,
  } = props;

  const resizeElement = React.useRef<HTMLDivElement>(null);
  const [symbolWidth, setSymbolWidth] = React.useState(0);
  const blockWidth = useResizeObserver(resizeElement, containerRect).width;

  useEnhancedEffect(() => {
    const node = containerRef?.current || resizeElement?.current;
    if (!node) return;

    const styleElement = window.getComputedStyle(node);
    const dateSpan = document.createElement('temporary-block');

    setFontSettings(dateSpan, styleElement);
    dateSpan.textContent = 'a';
    document.body.appendChild(dateSpan);
    const rect = dateSpan.getBoundingClientRect();

    setSymbolWidth(rect.width);
    document.body.removeChild(dateSpan);
  }, []);

  const STail = 'span';
  const SBeginning = 'span';
  const SContainerMiddle = Tooltip;
  const SAdvancedModeContainerMiddle = Tooltip;
  const displayedSymbols = React.useMemo(
    () => {
      const displayedSymbols = Math.round(blockWidth / symbolWidth);

      return displayedSymbols % 2 === 0 ? displayedSymbols : displayedSymbols - 1;
    },
    [blockWidth, symbolWidth],
  );

  const interaction = text.length > displayedSymbols ? 'hover' : 'none';
  const ref = containerRef ?? resizeElement;
  const contextValue = React.useMemo(
    () => ({
      begining: text.substring(0, text.length - displayedSymbols / 2 - 1),
      tail: text.substring(text.length - displayedSymbols / 2 - 1),
      ref,
    }),
    [text, displayedSymbols],
  );

  if (advanceMode) {
    return sstyled(styles)(
      <SAdvancedModeContainerMiddle
        interaction={tooltip ? interaction : 'none'}
        {...tooltipProps}
        {...forcedAdvancedMode}
      >
        <EllipsisMiddleContext.Provider value={contextValue}>
          {children}
        </EllipsisMiddleContext.Provider>
      </SAdvancedModeContainerMiddle>,
    );
  }
  return sstyled(styles)(
    <SContainerMiddle
      interaction={tooltip ? interaction : 'none'}
      title={text}
      ref={forkRef(ref, textRef)}
      tag={tag}
      {...tooltipProps}
    >
      <SBeginning>{contextValue.begining}</SBeginning>
      <STail>{contextValue.tail}</STail>
    </SContainerMiddle>,
  );
}

type EllipsisContentAsProps = {
  styles: any;
  Children: React.FC;
};

function Content({ styles, Children }: EllipsisContentAsProps) {
  const SEllipsis = Root;
  const ellipsisMiddleContext = React.useContext(EllipsisMiddleContext);
  const STail = 'span';
  const SBeginning = 'span';

  if (ellipsisMiddleContext) {
    const { begining, tail, ref } = ellipsisMiddleContext;
    return sstyled(styles)(
      <SEllipsis render={Tooltip.Trigger} middle-mod ref={ref}>
        <SBeginning>{begining}</SBeginning>
        <STail>{tail}</STail>
      </SEllipsis>,
    ) as any;
  }

  return sstyled(styles)(
    <SEllipsis render={Tooltip.Trigger}>
      <Children />
    </SEllipsis>,
  ) as any;
}

/**
 * Ellipsis
 *
 * {@link https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis-api/|API} | {@link https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis-code/|Examples}
 */
const Ellipsis = createComponent(RootEllipsis, {
  Content,
  Popper: Tooltip.Popper,
}) as any as Intergalactic.Component<'div', EllipsisProps> & {
  Content: typeof Box;
  Popper: typeof Tooltip.Popper;
};

export default Ellipsis;
