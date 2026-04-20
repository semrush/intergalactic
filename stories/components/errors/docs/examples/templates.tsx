import {
  AccessDenied,
  Maintenance,
  PageError,
  PageNotFound,
  ProjectNotFound,
} from '@semcore/ui/errors';
import type {
  NSErrors,
  // NSAccessDenied,
  // NSMaintenance,
  // NSPageError,
  // NSPageNotFound,
  // NSProjectNotFound,
} from '@semcore/ui/errors';
import React from 'react';

type errorProps =
  & NSErrors.AccessDenied.Props
  & NSErrors.Maintenance.Props
  & NSErrors.PageError.Props
  & NSErrors.PageNotFound.Props
  & NSErrors.ProjectNotFound.Props;

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
