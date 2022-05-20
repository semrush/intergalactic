import React, { useContext } from 'react';
import { SideBarContext } from './SideBarWrapper';
import Link from '@semcore/link';

export default function InterfaceLink(props) {
  const { handleLinkClick } = useContext(SideBarContext);
  const { name } = props;
  return <Link onClick={handleLinkClick(name)}>{name}</Link>;
}
