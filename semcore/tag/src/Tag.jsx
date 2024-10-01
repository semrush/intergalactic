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
import log from '@semcore/utils/lib/logger';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';

import style from './style/tag.shadow.css';

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
    const { size, color, resolveColor } = this.asProps;
    return { size, color, resolveColor };
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
    const { getI18nText, color, resolveColor } = this.asProps;
    const id = this.asProps.id || `igc-${this.asProps.uid}-tag`;

    return {
      getI18nText,
      id: `${id}-clear`,
      'aria-labelledby': `${id}-clear ${id}-text`,
      'aria-label': getI18nText('remove'),
      onMount: this.handleCloseMount,
      onUnmount: this.handleCloseUnmount,
      color,
      resolveColor,
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
    const isInteractiveView = !disabled && interactive;
    const isInteractive = !disabled && interactive && focusable === 'container';

    return sstyled(styles)(
      <STag
        render={Box}
        id={id}
        use:interactive={isInteractive}
        use:interactiveView={isInteractiveView}
        tag-color={resolveColor(color)}
        onKeyDown={this.handleKeyDown}
        use:tabIndex={isInteractive ? 0 : -1}
        role={isInteractive ? 'button' : undefined}
      >
        {addonLeft ? <Tag.Addon tag={addonLeft} /> : null}
        {addonTextChildren(Children, Tag.Text, Tag.Addon)}
        {addonRight ? <Tag.Addon tag={addonRight} /> : null}
      </STag>,
    );
  }
}

class RootTagContainer extends Component {
  static displayName = 'TagContainer';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement(), resolveColorEnhance()];
  static defaultProps = {
    color: 'gray-500',
    theme: 'primary',
  };

  getTagProps() {
    const {
      size,
      theme,
      color,
      disabled,
      uid,
      id: outerId,
      interactive,
      resolveColor,
    } = this.asProps;
    const id = outerId || `igc-${uid}-tag`;

    return {
      id: `${id}-text`,
      disabled,
      size,
      theme,
      color,
      tag: interactive ? 'button' : undefined,
      interactive,
      resolveColor,
    };
  }

  getCircleProps() {
    const { color, resolveColor, size } = this.asProps;
    return { color, resolveColor, size };
  }

  getAddonProps() {
    const { color, resolveColor } = this.asProps;

    return { color, resolveColor };
  }

  getCloseProps() {
    const {
      size,
      theme,
      color,
      disabled,
      uid,
      id: outerId,
      getI18nText,
      resolveColor,
    } = this.asProps;
    const id = outerId || `igc-${uid}-tag`;

    return {
      disabled,
      size,
      theme,
      color,
      id: `${id}-clear`,
      'aria-labelledby': `${id}-clear ${id}-text`,
      'aria-label': getI18nText('remove'),
      resolveColor,
    };
  }

  render() {
    const STagContainer = Root;
    const { styles, Children, forcedAdvancedMode } = this.asProps;
    const advancedMode =
      forcedAdvancedMode ||
      isAdvanceMode(
        Children,
        [
          'InputTags.' + Tag.Text.displayName,
          'InputTags.' + Tag.Addon.displayName,
          'InputTags.' + Tag.Close.displayName,
          'InputTags.' + Tag.Circle.displayName,
          TagContainer.Tag.displayName,
          TagContainer.Addon.displayName,
          TagContainer.Close.displayName,
          TagContainer.Circle.displayName,
        ],
        true,
      );

    return sstyled(styles)(
      <STagContainer render={Box}>
        {advancedMode ? (
          <Children />
        ) : (
          <TagContainer.Tag>
            <Children />
          </TagContainer.Tag>
        )}
      </STagContainer>,
    );
  }
}

class RootCloseTagContainer extends Component {
  static displayName = 'CloseTagContainer';
  static style = style;

  static defaultProps = () => {
    return {
      theme: 'primary',
      color: 'gray-500',
      size: 'm',
      i18n: localizedMessages,
      locale: 'en',
      children: <CloseTagContainer.Close />,
    };
  };

  static enhance = [resolveColorEnhance(), keyboardFocusEnhance()];

  handleKeyDown = (event) => {
    const { onKeyDown, onClick } = this.asProps;

    if (onKeyDown) {
      return onKeyDown(event);
    }

    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event);
    }
  };

  render() {
    const STagContainerClose = Root;
    const { Children, styles, color, resolveColor } = this.asProps;

    return sstyled(styles)(
      <STagContainerClose
        render={Box}
        tag={'button'}
        interactive={true}
        interactiveView={true}
        tag-color={resolveColor(color)}
        onKeyDown={this.handleKeyDown}
      >
        <Children />
      </STagContainerClose>,
    );
  }
}

function TagContainerCircle(props) {
  const SAddon = Box;
  const SCircle = Root;
  const { styles, color, resolveColor } = props;
  return sstyled(styles)(
    <SAddon tag-color={resolveColor(color)}>
      <SCircle render={Box} />
    </SAddon>,
  );
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

    log.warn(
      true,
      'Tag.Close is deprecated and will be removed in the next major release. Please, use TagContainer and TagContainer.Close',
      'Tag.Close',
    );

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
  const { styles, color, resolveColor } = props;

  const tagColor = React.useMemo(() => {
    if (typeof resolveColor !== 'function') return;
    return resolveColor(color);
  }, [color, resolveColor]);

  return sstyled(styles)(<SAddon render={Box} tag='div' tag-color={tagColor} />);
}

function Circle(props) {
  const SCircle = Root;
  const { styles, color, resolveColor } = props;
  const tagColor = React.useMemo(() => {
    if (typeof resolveColor !== 'function') return;
    return resolveColor(color);
  }, [color, resolveColor]);
  return sstyled(styles)(<SCircle render={Box} tag='span' tag-color={tagColor} />);
}

const Tag = createComponent(RootTag, {
  Text,
  Addon,
  Close,
  Circle,
});

const CloseTagContainer = createComponent(RootCloseTagContainer, {
  Close: CloseM,
});

export const TagContainer = createComponent(RootTagContainer, {
  Tag,
  Addon,
  Close: CloseTagContainer,
  Circle: TagContainerCircle,
});

export default Tag;
