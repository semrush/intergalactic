import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';
import { eventToPoint, uniqueId } from './utils';
import { PlotA11yModule } from './a11y/PlotA11yModule';
import { makeDataHintsHandlers, makeDataHintsContainer } from './a11y/hints';
import colorResolverEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

import style from './style/plot.shadow.css';

class PlotRoot extends Component {
  static displayName = 'Plot';
  static style = style;

  constructor(props) {
    super(props);
    this.eventEmitter = props.eventEmitter || new EventEmitter();
  }

  static defaultProps = () => ({
    width: 0,
    height: 0,
  });

  static enhance = [keyboardFocusEnhance(), colorResolverEnhance(), i18nEnhance(localizedMessages)];

  plotId = uniqueId();

  rootRef = React.createRef();

  dataStructureHints = this.props.dataHints || makeDataHintsContainer();
  dataHintsHandler = makeDataHintsHandlers(this.dataStructureHints);

  handlerMouseMove = (e) => {
    const { scale } = this.asProps;
    this.eventEmitter.emit('onMouseMoveRoot', e);

    if (scale && scale.length >= 2) {
      const [xScale, yScale] = scale;
      const [pX, pY] = eventToPoint(e, this.rootRef.current);
      const [minX, maxX] = xScale.range();
      const [maxY, minY] = yScale.range();

      if (pX >= minX && pX <= maxX && pY >= minY && pY <= maxY) {
        this.eventEmitter.emit('onMouseMoveChart', e);
      } else {
        this.eventEmitter.emit('onMouseLeaveChart', e);
      }
    }
  };

  handlerMouseLeave = (e) => {
    this.eventEmitter.emit('onMouseLeaveRoot', e);
    this.eventEmitter.emit('onMouseLeaveChart', e);
  };

  setContext() {
    const { scale, data, width, height, locale, resolveColor, patterns, duration } = this.asProps;

    const yScaleDomain = scale?.[1]?.domain?.();
    if (yScaleDomain?.length && data?.length) {
      this.dataHintsHandler.setPointsDensity(
        data.length / width,
        Math.abs(yScaleDomain[1] - yScaleDomain[0]) / height,
      );
    }

    return {
      $rootProps: {
        size: [width, height],
        data: data,
        locale,
        scale: scale,
        eventEmitter: this.eventEmitter,
        rootRef: this.rootRef,
        dataHintsHandler: this.dataHintsHandler,
        resolveColor,
        patterns,
        duration,
      },
    };
  }

  render() {
    const SPlot = Root;
    const { styles, width, height, Children, data, a11yAltTextConfig, label, locale, getI18nText } =
      this.asProps;

    if (!width || !height) return null;

    const ariaLabel = label ?? getI18nText('d3Chart.Plot:aria-label');

    return sstyled(styles)(
      <SPlot
        render={Box}
        tag='svg'
        __excludeProps={['data', 'scale']}
        ref={this.rootRef}
        onMouseMove={this.handlerMouseMove}
        onMouseLeave={this.handlerMouseLeave}
        aria-label={ariaLabel}
        tabIndex={0}
      >
        <Children />
        <foreignObject width='100%' height='100%' data-aria-only>
          <PlotA11yModule
            id={this.plotId}
            data={data}
            plotLabel={label}
            locale={locale}
            plotRef={this.rootRef}
            hints={this.dataStructureHints}
            config={a11yAltTextConfig}
          />
        </foreignObject>
      </SPlot>,
    );
  }
}

export default createComponent(PlotRoot);
