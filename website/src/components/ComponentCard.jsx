import React from 'react';
import styles from './ComponentCard.module.css';
import { Link } from 'react-router-dom';
import { Text } from '@semcore/typography';
import staticFiles from '@static';

function ComponentCard({ image, text, disabled, href, type, onClick }) {
  const url = staticFiles[`${type}/${image}.svg`];

  if (!url) {
    // eslint-disable-next-line no-console
    console.warn(`No image found for ${type}/${image}`);
    return null;
  }

  return (
    <div className={styles.card} disabled={disabled}>
      <Link className={styles.linkUi} to={href} aria-label={text} onClick={onClick ?? undefined} />
      <img src={url} alt="image" aria-hidden="true" />
      <Text className={styles.title}>{text}</Text>
    </div>
  );
}

export default ComponentCard;
