import React  from 'react';
import createComponent, {
  Component,
  Root,
  sstyled,
} from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { neighborLocationEnhance } from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';

import style from './style/base-trigger.shadow.css';

class RootBaseTrigger extends Component {
  static displayName = 'BaseTrigger';
  static style = style;
  static defaultProps = {
    size: 'm',
  };
  static enhance = [keyboardFocusEnhance(), neighborLocationEnhance()];

  getTextProps() {
    const { placeholder, empty } = this.asProps;
    return {
      placeholder,
      empty,
    };
  }

  render() {
    const SBaseTrigger = Root;
    const SInner = 'div';
    const {
      Children,
      styles,
      theme,
    } = this.asProps;

    logger.warn(
      theme !== undefined,
      'The \'theme\' property is deprecated, use \'state\'',
      this.asProps['data-ui-name'] || BaseTrigger.displayName,
    );

    // TODO: add aria
    return sstyled(styles)(
      <SBaseTrigger
        render={Box}
        state={theme}
      >
        <SInner>{addonTextChildren(Children, BaseTrigger.Text, BaseTrigger.Addon)}</SInner>
      </SBaseTrigger>,
    );
  }
}

function Text(props) {
  const SText = Root;
  const { children, styles, empty, placeholder } = props;

  return sstyled(styles)(
    /* что бы не ломать обратную совместимость пришлось юзать use */
    <SText render={Box} use:placeholder={empty}>
      {empty ? placeholder : children}
    </SText>,
  );
}

function Addon(props) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />);
}

const BaseTrigger = createComponent(RootBaseTrigger, {
  Text,
  Addon,
});

export default BaseTrigger;
