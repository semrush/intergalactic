import React from 'react';
import styles from './NavLink.module.css';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = React.forwardRef(function (
  { neighborLocation, keyboardFocused, highlighted, active, ...other },
  ref,
) {
  return <RouterNavLink className={styles.navLink} ref={ref} {...other} />;
});

export default NavLink;
