import { createComponent, Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import FormatText from '@semcore/format-text';
import React from 'react';

import Error, { getIconPath } from '../Error';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootFolderNotFound extends Component {
  static displayName = 'Maintenance';
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
    icon: getIconPath('project_not_found'),
    supportTeamLink: '/company/contacts/',
    titleTag: 'h2',
  };

  render() {
    const { Children, getI18nText, supportTeamLink, titleTag } = this.asProps;
    console.log(supportTeamLink);
    const text = getI18nText('text', { url: supportTeamLink });
    return (
      <Root render={Error}>
        <Error.Title tag={titleTag}>{getI18nText('title')}</Error.Title>
        <Error.Description tag={FormatText} size='l' dangerouslySetInnerHTML={{ __html: text }} />
        <Children />
      </Root>
    );
  }
}

export default createComponent(RootFolderNotFound);
