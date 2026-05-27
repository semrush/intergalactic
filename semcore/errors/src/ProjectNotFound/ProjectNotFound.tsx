import Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { Text } from '@semcore/typography';
import React from 'react';

import Error, { getIconPath } from '../Error';
import type { NSProjectNotFound } from './ProjectNotFound.type';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootProjectNotFound extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSProjectNotFound.Component>,
  typeof RootProjectNotFound.enhance,
  {},
  {},
  {},
  NSProjectNotFound.DefaultProps
> {
  static displayName = 'ProjectNotFound';
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
    icon: getIconPath('project_not_found'),
    projectsLink: '/projects',
    contactsLink: '/company/contacts',
    supportTeamLink: '/company/contacts',
    titleTag: 'h2',
  } as const;

  render() {
    const { Children, getI18nText, projectsLink, contactsLink, supportTeamLink, titleTag } = this.asProps;
    const text = getI18nText('text', {
      p: (chunk: string) => <p>{chunk}</p>,
      ul: (chunk: string) => <ul>{chunk}</ul>,
      li: (chunk: string) => <li>{chunk}</li>,
      supportLink: (chunk: string) => <a href={supportTeamLink}>{chunk}</a>,
    });
    return (
      <Root render={Error}>
        <Error.Title tag={titleTag}>{getI18nText('title')}</Error.Title>
        <Error.Description tag={Text} formatTags={true} size={300}>
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

export default createComponent<
  NSProjectNotFound.Component,
  typeof RootProjectNotFound
>(RootProjectNotFound);
