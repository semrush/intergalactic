import React from 'react';
import styles from './ComponentCard.module.css';
import { Text } from '@semcore/typography';
import staticFiles from '@static';

function ComponentCard({ image, text, disabled, href, type }) {
  const url = staticFiles[`${type}/${image}.svg`];

  if (!url) {
    console.warn(`No image found for ${type}/${image}`);
    return null;
  }

  return (
    <li className={styles.card} disabled={disabled}>
      <a className={styles.linkUi} href={href} aria-label={text}>
        <img src={url} alt='image' aria-hidden='true' />
        <Text className={styles.title}>{text}</Text>
      </a>
    </li>
  );
}

export default ComponentCard;
