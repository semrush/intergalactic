import { Hint, useEllipsis } from '@semcore/base-components';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import animatedSizeEnhance from '@semcore/core/lib/utils/enhances/animatedSizeEnhance';
import logger from '@semcore/core/lib/utils/logger';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import { Box, InvalidStateBox } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import React from 'react';

import style from './style/base-trigger.shadow.css';

class RootBaseTrigger extends Component {
  static displayName = 'BaseTrigger';
  static enhance = [
    cssVariableEnhance({
      variable: '--intergalactic-duration-control',
      fallback: '200',
      map: Number.parseInt,
      prop: 'duration',
    }),
    animatedSizeEnhance({
      animateProps: ['width'],
      onChangeOf: ['value'],
    }),
  ];

  static style = style;
  static defaultProps = {
    size: 'm',
    empty: false,
  };

  triggerRef = React.createRef();

  getTextProps() {
    const { placeholder, empty } = this.asProps;
    return {
      placeholder,
      empty,
      triggerRef: this.triggerRef,
    };
  }

  render() {
    const SBaseTrigger = Root;
    const SInner = 'span';
    const SInvalidPattern = InvalidStateBox;
    const { Children, styles, theme, neighborLocation, empty, state, size } = this.asProps;

    logger.warn(
      theme !== undefined,
      'The \'theme\' property is deprecated, use \'state\'',
      this.asProps['data-ui-name'] || BaseTrigger.displayName,
    );

    // TODO: add aria
    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(styles)(
            <SBaseTrigger
              render={Box}
              tag='button'
              type='button'
              tabIndex={0}
              neighborLocation={neighborLocation}
              state={theme}
              ref={this.triggerRef}
            >
              {state === 'invalid' && <SInvalidPattern size={size} />}
              <SInner>
                {addonTextChildren(Children, BaseTrigger.Text, BaseTrigger.Addon, empty)}
              </SInner>
            </SBaseTrigger>,
          )}
      </NeighborLocation.Detect>
    );
  }
}

function Text(props) {
  const SText = Root;
  const textRef = React.useRef();
  const { children, styles, empty, placeholder, triggerRef, ellipsis = false } = props;
  const content = empty ? placeholder : children;
  const showHint = useEllipsis(textRef, ellipsis);

  return sstyled(styles)(
    <>
      <SText render={Box} display-placeholder={empty} aria-hidden={empty} ref={textRef} use:ellipsis={false}>
        {content}
      </SText>
      {showHint && (<Hint triggerRef={triggerRef}>{content}</Hint>)}
    </>,
  );
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} />);
}

const BaseTrigger = createComponent(RootBaseTrigger, {
  Text,
  Addon,
});

export default BaseTrigger;
