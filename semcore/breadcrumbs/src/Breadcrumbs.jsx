import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import SSeparator from '@semcore/icon/ChevronRight/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';

import style from './style/breadcrumbs.shadow.css';

class Breadcrumbs extends Component {
  static displayName = 'Breadcrumbs';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    separator: <SSeparator />,
    tag: 'div',
    i18n: localizedMessages,
    locale: 'en',
  };

  getItemProps() {
    const { separator, locale } = this.asProps;
    return {
      separator,
      locale,
    };
  }

  render() {
    const SBreadcrumbs = Root;
    const { styles, getI18nText } = this.asProps;
    return sstyled(styles)(
      <SBreadcrumbs render={Box} aria-label={getI18nText('breadcrumbs')} role='group' />,
    );
  }
}

class Item extends Component {
  static defaultProps({ active }) {
    return {
      disabled: active,
      tag: 'a',
      i18n: localizedMessages,
      locale: 'en',
    };
  }

  static enhance = [keyboardFocusEnhance(), i18nEnhance(localizedMessages)];

  render() {
    const SBreadcrumbsItem = Root;
    const { styles, separator, active, getI18nText } = this.asProps;
    const SSeparator = 'div';

    return sstyled(styles)(
      <>
        <SBreadcrumbsItem render={Box} aria-current={active ? getI18nText('page') : undefined} />
        <SSeparator aria-hidden='true'>{separator}</SSeparator>
      </>,
    );
  }
}

export default createComponent(Breadcrumbs, {
  Item,
});
