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
    tag: 'nav',
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
    const SListContainer = 'ol';
    const { styles, getI18nText, Children } = this.asProps;
    return sstyled(styles)(
      <SBreadcrumbs render={Box} aria-label={getI18nText('breadcrumbs')}>
        <SListContainer>
          <Children />
        </SListContainer>
      </SBreadcrumbs>,
    );
  }
}

class Item extends Component {
  static defaultProps = {
    tag: 'a',
    locale: 'en',
  };

  static enhance = [keyboardFocusEnhance()];

  render() {
    const SBreadcrumbsItem = Root;
    const { styles, separator, active, disabled, href } = this.asProps;
    const SSeparator = 'div';
    const SListItem = 'li';

    return sstyled(styles)(
      <>
        <SListItem>
          <SBreadcrumbsItem
            render={Box}
            use:href={!active && !disabled ? href : undefined}
            aria-current={active ? 'page' : undefined}
          />
        </SListItem>
        <SSeparator aria-hidden='true'>{separator}</SSeparator>
      </>,
    );
  }
}

export default createComponent(Breadcrumbs, {
  Item,
});
