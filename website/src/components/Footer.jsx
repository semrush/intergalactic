import React from 'react';
import logo from '../static/logo/semrush-logo-title.svg';
import NavLink from './NavLink';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.links}>
        <NavLink to="/terms/terms-of-use/">Terms of Use</NavLink>
        <NavLink to="/terms/privacy/">Privacy Policy</NavLink>
        <a href="https://www.semrush.com/company/careers" target="_blank" rel="noopener noreferrer">
          Careers
        </a>
        <NavLink to="/contacts/contact-info/">Contact Us</NavLink>
      </div>

      <div className={styles.logo}>
        Powered by <img src={logo} alt="Logo" />
      </div>
      <div className={styles.description}>
        © 2008 - {new Date().getFullYear()} Semrush. All rights reserved.
      </div>

      <div className={styles.contacts}>
        If you want to ask something, drop us a line at
        <a href="mailto:ui-kit-team@semrush.com" target="_blank">
          ui-kit-team@semrush.com
        </a>
        or open an
        <a
          href="https://github.com/semrush/intergalactic"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue on GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
