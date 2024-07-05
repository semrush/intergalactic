import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';
import CloseM from '@semcore/icon/Close/m';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/utils/lib/enhances/resolveColorEnhance';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/tag.shadow.css';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';

const legacyThemeRecommendedMigration = {
  primary: {
    muted: 'gray-500',
    info: 'blue-500',
    success: 'green-500',
    warning: 'orange-500',
    danger: 'red-500',
  },
  secondary: {
    muted: 'gray-50',
  },
};

class RootTag extends Component {
  static displayName = 'Tag';
  static style = style;
  static enhance = [
    i18nEnhance(localizedMessages),
    uniqueIDEnhancement(),
    resolveColorEnhance(),
    keyboardFocusEnhance(),
  ];
  static defaultProps = {
    theme: 'primary',
    color: 'gray-500',
    size: 'm',
    i18n: localizedMessages,
    locale: 'en',
  };
  state = {
    focusable: 'container',
  };

  constructor(props) {
    super(props);

    logger.warn(
      props.use,
      `Property 'use' is deprecated, replace property to "theme='${props.use}' color='${
        legacyThemeRecommendedMigration[props.use]?.[props.theme]
      }'"`,
      props['data-ui-name'] || Tag.displayName,
    );
  }

  getCircleProps() {
    const { size } = this.asProps;
    return { size };
  }

  getTextProps() {
    const { interactive } = this.asProps;
    const id = this.asProps.id || `igc-${this.asProps.uid}-tag`;
    const { focusable } = this.state;

    return {
      tabIndex: focusable === 'text' && interactive ? 0 : -1,
      id: `${id}-text`,
      role: focusable === 'text' && interactive ? 'button' : undefined,
    };
  }
  handleCloseMount = () => {
    this.setState({ focusable: 'text' });
  };
  handleCloseUnmount = () => {
    this.setState({ focusable: 'container' });
  };
  getCloseProps() {
    const { getI18nText } = this.asProps;
    const id = this.asProps.id || `igc-${this.asProps.uid}-tag`;

    return {
      getI18nText,
      id: `${id}-clear`,
      'aria-labelledby': `${id}-clear ${id}-text`,
      'aria-label': getI18nText('remove'),
      'aria-hidden': 'true',
      onMount: this.handleCloseMount,
      onUnmount: this.handleCloseUnmount,
    };
  }

  handleKeyDown = (event) => {
    switch (event.key) {
      case ' ':
      case 'Enter':
        if (this.asProps.onClick) {
          event.preventDefault();
          this.asProps.onClick(event);
        }
        break;
    }
  };

  render() {
    const STag = Root;
    const {
      Children,
      styles,
      color,
      interactive,
      disabled,
      addonLeft,
      addonRight,
      resolveColor,
      id: outerId,
      uid,
    } = this.asProps;
    const { focusable } = this.state;
    const id = outerId || `igc-${uid}-tag`;

    return sstyled(styles)(
      <STag
        render={Box}
        id={id}
        use:interactive={!disabled && interactive}
        tag-color={resolveColor(color)}
        onKeyDown={this.handleKeyDown}
        use:tabIndex={interactive && focusable === 'container' ? 0 : -1}
      >
        {addonLeft ? <Tag.Addon tag={addonLeft} /> : null}
        {addonTextChildren(Children, Tag.Text, Tag.Addon)}
        {addonRight ? <Tag.Addon tag={addonRight} /> : null}
      </STag>,
    );
  }
}

function Text(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Box} tag='span' />);
}
Text.enhance = [keyboardFocusEnhance()];

function Close(props) {
  const SClose = Root;
  const { styles } = props;

  React.useEffect(() => {
    props.onMount?.();
    return () => props.onUnmount?.();
  }, []);

  const onKeyDown = React.useCallback(
    (event) => {
      if (props.onKeyDown) {
        return props.onKeyDown(event);
      }

      if (props.onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        props.onClick(event);
      }
    },
    [props.onKeyDown, props.onClick],
  );

  return sstyled(styles)(<SClose render={Box} tag={CloseM} interactive onKeyDown={onKeyDown} />);
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag='span' />);
}

function Circle(props) {
  const SCircle = Root;
  const { styles } = props;
  return sstyled(styles)(<SCircle render={Box} tag='span' />);
}

const Tag = createComponent(RootTag, {
  Text,
  Addon,
  Close,
  Circle,
});

export default Tag;
