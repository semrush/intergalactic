import type { NSButtonLink } from '@semcore/button';
import Divider from '@semcore/divider';
import type { NSLink } from '@semcore/link';
import React from 'react';

interface IProps {
  children: [NSLink.Componet, NSButtonLink.Component];
}

export class LinkAction extends React.PureComponent<IProps> {
  render(): React.ReactNode {
    const { children: [Link, ButtonLink] } = this.props;
    return (
      <>
        {Link}
        <Divider orientation='vertical' mx={1} hMin={0} my={1} />
        {ButtonLink}
      </>
    );
  }
}
