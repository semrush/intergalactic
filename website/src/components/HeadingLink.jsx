import React from 'react';
import LinkM from '@semcore/icon/Link/m';
import scrollToHash from '../utils/scrollToHash';

import styles from './HeadingLink.module.css';

function HeadingLink({ level, id, children }) {
  return React.createElement(`h${level}`, {
    className: styles.heading,
    as: `h${level}`,
    id,
    style: { fontWeight: level > 3 ? 'normal' : 500 },
    children: (
      <>
        <LinkM onClick={() => scrollToHash(id)} />
        {children}
      </>
    ),
  });
}

export default HeadingLink;
