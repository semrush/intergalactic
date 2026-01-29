import { ButtonLink } from '@semcore/ui/button';
import LinkExternalM from '@semcore/ui/icon/LinkExternal/m';
import React from 'react';

const Demo = () => (
  <ButtonLink
    addonLeft={LinkExternalM}
    title='Go to our awesome article'
    color='icon-secondary-neutral'
  />
);

export default Demo;
