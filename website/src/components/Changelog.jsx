import React from 'react';
import Tag from '@semcore/tag';
import { Text } from '@semcore/typography';
import HeadingLink from './HeadingLink.jsx';

import formatTextStyles from './FormatText.module.css';
import styles from './Changelog.module.css';

export const getLabel = (type) => {
  switch (type) {
    case 'Added':
      return (
        <Tag className={styles.tagStyled} size="l" color="green-500">
          {type}
        </Tag>
      );
    case 'Fixed':
      return (
        <Tag className={styles.tagStyled} size="l" color="blue-500">
          {type}
        </Tag>
      );
    case 'Changed':
    case 'Removed':
    case 'Deprecated':
      return (
        <Tag className={styles.tagStyled} size="l" color="orange-500">
          {type}
        </Tag>
      );
    case 'BREAK':
    case 'Security':
      return (
        <Tag className={styles.tagStyled} size="l" color="red-500">
          {type}
        </Tag>
      );
    default:
      return <strong>{type}</strong>;
  }
};

const Changelog = ({ blocks }) => {
  return blocks.map(({ title, changes, version }) => (
    <span key={title} className={formatTextStyles.formatText}>
      <HeadingLink level={3} id={version}>
        <Text bold>{title}</Text>
      </HeadingLink>
      <ul className={styles.list}>
        {changes.map(({ type, text }) => (
          <li className={styles.listItem} key={`${type}-${text}`}>
            {getLabel(type)} <Text dangerouslySetInnerHTML={{ __html: text }} />
          </li>
        ))}
      </ul>
    </span>
  ));
};

export default Changelog;
