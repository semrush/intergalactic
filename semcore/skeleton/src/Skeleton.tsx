import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import React from 'react';

import type { NSSkeleton } from './Skeleton.type';
import style from './style/skeleton.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class SkeletonRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSSkeleton.RenderComponent>,
  typeof SkeletonRoot.enhance,
  {},
  {},
  {},
  NSSkeleton.DefaultProps
> {
  static displayName = 'Skeleton';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    duration: 2000,
  } as const;

  render() {
    const SSkeleton = Root;
    const { styles, duration, hidden, getI18nText } = this.asProps;

    if (hidden) return null;

    return sstyled(styles)(
      <SSkeleton
        render={Box}
        width='100%'
        height='100%'
        durationAnim={`${duration}ms`}
        role='img'
        aria-label={getI18nText('loading')}
      />,
    );
  }
}

class SkeletonSVG extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSSkeleton.Component>,
  typeof SkeletonRoot.enhance,
  never,
  {},
  {},
  NSSkeleton.DefaultProps
> {
  static displayName = 'SkeletonSVG';
  static enhance = [uniqueIDEnhancement()];
  static style = style;

  static defaultProps = (props: Intergalactic.InternalTypings.InferComponentProps<NSSkeleton.Component>) => {
    return {
      theme: props.invert ? undefined : 'invert',
      duration: 2000,
    } as const;
  };

  svgRef = React.createRef<SVGElement>();
  private observer: ResizeObserver | null = null;

  constructor(props: NSSkeleton.Props) {
    super(props);

    if (canUseDOM() && props.observeParentSize) {
      this.observer = new ResizeObserver(this.handleResize.bind(this));
    }
  }

  componentDidMount() {
    const { current } = this.svgRef;

    if (current && current.parentElement) {
      this.observer?.observe(current.parentElement);
    }
  }

  componentWillUnmount() {
    this.observer?.disconnect();
  }

  handleResize(entries: ResizeObserverEntry[]) {
    const target = entries[0].target;
    const svg = this.svgRef.current;

    if (target && svg) {
      svg.setAttribute('width', '100%');
    }
  }

  render() {
    const { Children, styles, uid, theme, duration } = this.asProps;
    const SSkeletonSVG = Root;

    return sstyled(styles)(
      <SSkeletonSVG
        render={Skeleton}
        tag='svg'
        ref={this.svgRef}
        preserveAspectRatio='none'
        theme={theme}
        durationAnim={`${duration}ms`}
      >
        <defs>
          <mask id={uid}>
            <Children />
          </mask>
        </defs>
        <rect x='0' y='0' width='100%' height='100%' mask={`url(#${uid})`} />
      </SSkeletonSVG>,
    );
  }
}

function Text(
  props: Intergalactic.InternalTypings.InferComponentProps<NSSkeleton.Text.Component>,
) {
  const SText = Box;
  const { y = 0, x = 0, amount = 1, width = '100%', styles, forwardRef, ...other } = props;
  const amountLine = Number(amount);

  return (
    <React.Fragment>
      {[...Array(amountLine)].map((_el, index) =>
        sstyled(styles)(
          <SText
            tag='rect'
            rx='4'
            ry='4'
            height='8'
            key={index}
            y={y || 20 * index}
            x={x}
            ref={forwardRef}
            width={width}
            {...other}
          />,
        ),
      )}
    </React.Fragment>
  );
}

/**
 * Skeleton
 *
 * {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-api/|API} | {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-code/|Examples}
 */
const Skeleton = createComponent<
  NSSkeleton.RenderComponent,
  typeof SkeletonRoot
>(SkeletonRoot);

export { Skeleton };

/**
 * Skeleton SVG
 *
 * {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-api/|API} | {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-code/|Examples}
 */
export default createComponent<
  NSSkeleton.Component,
  typeof SkeletonSVG
>(SkeletonSVG, {
  Text,
});
