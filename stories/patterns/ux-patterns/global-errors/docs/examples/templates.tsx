import {
  AccessDenied,
  Maintenance,
  PageError,
  PageNotFound,
  ProjectNotFound,
} from '@semcore/errors';
import React from 'react';

const Demo = () => (
  <>
    <AccessDenied />
    <Maintenance toolName='Intergalactic' />
    <PageNotFound />
    <ProjectNotFound />
    <PageError />
  </>
);

export default Demo;
