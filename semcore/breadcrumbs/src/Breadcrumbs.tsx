import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import SSeparator from '@semcore/icon/ChevronRight/m';
import { Text } from '@semcore/typography';
import React from 'react';

import type { NSBreadcrumbs } from './Breadcrumbs.type';
import style from './style/breadcrumbs.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class Breadcrumbs extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSBreadcrumbs.Component>,
  typeof Breadcrumbs.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  NSBreadcrumbs.DefaultProps
> {
  static displayName = 'Breadcrumbs';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    separator: <SSeparator />,
    i18n: localizedMessages,
    locale: 'en',
  } as const;

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
      <SBreadcrumbs tag='nav' render={Box} aria-label={getI18nText('breadcrumbs')}>
        <SListContainer>
          <Children />
        </SListContainer>
      </SBreadcrumbs>,
    );
  }
}

function Item(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSBreadcrumbs.Item.Component, typeof Breadcrumbs, 'Item'> & { tag?: Intergalactic.Tag },
) {
  const SBreadcrumbsItem = Root;
  // Used to tweak the root element when `disabled` is passed to the tag.
  // The default tag is `a`, so `@ts-expect-error` is intentional.
  // @ts-expect-error
  const { styles, separator, active, disabled, href, tabIndex, tag, ellipsis = true } = props;
  const SSeparator = 'div';
  const SListItem = 'li';

  return sstyled(styles)(
    <>
      <SListItem>
        <SBreadcrumbsItem
          render={Text}
          use:tabIndex={active || disabled ? -1 : tabIndex}
          use:href={!active && !disabled ? href : undefined}
          aria-current={active ? 'page' : undefined}
          use:tag={active ? 'span' : tag}
          ellipsis={ellipsis}
        />
      </SListItem>
      <SSeparator aria-hidden='true'>{separator}</SSeparator>
    </>,
  );
}
Item.defaultProps = {
  tag: 'a',
  locale: 'en',
  tabIndex: 0,
};

/**
 * Breadcrumbs
 *
 * {@link https://developer.semrush.com/intergalactic/components/breadcrumbs/breadcrumbs-api/|API} | {@link https://developer.semrush.com/intergalactic/components/breadcrumbs/breadcrumbs-code/|Examples}
 */
export default createComponent<
  NSBreadcrumbs.Component,
  typeof Breadcrumbs
>(Breadcrumbs, {
  Item,
});
