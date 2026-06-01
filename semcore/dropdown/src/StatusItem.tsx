import { ScreenReaderOnly } from '@semcore/base-components';
import { Component, Root, createComponent, type Intergalactic } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { Text } from '@semcore/typography';
import React from 'react';

import type { StatusItemComponent } from './index';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

type DefaultProps = {
  state: 'default';
};

type InnerProps = {
  size: 'm' | 'l';
  children?: React.ReactNode;
};

class StatusItemRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<StatusItemComponent>,
  typeof StatusItemRoot.enhance,
  {},
  InnerProps,
  {},
  DefaultProps
> {
  static displayName = 'StatusItem';
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps: DefaultProps = {
    state: 'default',
  };

  renderText(text: string, children: React.ReactNode) {
    return (
      <Root
        render={Text}
        tag='div'
        id='search-result'
        key='StatusItem'
        p='6px 8px'
        size={200}
        use='secondary'
      >
        {children ?? text}
      </Root>
    );
  }

  render(): React.ReactNode {
    const { itemsCount, state, children, getI18nText } = this.asProps;

    switch (state) {
      case 'loading': {
        return this.renderText(getI18nText('StatusItem.loadingState'), children);
      }
      case 'error': {
        return this.renderText(getI18nText('StatusItem.errorState'), children);
      }
      case 'default': {
        if (itemsCount === 0) {
          return this.renderText(getI18nText('StatusItem.defaultState.nothingFound'), children);
        } else {
          return (
            <ScreenReaderOnly id='search-result' aria-hidden='true'>
              {children ?? getI18nText('StatusItem.defaultState.ScreenReaderOnlyText', { count: itemsCount })}
            </ScreenReaderOnly>
          );
        }
      }
      default: {
        const s: never = state;
        throw new Error(`Handle ${s} state.`);
      }
    }
  }
}

export const StatusItem = createComponent<StatusItemComponent, typeof StatusItemRoot>(StatusItemRoot);
