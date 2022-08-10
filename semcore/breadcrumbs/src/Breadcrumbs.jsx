import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import SSeparator from '@semcore/icon/ChevronRight/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/breadcrumbs.shadow.css';

class Breadcrumbs extends Component {
  static displayName = 'Breadcrumbs';
  static style = style;
  static defaultProps = {
    separator: <SSeparator />,
    tag: 'nav',
  };

  getItemProps() {
    const { separator } = this.asProps;
    return {
      separator,
    };
  }

  render() {
    const SBreadcrumbs = Root;
    const { styles } = this.asProps;
    return sstyled(styles)(<SBreadcrumbs render={Box} aria-label="breadcrumbs" role="group" />);
  }
}

class Item extends Component {
  static defaultProps({ active }) {
    return {
      disabled: active,
      tag: 'a',
    };
  }

  static enhance = [keyboardFocusEnhance()];

  render() {
    const SBreadcrumbsItem = Root;
    const { styles, separator, active } = this.asProps;
    const SSeparator = 'div';

    return sstyled(styles)(
      <>
        <SBreadcrumbsItem render={Box} aria-current={active ? 'page' : undefined} />
        <SSeparator aria-hidden="true">{separator}</SSeparator>
      </>,
    );
  }
}

export default createComponent(Breadcrumbs, {
  Item,
});
