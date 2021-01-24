import React from 'react';
import PlaygroundGeneration from 'components/PlaygroundGeneration';
import Breadcrumbs from '@semcore/breadcrumbs';

export default PlaygroundGeneration(() => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">Dashboard</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
      <Breadcrumbs.Item active>semrush.com</Breadcrumbs.Item>
    </Breadcrumbs>
  );
});
