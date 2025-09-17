import {
  AccessDenied,
  Maintenance,
  PageError,
  PageNotFound,
  ProjectNotFound,
} from '@semcore/errors';
import type { AccessDeniedProps, MaintenanceProps, PageErrorProps, PageNotFoundProps, ProjectNotFoundProps } from '@semcore/errors';
import React from 'react';

type errorProps = AccessDeniedProps & MaintenanceProps & PageErrorProps & PageNotFoundProps & ProjectNotFoundProps;

const Demo = (props: errorProps) => (
  <>
    <AccessDenied homeLink={props.homeLink} titleTag={props.titleTag} />
    <Maintenance toolName={props.toolName} homeLink={props.homeLink} titleTag={props.titleTag} />
    <PageNotFound homeLink={props.homeLink} titleTag={props.titleTag} />
    <ProjectNotFound titleTag={props.titleTag} projectsLink={props.projectsLink} contactsLink={props.contactsLink} supportTeamLink={props.supportTeamLink} />
    <PageError titleTag={props.titleTag} />
  </>
);

export const defaultProps: errorProps = {
  toolName: 'Intergalactic',
  homeLink: undefined,
  titleTag: undefined,
  projectsLink: undefined,
  contactsLink: undefined,
  supportTeamLink: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
