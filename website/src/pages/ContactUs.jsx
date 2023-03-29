import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import postman from '../static/illustration/email-pic.svg';
import GitHubL from '@semcore/icon/color/GitHub/l';
import GitHubInvertL from '@semcore/icon/color/GitHubInvert/l';
import MailL from '@semcore/icon/Mail/l';
import Helmet from 'react-helmet';
import { getThemePreference } from '../utils/theme';
import styles from './ContactUs.module.css';

const Contacts = () => {
  const [theme, setTheme] = useState('');

  useLayoutEffect(() => {
    const currentTheme = getThemePreference();
    setTheme(currentTheme);
  }, [getThemePreference()]);

  return (
    <>
      <Helmet>
        <title>Contact Us | Contacts</title>
      </Helmet>
      <div className={styles.content} id="main-content">
        <div className={styles.header}>
          <h1>Contact Us</h1>
          Have any questions? We’d love to hear from you.
        </div>
        <div className={styles.email}>
          <h2 className={styles.title}>
            <MailL mr={2} />
            Email
          </h2>
          Feel free to drop us a line at
          <a
            href="mailto:ui-kit-team@semrush.com"
            target="_blank"
            aria-label="Drop a line at ui-kit-team@semrush.com"
          >
            ui-kit-team@semrush.com
          </a>{' '}
          in case:
          <div className={styles.text}>
            <h3 className={styles.subtitle}>Send a request to develop a new component</h3>
            Before sending email, check our
            <Link to="/internal/roadmap/" rel="noopener noreferrer" aria-label="Open Roadmap">
              Roadmap
            </Link>
            , perhaps needed component is already there. If not, share with some details:
            <ul>
              <li>Cases and requirements</li>
              <li>Guide and mockups</li>
              <li>Interactive prototype if there is an animation (any format: gif, axure, etc.)</li>
            </ul>
            <h3 className={styles.subtitle}>Leave feedback</h3>
            We care about usability and will be happy to receive feedback on both the site and the
            experience with our components.
            <h3 className={styles.subtitle}>Ask a question</h3>
            Just write your message 🙂 Your email won't be lost. We'll get back to you as soon as we
            can.
          </div>
        </div>
        <div className={styles.github}>
          <h2 className={styles.title}>
            {theme === 'light' ? <GitHubL mr={2} /> : <GitHubInvertL mr={2} />}
            GitHub
          </h2>
          Any developer can contribute via pull-request and
          <a
            href="https://github.com/semrush/intergalactic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Create an issue on GitHub"
          >
            issue on the GitHub
          </a>
          .
          <div className={styles.text}>
            <h3 className={styles.subtitle}>Bug reporting & Improvements</h3>
            Found a bug? Good job!
            <ul>
              <li>
                Make sure that issue tracker doesn't contain the similar issue and create one with
                the steps to reproduce the error.
              </li>
              <li>Have a solution — great! We'll be happy to review your pull-request.</li>
              <li>
                Don't forget to follow
                <a
                  href="https://github.com/semrush/intergalactic/blob/master/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open contributing guide"
                >
                  contributing guide
                </a>
                . It will make our joint work more effective!
              </li>
            </ul>
          </div>
        </div>
        <img className={styles.postman} src={postman} aria-hidden="true" />
      </div>
    </>
  );
};

export default Contacts;
