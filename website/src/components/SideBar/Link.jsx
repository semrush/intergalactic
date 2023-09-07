import React from 'react';
import { SideBarContext } from './SideBarWrapper';
import Link from '@semcore/link';

export default function InterfaceLink(props) {
  const { handleLinkClick } = React.useContext(SideBarContext);
  const { name } = props;
  return <Link onClick={handleLinkClick(name)}>{name}</Link>;
}
