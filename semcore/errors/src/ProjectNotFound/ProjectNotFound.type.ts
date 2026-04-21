import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';

import type { NSErrors } from '../Error.type';

declare namespace NSProjectNotFound {
  type Props = WithI18nEnhanceProps & {
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

  type Component = Intergalactic.Component<'div', Props & NSErrors.Props>;
}

/** @deprecated It will be removed in v18. */
export type ProjectNotFoundProps = NSProjectNotFound.Props;

export type { NSProjectNotFound };
