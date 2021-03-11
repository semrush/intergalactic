import React from 'react';
import createComponent, { Component, styled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import CloseS from '@semcore/icon/lib/Close/s';
import resolveColor from '@semcore/utils/lib/color';
import { FadeInOut } from '@semcore/animation';

import style from './style/notice.shadow.css';

function isCustomTheme(theme) {
  const themes = ['danger', 'warning', 'success', 'info'];
  return !themes.includes(theme);
}
function resolveThemeColor(theme) {
  return isCustomTheme ? resolveColor(theme) : theme;
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
    const SNotice = this.Root;
    const { styles, hidden, theme, use } = this.asProps;
    const color = resolveThemeColor(theme);

    return styled(styles)`
      SNotice[theme='custom'] {
        background-color: ${color};

        &[use='secondary'] {
          border-color: ${color};
        }
      }
    `(
      <SNotice
        render={FadeInOut}
        visible={!hidden}
        use={use}
        theme={isCustomTheme(theme) ? 'custom' : color}
      />,
    );
  }
}

function Label({ Root: SLabel, styles, theme }) {
  return styled(styles)(<SLabel render={Box} theme={!isCustomTheme(theme) && theme} />);
}

function Actions({ Root: SActions, styles }) {
  return styled(styles)(<SActions render={Box} />);
}

function Content({ Root: SContent, styles }) {
  return styled(styles)(<SContent render={Box} />);
}

function CloseIcon({ Root: SCloseIcon, styles }) {
  return styled(styles)(<SCloseIcon render={Box} tag={CloseS} color="stone" interactive />);
}

export default createComponent(RootNotice, {
  Label,
  Actions,
  Content,
  CloseIcon,
});
