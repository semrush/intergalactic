import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import CloseXS from '@semcore/icon/lib/Close/xs';
import resolveColor from '@semcore/utils/lib/color';
import { FadeInOut } from '@semcore/animation';

import style from './style/notice.shadow.css';

function isCustomTheme(theme) {
  return !['danger', 'warning', 'success', 'info'].includes(theme);
}

class RootNotice extends Component {
  static displayName = 'Notice';
  static style = style;
  static defaultProps = {
    use: 'secondary',
    theme: 'info',
    duration: 200,
  };

  getLabelProps() {
    const { theme } = this.asProps;
    return {
      theme,
    };
  }

  render() {
    const SNotice = Root;
    const { Children, styles, hidden, theme } = this.asProps;
    const color = resolveColor(theme);
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;

    return sstyled(styles)(
      <SNotice
        render={FadeInOut}
        visible={!hidden}
        use:theme={useTheme}
        backgroundColor={color}
        role="alert"
      >
        <Children />
      </SNotice>,
    );
  }
}

function Label({ styles, theme }) {
  const SLabel = Root;
  const useTheme = isCustomTheme(theme) ? 'custom' : theme;
  const color = resolveColor(theme);
  return sstyled(styles)(<SLabel render={Box} use:theme={useTheme} color={color} />);
}

function Actions({ styles }) {
  const SActions = Root;
  return sstyled(styles)(<SActions render={Box} />);
}

function Content({ styles }) {
  const SContent = Root;
  return sstyled(styles)(<SContent render={Box} />);
}

function CloseIcon({ styles }) {
  const SCloseIcon = Root;
  return sstyled(styles)(
    <SCloseIcon render={Box} tag={CloseXS} color="stone" interactive aria-label="Close alert" />,
  );
}

export default createComponent(RootNotice, {
  Label,
  Actions,
  Content,
  CloseIcon,
});
