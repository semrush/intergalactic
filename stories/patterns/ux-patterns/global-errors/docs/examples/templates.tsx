import {
  AccessDenied,
  FolderNotFound,
  Maintenance,
  PageError,
  PageNotFound,
  ProjectNotFound,
} from '@semcore/errors';
import React from 'react';

const Demo = () => (
  <>
    <AccessDenied />
    <FolderNotFound />
    <Maintenance toolName='Intergalactic' />
    <PageNotFound />
    <ProjectNotFound />
    <PageError />
  </>
);

export default Demo;
