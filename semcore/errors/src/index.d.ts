import type { Box, FlexProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import type { TIllustrationNamesErrors } from '@semcore/illustration';
import type React from 'react';

export type iconNamesErrors = TIllustrationNamesErrors;

export type ErrorsProps = FlexProps & {
  /**
   * Error icon
   */
  icon?: string | React.ReactNode;
};

export type ErrorsContext = {
  getTextProps: PropGetterFn;
  getDescriptionProps: PropGetterFn;
  getControlsProps: PropGetterFn;
};

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

export type PageNotFoundProps = WithI18nEnhanceProps & {
  /**
   * href of the home link
   * @default /
   */
  homeLink?: string;
  /**
   * HTML tag of the error title
   * @default h2
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
};

export type PageErrorProps = WithI18nEnhanceProps & {
  /**
   * Page reloading button click handler
   * @default () => { if (canUseDOM()) { location.reload(); } }
   */
  onClick?: (e: React.MouseEvent) => void;
  /**
   * HTML tag of the error title
   * @default h2
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
};

export type MaintenanceProps = WithI18nEnhanceProps & {
  /**
   * Tool name
   */
  toolName: string;
  /**
   * href of the home link
   * @default /
   */
  homeLink?: string;
  /**
   * HTML tag of the error title
   * @default h2
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
};

export type AccessDeniedProps = WithI18nEnhanceProps & {
  /**
   * href of the home link
   * @default /
   */
  homeLink?: string;
  /**
   * HTML tag of the error title
   * @default h2
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
};

declare const Error: Intergalactic.Component<'div', ErrorsProps, ErrorsContext> & {
  Title: typeof Box;
  Description: typeof Box;
  Controls: typeof Box;
};
declare const ProjectNotFound: Intergalactic.Component<'div', ProjectNotFoundProps & ErrorsProps>;
declare const PageNotFound: Intergalactic.Component<'div', PageNotFoundProps & ErrorsProps>;
declare const PageError: Intergalactic.Component<'div', PageErrorProps & ErrorsProps>;
declare const Maintenance: Intergalactic.Component<'div', MaintenanceProps & ErrorsProps>;
declare const AccessDenied: Intergalactic.Component<'div', AccessDeniedProps & ErrorsProps>;
declare const getIconPath: (name: iconNamesErrors) => string;

export default Error;
export { ProjectNotFound, PageNotFound, PageError, Maintenance, AccessDenied, getIconPath };
