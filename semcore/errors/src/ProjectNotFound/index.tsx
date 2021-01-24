// import React from 'react';
// import Error, { getIconPath, ILocalizedErrorProps } from '../Error';
// import Button from '@semcore/button';
// import WithI18n from '@semcore/utils/lib/enhances/WithI18n';
// import compose from '@semcore/utils/lib/compose';
// import de from './translations/de.json';
// import en from './translations/en.json';
// import es from './translations/es.json';
// import fr from './translations/fr.json';
// import it from './translations/it.json';
// import ja from './translations/ja.json';
// import pt from './translations/pt.json';
// import ru from './translations/ru.json';
// import zh from './translations/zh.json';
//
// const enhance = <T extends {}>(Component: T): T => compose(WithI18n())(Component);
//
// export interface IProjectNotFoundProps extends ILocalizedErrorProps {

// }
//
// const ProjectNotFound: React.FC<IProjectNotFoundProps> = (props) => {
//   const { children, projectsLink, locale, i18n, getText, ...other } = props;
//   const _ = getText(i18n);
//   return (
//     <Error {...other}>
//       <Error.Title>{_('title')}</Error.Title>
//       <Error.Description wMax="510px">{_('text')}</Error.Description>
//       {children}
//       <Error.Controls>
//         <Button tag="a" type="none" size="xl" use="primary" theme="info" href={projectsLink}>
//           {_('btn')}
//         </Button>
//       </Error.Controls>
//     </Error>
//   );
// };
//
// ProjectNotFound.displayName = 'PageNotFound';
// ProjectNotFound.defaultProps = {
//   icon: getIconPath('project_not_found'),
//   projectsLink: '/projects',
//   i18n: {
//     de,
//     en,
//     es,
//     fr,
//     it,
//     ja,
//     pt,
//     ru,
//     zh,
//   },
// };
//
// export default enhance(ProjectNotFound);
import React, { ComponentProps } from 'react';
import Button from '@semcore/button';
import FormatText from '@semcore/format-text';
import createComponent, { Component, Merge } from '@semcore/core';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
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

export interface IProjectNotFoundProps extends IWithI18nEnhanceProps {
  /**
   * Link to the projects
   * @default /projects
   */
  projectsLink?: string;
  contactsLink?: string;
  supportTeamLink?: string;
}

class RootProjectNotFound extends Component<IProjectNotFoundProps> {
  static displayName = 'Maintenance';
  static enhance = [i18nEnhance()];
  static defaultProps = {
    icon: getIconPath('project_not_found'),
    projectsLink: '/projects',
    contactsLink: '/company/contacts',
    supportTeamLink: 'mailto:mail@semrush.com',
    i18n: {
      de,
      en,
      es,
      fr,
      it,
      ja,
      pt,
      ru,
      zh,
    },
  };

  render() {
    const { Root } = this;
    const { Children, getI18nText, projectsLink, contactsLink, supportTeamLink } = this.asProps;
    const { title, btnProjects, btnContacts } = getI18nText();
    const text = getI18nText('text', { url: supportTeamLink });
    return (
      <Root render={Error}>
        <Error.Title>{title}</Error.Title>
        {/* @ts-ignore */}
        <Error.Description tag={FormatText} size="xl" dangerouslySetInnerHTML={{ __html: text }} />
        <Children />
        <Error.Controls>
          <Button tag="a" type="none" size="xl" use="primary" theme="info" href={projectsLink}>
            {btnProjects}
          </Button>
          <Button size="xl" tag="a" type="none" href={contactsLink}>
            {btnContacts}
          </Button>
        </Error.Controls>
      </Root>
    );
  }
}

export default createComponent<Merge<IProjectNotFoundProps, ComponentProps<typeof Error>>>(
  RootProjectNotFound,
);
