import { Hint, useEllipsis, Box } from '@semcore/base-components';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import SSeparator from '@semcore/icon/ChevronRight/m';
import React from 'react';

import style from './style/breadcrumbs.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

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

function Item(props) {
  const itemRef = React.useRef();

  const SBreadcrumbsItem = Root;
  const { styles, separator, active, disabled, href, tabIndex, tag, Children, ellipsis = false, hintProps } = props;
  const SSeparator = 'div';
  const SListItem = 'li';

  const showHint = useEllipsis(itemRef, ellipsis);

  return sstyled(styles)(
    <>
      <SListItem>
        <SBreadcrumbsItem
          render={Box}
          use:tabIndex={active || disabled ? -1 : tabIndex}
          use:href={!active && !disabled ? href : undefined}
          aria-current={active ? 'page' : undefined}
          use:tag={active ? 'span' : tag}
          ref={itemRef}
        />
      </SListItem>
      <SSeparator aria-hidden='true'>{separator}</SSeparator>
      {showHint && (<Hint triggerRef={itemRef} {...hintProps}><Children /></Hint>)}
    </>,
  );
}
Item.defaultProps = {
  tag: 'a',
  locale: 'en',
  tabIndex: 0,
};

export default createComponent(Breadcrumbs, {
  Item,
});
