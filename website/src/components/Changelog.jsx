import React from 'react';
import Tag from '@semcore/tag';
import { Text } from '@semcore/typography';
import cx from 'classnames';
import HeadingLink from './HeadingLink.jsx';

import formatTextStyles from './FormatText.module.css';
import styles from './Changelog.module.css';

export const getLabel = (type) => {
  switch (type) {
    case 'Added':
      return (
        <Tag className={cx(styles.tagStyled, styles.greenContainer)} size='l'>
          <Tag.Text className={styles.greenText}>{type}</Tag.Text>
        </Tag>
      );
    case 'Fixed':
      return (
        <Tag className={cx(styles.tagStyled, styles.blueContainer)} size='l'>
          <Tag.Text className={styles.blueText}>{type}</Tag.Text>
        </Tag>
      );
    case 'Changed':
    case 'Removed':
    case 'Deprecated':
      return (
        <Tag className={cx(styles.tagStyled, styles.orangeContainer)} size='l'>
          <Tag.Text className={styles.orangeText}>{type}</Tag.Text>
        </Tag>
      );
    case 'BREAK':
    case 'Security':
      return (
        <Tag className={cx(styles.tagStyled, styles.redContainer)} size='l'>
          <Tag.Text className={styles.redText}>{type}</Tag.Text>
        </Tag>
      );
    default:
      return <strong>{type}</strong>;
  }
};

const Changelog = ({ blocks }) => {
  return blocks.map(({ title, changes, id, route }) => (
    <span key={title} className={formatTextStyles.formatText}>
      <HeadingLink
        level={2}
        id={id}
        style={{
          fontSize: '18px',
          lineHeight: '110%',
          margin: '32px 0 16px 0',
        }}
        route={route}
        title={title}
      >
        <Text bold>{title}</Text>
      </HeadingLink>
      <ul className={styles.list}>
        {changes.map(({ type, text }) => (
          <li className={styles.listItem} key={`${type}-${text}`}>
            {/* rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
            {getLabel(type)} <Text dangerouslySetInnerHTML={{ __html: text }} />
          </li>
        ))}
      </ul>
    </span>
  ));
};

export default Changelog;
