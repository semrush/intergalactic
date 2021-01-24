import React from 'react';
import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';

const Link = styled(RouterNavLink)`
  -webkit-appearance: none;
`;

const NavLink = React.forwardRef(function(
  { neighborLocation, keyboardFocused, highlighted, active, ...other },
  ref,
) {
  return <Link ref={ref} {...other} />;
});

export default NavLink;
