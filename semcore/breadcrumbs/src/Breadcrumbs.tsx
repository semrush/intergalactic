import React, { HTMLAttributes } from 'react';
import createComponent, { Component, Merge, PropGetter, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import SSeparator from '@semcore/icon/lib/ChevronRight/xxs';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/breadcrumbs.shadow.css';

export interface IBreadcrumbsProps extends IBoxProps {
  /**
   * Links divider
   * */
  separator?: React.ReactNode;
}

export interface IBreadcrumbsItemProps extends IBoxProps, IKeyboardFocusProps {
  /** The property is responsible for the activity of the element */
  active?: boolean;
}

export interface IBreadcrumbsContext extends IBreadcrumbsProps {
  getItemProps: PropGetter<Breadcrumbs['getItemProps']>;
}

class Breadcrumbs extends Component<IBreadcrumbsProps> {
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
    const { Root: SBreadcrumbs } = this;
    const { styles } = this.asProps;
    return styled(styles)(<SBreadcrumbs render={Box} />);
  }
}

class Item extends Component<IBreadcrumbsItemProps> {
  static defaultProps({ active }) {
    return {
      disabled: active,
      tag: 'a',
    };
  }

  static enhance = [keyboardFocusEnhance()];

  render() {
    const SBreadcrumbsItem = this.Root;
    const { styles, active, keyboardFocused, separator } = this.asProps;
    const SSeparator = 'li';

    return styled(styles)(
      <>
        <SBreadcrumbsItem render={Box} active={active} keyboardFocused={keyboardFocused} />
        <SSeparator>{separator}</SSeparator>
      </>,
    );
  }
}

export default createComponent<
  Merge<IBreadcrumbsProps, HTMLAttributes<HTMLElement>>,
  {
    Item: Merge<IBreadcrumbsItemProps, HTMLAttributes<HTMLLinkElement>>;
  },
  IBreadcrumbsContext
>(Breadcrumbs, {
  Item,
});
