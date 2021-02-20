import React, { ComponentProps } from 'react';
import Button from '@semcore/button';
import createComponent, { Component, Merge } from '@semcore/core';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import Error, { getIconPath } from '../Error';

import de from './translations/de.json';
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import it from './translations/it.json';
import ja from './translations/ja.json';
import pt from './translations/pt.json';
import ru from './translations/ru.json';
import zh from './translations/zh.json';
import ko from './translations/ko.json';
import vi from './translations/vi.json';

const i18n = { de, en, es, fr, it, ja, ru, zh, pt, ko, vi };

export interface IPageErrorProps extends IWithI18nEnhanceProps {
  /**
   * Page reloading button click handler
   * @default () => { if (canUseDOM()) { location.reload(); } }
   */
  onClick?: (e: React.MouseEvent) => void;
}

class RootPageError extends Component<IPageErrorProps> {
  static displayName = 'PageError';
  static enhance = [i18nEnhance()];
  static defaultProps = {
    i18n,
    icon: getIconPath('page_error'),
  };

  handleReload = () => {
    if (canUseDOM()) {
      location.reload();
    }
  };

  render() {
    const { Children, getI18nText, onClick, ...other } = this.asProps;
    const { title, text, btnRetry } = getI18nText();
    return (
      <Error {...other}>
        <Error.Title>{title}</Error.Title>
        <Error.Description>{text}</Error.Description>
        <Children />
        <Error.Controls>
          <Button
            onClick={callAllEventHandlers(onClick, this.handleReload)}
            size="xl"
            use="primary"
            theme="info"
          >
            {btnRetry}
          </Button>
        </Error.Controls>
      </Error>
    );
  }
}

export default createComponent<Merge<IPageErrorProps, ComponentProps<typeof Error>>>(RootPageError);
