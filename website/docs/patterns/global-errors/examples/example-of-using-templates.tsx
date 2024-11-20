import React from 'react';
import {
  AccessDenied,
  Maintenance,
  PageError,
  PageNotFound,
  ProjectNotFound,
} from '@semcore/errors';

const Demo = () => (
  <>
    <AccessDenied />
    <Maintenance toolName={'Intergalactic'} />
    <PageNotFound />
    <ProjectNotFound />
    <PageError />
  </>
);

export default Demo;
