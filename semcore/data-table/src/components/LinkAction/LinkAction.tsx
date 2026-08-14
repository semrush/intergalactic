import type { NSButtonLink } from '@semcore/button';
import Divider from '@semcore/divider';
import type { NSLink } from '@semcore/link';
import React from 'react';

interface IProps {
  children: [ReturnType<NSLink.Component>, ...Array<ReturnType<NSButtonLink.Component> | ReturnType<NSLink.Component>>];
}

export class LinkAction extends React.PureComponent<IProps> {
  render(): React.ReactNode {
    const { children: [Link, ...Actions] } = this.props;
    return (
      <>
        {Link}
        <Divider orientation='vertical' mx={1} hMin={0} my={1} />
        {Actions}
      </>
    );
  }
}
