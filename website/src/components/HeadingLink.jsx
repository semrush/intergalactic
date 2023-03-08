import React from 'react';
import LinkM from '@semcore/icon/Link/m';
import scrollToHash from '../utils/scrollToHash';
import { logEvent } from '../utils/amplitude';

import styles from './HeadingLink.module.css';

function HeadingLink({ level, id, children, style, route, title = '' }) {
  const [group, page] = route ? route.split('/') : ['', ''];
  return React.createElement(`h${level}`, {
    className: styles.heading,
    as: `h${level}`,
    id,
    style: { fontWeight: level > 3 ? 'normal' : 500, ...style },
    children: (
      <>
        <LinkM
          onClick={() => {
            logEvent('title:click', {
              group,
              page,
              title,
            });
            scrollToHash(id);
          }}
        />
        {children}
      </>
    ),
  });
}

export default HeadingLink;
