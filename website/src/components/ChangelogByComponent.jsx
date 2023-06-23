import React from 'react';
import { Link } from 'react-router-dom';
import Tag from '@semcore/tag';
import { Text } from '@semcore/typography';
import cx from 'classnames';
import { getLabel } from './Changelog';
import HeadingLink from './HeadingLink.jsx';

import formatTextStyles from './FormatText.module.css';
import styles from './ChangelogByComponent.module.css';

const ChangelogByComponent = ({ blocks }) => {
  return blocks.map(({ title, components, id, route }) => (
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
      {components.map(({ title, component, changes }) => (
        <div key={component}>
          <Text
            tag='h3'
            style={{
              fontSize: '16px',
              lineHeight: '150%',
              margin: '16px 0',
              fontWeight: 700,
            }}
          >
            <span className={styles.componentTitle}>{title}</span>
            <small>({component})</small>
          </Text>
          <ul className={styles.list}>
            {changes.map(({ type, text }) => (
              <li className={styles.listItem} key={`${type}-${text}`}>
                {/* rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                {getLabel(type)} <Text dangerouslySetInnerHTML={{ __html: text }} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </span>
  ));
};

export default ChangelogByComponent;
