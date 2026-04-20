import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';

import type { ErrorsProps } from '../Error.type';

export type ProjectNotFoundProps = WithI18nEnhanceProps & {
  /**
   * URL for the "Go to Projects" button
   * @default /projects
   */
  projectsLink?: string;
  /**
   * URL for the "Contact us" button
   * @default /company/contacts
   */
  contactsLink?: string;
  /**
   * URL for the "Support Team" link
   * @default /company/contacts
   */
  supportTeamLink?: string;
  /**
   * HTML tag of the error title
   * @default h2
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
};

export type ProjectNotFoundComponent = Intergalactic.Component<'div', ProjectNotFoundProps & ErrorsProps>;
