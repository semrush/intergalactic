import React from 'react';
import NavLink from './NavLink';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <nav className={styles.links} aria-label="Additional links">
        <NavLink to="/terms/terms-of-use/">Terms of Use</NavLink>
        <NavLink to="/terms/privacy/">Privacy Policy</NavLink>
        <a href="https://www.semrush.com/company/careers" target="_blank" rel="noopener noreferrer">
          Careers
        </a>
        <NavLink to="/contacts/contact-info/">Contact Us</NavLink>
      </nav>

      <div className={styles.logo}>
        Powered by <SemrushLogo />
      </div>
      <div className={styles.description}>
        © 2008 - {new Date().getFullYear()} Semrush. All rights reserved.
      </div>

      <div className={styles.contacts} aria-label="Contact info">
        If you want to ask something, drop us a line at
        <a
          href="mailto:ui-kit-team@semrush.com"
          target="_blank"
          aria-label="Drop a line at ui-kit-team@semrush.com"
        >
          ui-kit-team@semrush.com
        </a>
        or open an
        <a
          href="https://github.com/semrush/intergalactic"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Create an issue on GitHub"
        >
          issue on GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;

const SemrushLogo = () => {
  return (
    <svg
      width="134"
      height="18"
      viewBox="0 0 134 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M92.1 6.95c0-2.18-1.34-3.77-3.92-3.77h-8.31V14.5h2.73v-3.87h3.23L89 14.5h3.08v-.25L89 10.57c1.94-.4 3.1-1.8 3.1-3.62zm-4.22 1.4h-5.27V5.53h5.27c.98 0 1.6.51 1.6 1.41 0 .92-.6 1.41-1.6 1.41zm45.52-5.17h-2.57v4.3h-6.88v-4.3h-2.77V14.5h2.77v-4.47h6.88v4.47h2.56V3.18zm-60.84 0L69.5 12.7h-.17L66.3 3.18h-4.87V14.5h2.6V5.2h.16l3.05 9.3h4.2l3.05-9.3h.16v9.3h2.69V3.18h-4.77zM42.8 7.81l-3.72-.37c-.95-.1-1.5-.38-1.5-1 0-.6.58-1.11 2.93-1.11a13 13 0 015.66 1.25V4.05a13.09 13.09 0 00-5.8-1.18c-3.23 0-5.46 1.34-5.46 3.62 0 1.93 1.31 2.98 3.93 3.27.95.1 2.57.25 3.7.34 1.23.1 1.59.48 1.59 1.04 0 .77-.87 1.24-3.05 1.24-2.22 0-4.47-.73-6.07-1.75v2.61c1.3.86 3.5 1.6 5.98 1.6 3.52 0 5.78-1.36 5.78-3.8.02-1.83-1.19-2.94-3.97-3.23zm5.78-4.63V14.5h10.56v-2.32h-7.95v-2.3H59V7.6h-7.8V5.5h7.95V3.18H48.58zm66.95 4.63l-3.73-.37c-.95-.1-1.5-.38-1.5-1 0-.6.58-1.11 2.94-1.11a13 13 0 015.66 1.25V4.05a13.1 13.1 0 00-5.81-1.18c-3.22 0-5.45 1.34-5.45 3.62 0 1.93 1.3 2.98 3.93 3.27.95.1 2.56.25 3.7.34 1.22.1 1.58.48 1.58 1.04 0 .77-.86 1.24-3.04 1.24-2.22 0-4.47-.73-6.07-1.75v2.61c1.29.86 3.5 1.6 5.98 1.6 3.51 0 5.77-1.36 5.77-3.8.03-1.83-1.18-2.94-3.96-3.23zm-12.48-4.63v5.8c0 2.2-1.33 3.4-3.34 3.4s-3.33-1.19-3.33-3.44V3.18h-2.72v5.5c0 4.11 2.56 6.15 6.1 6.15 3.39 0 6.02-1.95 6.02-6V3.17h-2.73z"
          fill="var(--intergalactic-text-primary)"
        />
        <path
          d="M25.56 8.78c0 .54-.28.63-.98.63-.74 0-.87-.12-.95-.68-.15-1.42-1.1-2.63-2.72-2.76-.52-.05-.64-.24-.64-.88 0-.59.1-.87.55-.87a4.68 4.68 0 014.74 4.56zm4.07 0C29.63 4.5 26.74 0 20.07 0H6.82c-.27 0-.44.13-.44.38 0 .13.1.26.2.33.47.38 1.19.8 2.13 1.27.92.46 1.63.76 2.35 1.05.3.13.41.26.41.43 0 .23-.16.38-.49.38H.46c-.31 0-.46.2-.46.4 0 .17.06.32.2.46.85.9 2.22 1.97 4.2 3.21A60.6 60.6 0 0010 11c.29.14.38.3.38.46-.01.2-.16.35-.5.35H5.06c-.27 0-.43.14-.43.37 0 .12.1.28.24.4 1.1 1 2.85 2.08 5.2 3.08a24.54 24.54 0 009.84 2.13c6.75 0 9.72-5.05 9.72-9zm-8.81 6.05a6.09 6.09 0 01-6.08-6.05 6.04 6.04 0 016.08-5.97 6.02 6.02 0 110 12.02z"
          fill="var(--intergalactic-brand-tertiary)"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0h134v17.78H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
