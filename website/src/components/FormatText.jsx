import React from 'react';
import styles from './FormatText.module.css';

const FormatText = ({ html }) => {
  // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div className={styles.formatText} dangerouslySetInnerHTML={{ __html: html }} />;
};
FormatText.displayName = 'FormatText';

export default FormatText;
