import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Error.module.css';
import spaceman from '../static/illustration/spaceman.svg';
import { useRouting } from './routing';

export default (props) => {
  const params = useParams();
  const { route } = useRouting();
  if (globalThis.__ssr && __ssr_route !== 'not-found') {
    console.error({
      params,
      route,
      __ssr_route: globalThis.__ssr_route,
      error: props.title,
    });
    throw new Error('Got an error during ssr');
  }
  return (
    <div className={styles.content}>
      <img className={styles.spaceman} src={spaceman} />
      <div className={styles.info}>
        <h1>{props.title}</h1>
        <p>
          Huston, we have problems. <br /> Try to return to the <Link to="/">Main page.</Link>
        </p>
        <p>
          If you see this page all the time, feel free to drop us <br /> a line at{' '}
          <a href="mailto:ui-kit-team@semrush.com">ui-kit-team@semrush.com</a>
          or open an{' '}
          <a
            href="https://github.com/semrush/intergalactic"
            target="_blank"
            rel="noopener noreferrer"
          >
            issue on the GitHub.
          </a>{' '}
          <br /> We'll do something about it 😛
        </p>
      </div>
    </div>
  );
};
