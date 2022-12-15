import React from 'react';
import Button from '@semcore/button';
import FormatText from '@semcore/format-text';
import createComponent, { Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import Error, { getIconPath } from '../Error';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootProjectNotFound extends Component {
  static displayName = 'Maintenance';
  static enhance = [i18nEnhance()];
  static defaultProps = {
    i18n: localizedMessages,
    icon: getIconPath('project_not_found'),
    projectsLink: '/projects',
    contactsLink: '/company/contacts',
    supportTeamLink: 'mailto:mail@semrush.com',
  };

  render() {
    const { Children, getI18nText, projectsLink, contactsLink, supportTeamLink } = this.asProps;
    const { title, btnProjects, btnContacts } = getI18nText();
    const text = getI18nText('text', { url: supportTeamLink });
    return (
      <Root render={Error}>
        <Error.Title>{title}</Error.Title>
        <Error.Description tag={FormatText} size="l" dangerouslySetInnerHTML={{ __html: text }} />
        <Children />
        <Error.Controls>
          <Button tag="a" type="none" size="l" use="primary" theme="info" href={projectsLink}>
            {btnProjects}
          </Button>
          <Button size="l" tag="a" type="none" href={contactsLink}>
            {btnContacts}
          </Button>
        </Error.Controls>
      </Root>
    );
  }
}

export default createComponent(RootProjectNotFound);
