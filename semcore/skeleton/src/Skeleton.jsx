import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

import style from './style/skeleton.shadow.css';

const MAP_COLOR_THEME = {
  dark: 'rgba(255, 255, 255, 0.3)',
  invert: 'rgba(224, 225, 233, 0.8)',
};

class SkeletonRoot extends Component {
  static displayName = 'Skeleton';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    width: '100%',
    height: '100%',
    duration: 2000,
  };

  render() {
    const SSkeleton = Root;
    const { Children, styles, duration, hidden, getI18nText, tag } = this.asProps;

    if (hidden) return null;

    return sstyled(styles)(
      <SSkeleton
        render={Box}
        durationAnim={`${duration}ms`}
        role={'img'}
        aria-label={getI18nText('loading')}
      />,
    );
  }
}

class SkeletonSVG extends Component {
  static displayName = 'SkeletonSVG';
  static enhance = [uniqueIDEnhancement()];
  static style = style;

  static defaultProps = {
    theme: 'invert',
    duration: 2000,
  };

  svgRef = React.createRef();

  constructor(props) {
    super(props);

    if (canUseDOM() && props.observeParentSize) {
      this.observer = new ResizeObserver(this.handleResize.bind(this));
    }
  }

  componentDidMount() {
    this.observer?.observe(this.svgRef.current?.parentElement);
  }

  componentWillUnmount() {
    this.observer?.disconnect();
  }

  handleResize(data) {
    const target = data[0].target;
    const svg = this.svgRef.current;

    if (target && svg) {
      svg.setAttribute('width', '100%');
    }
  }

  setContext() {
    const { theme } = this.asProps;
    return {
      gradientUrl: MAP_COLOR_THEME[theme],
    };
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

function Text(props) {
  const SText = Box;
  const { y = 0, x = 0, amount = 1, width = '100%', styles, forwardRef, ...other } = props;
  const amountLine = Number(amount);

  const renderRect = (props) => {
    return sstyled(styles)(<SText tag='rect' rx='4' ry='4' height='8' {...props} />);
  };

  return (
    <React.Fragment>
      {[...Array(amountLine)].map((el, index) =>
        renderRect({
          key: index,
          y: y || 20 * index,
          x,
          ref: forwardRef,
          width,
          ...other,
        }),
      )}
    </React.Fragment>
  );
}

const Skeleton = createComponent(SkeletonRoot);

export { Skeleton };

export default createComponent(SkeletonSVG, {
  Text,
});
