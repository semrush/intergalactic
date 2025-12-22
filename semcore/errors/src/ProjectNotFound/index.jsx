import Button from '@semcore/button';
import { createComponent, Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { Text } from '@semcore/typography';
import React from 'react';

import Error, { getIconPath } from '../Error';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootProjectNotFound extends Component {
  static displayName = 'Maintenance';
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
    icon: getIconPath('project_not_found'),
    projectsLink: '/projects',
    contactsLink: '/company/contacts',
    supportTeamLink: '/company/contacts',
    titleTag: 'h2',
  };

  render() {
    const { Children, getI18nText, projectsLink, contactsLink, supportTeamLink, titleTag } = this.asProps;
    const text = getI18nText('text', {
      p: (chunk) => <p>{chunk}</p>,
      ul: (chunk) => <ul>{chunk}</ul>,
      li: (chunk) => <li>{chunk}</li>,
      supportLink: (chunk) => <a href={supportTeamLink}>{chunk}</a>,
    });
    return (
      <Root render={Error}>
        <Error.Title tag={titleTag}>{getI18nText('title')}</Error.Title>
        <Error.Description tag={Text} formatTags={true} size='300'>
          {text}
        </Error.Description>
        <Children />
        <Error.Controls>
          <Button tag='a' type='none' size='l' use='primary' theme='info' href={projectsLink}>
            {getI18nText('btnProjects')}
          </Button>
          <Button size='l' tag='a' type='none' href={contactsLink}>
            {getI18nText('btnContacts')}
          </Button>
        </Error.Controls>
      </Root>
    );
  }
}

export default createComponent(RootProjectNotFound);
