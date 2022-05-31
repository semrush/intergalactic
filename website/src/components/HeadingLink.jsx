import React from 'react';
import styles from './HeadingLink.module.css';

import LinkM from '@semcore/icon/Link/m';

function HeadingLink({ level, id, children }) {
  return React.createElement(`h${level}`, {
    className: styles.heading,
    as: `h${level}`,
    id,
    style: { fontWeight: level > 3 ? 'normal' : 500 },
    children: (
      <>
        <LinkM onClick={() => (window.location.hash = `#${id}`)} />
        {children}
      </>
    ),
  });
}

export default HeadingLink;
