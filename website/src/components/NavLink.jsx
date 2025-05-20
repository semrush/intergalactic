import React from 'react';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styles from './NavLink.module.css';

const NavLink = React.forwardRef(function (
  { neighborLocation, keyboardFocused, highlighted, active, ...other },
  ref,
) {
  return (
    <RouterNavLink
      className={styles.navLink}
      ref={ref}
      {...propsForElement(other, other.component)}
    />
  );
});

export default NavLink;
