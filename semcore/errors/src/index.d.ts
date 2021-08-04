import React from 'react';
import { Box, IFlexProps } from '@semcore/flex-box';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';

export type iconNames =
  | 'access_denied'
  | 'blocked'
  | 'confirmation'
  | 'connection_lost'
  | 'deleted_account'
  | 'dns'
  | 'maintenance'
  | 'no_payment'
  | 'page_error'
  | 'page_not_found'
  | 'project_not_found'
  | 'timeout';

export interface IErrorsProps extends IFlexProps {
  /**
   * Error icon
   */
  icon?: string | React.ReactNode;
}

export interface IErrorsContext {
  getTextProps: PropGetterFn;
  getDescriptionProps: PropGetterFn;
  getControlsProps: PropGetterFn;
}

export interface IProjectNotFoundProps extends IWithI18nEnhanceProps {
  /**
   * Link to the projects
   * @default /projects
   */
  projectsLink?: string;
  contactsLink?: string;
  supportTeamLink?: string;
}

export interface IPageNotFoundProps extends IWithI18nEnhanceProps {
  /**
   * href of the link home
   * @default /
   */
  homeLink?: string;
}

export interface IPageErrorProps extends IWithI18nEnhanceProps {
  /**
   * Page reloading button click handler
   * @default () => { if (canUseDOM()) { location.reload(); } }
   */
  onClick?: (e: React.MouseEvent) => void;
}

export interface IMaintenanceProps extends IWithI18nEnhanceProps {
  /**
   * Tool name
   */
  toolName: string;
  /**
   * href of the link home
   * @default /
   */
  homeLink?: string;
}

export interface IAccessDeniedProps extends IWithI18nEnhanceProps {
  /**
   * href of the link home
   * @default /
   */
  homeLink?: string;
}

declare const Error: (<T>(props: CProps<IErrorsProps & T, IErrorsContext>) => ReturnEl) & {
  Title: typeof Box;
  Description: typeof Box;
  Controls: typeof Box;
};
declare const ProjectNotFound: <T>(props: IProjectNotFoundProps & IErrorsProps & T) => ReturnEl;
declare const PageNotFound: <T>(props: IPageNotFoundProps & IErrorsProps & T) => ReturnEl;
declare const PageError: <T>(props: IPageErrorProps & IErrorsProps & T) => ReturnEl;
declare const Maintenance: <T>(props: IMaintenanceProps & IErrorsProps & T) => ReturnEl;
declare const AccessDenied: <T>(props: IAccessDeniedProps & IErrorsProps & T) => ReturnEl;
declare const getIconPath: (name: iconNames) => string;

export default Error;
export { ProjectNotFound, PageNotFound, PageError, Maintenance, AccessDenied, getIconPath };
