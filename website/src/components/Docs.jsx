import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Prismjs from 'prismjs';
import 'prismjs/components/prism-jsx';
import TabLine from '@semcore/tab-line';
import { Text } from '@semcore/typography';
import { RenderMarkdown } from './Markdown';
import { SideBar, SidebarWrapper } from './SideBar';
import NavLink from './NavLink';
import ImageFromModal from './ImageFromModal';
import { css } from '@semcore/core';
import { routes } from '@navigation';
import styles from './Docs.module.css';
import scrollToHash from '../utils/scrollToHash';

const tabLineStyles = css`
  STabLineItem {
    min-width: inherit !important;
    justify-content: flex-start;
  }

  SText {
    font-size: 18px;
    color: #171a22;
  }
`;

function useScrollHash(options = {}) {
  const readyStateComplete = new Promise((resolve) => {
    useEffect(() => {
      function checkReady() {
        if (document.readyState === 'complete') {
          setTimeout(() => {
            resolve();
          }, 100);
        }
      }

      checkReady();
      document.addEventListener('readystatechange', checkReady);
      return () => {
        document.removeEventListener('readystatechange', checkReady);
      };
    }, []);
  });
  return () => {
    readyStateComplete.then(() => scrollToHash());
  };
}

export const Docs = ({ tokens, tabs }) => {
  const match = useRouteMatch();
  const [contentModal, setContentModal] = useState(false);
  const contentRef = useRef(null);
  const prefetch = (route) => {
    routes[route]?.loadPage();
  };
  useEffect(() => {
    Prismjs.highlightAllUnder(contentRef.current);
  });

  const scrollCallback = useScrollHash();
  const handleClick = useCallback(
    (e) => {
      if (e.target.tagName !== 'IMG' || e.defaultPrevented) return;
      setContentModal(e.target.outerHTML);
    },
    [1],
  );
  const handleModalClose = useCallback(() => {
    setContentModal(null);
  }, [1]);

  return (
    <SidebarWrapper>
      {Boolean(tabs.length) && (
        <div className={styles.tab}>
          <TabLine
            value={match.url}
            size="l"
            styles={tabLineStyles}
            underlined={false}
            mb={6}
            className={styles.tabLine}
          >
            {tabs.map((tab) => {
              const { route } = tab;
              return (
                <TabLine.Item
                  key={route}
                  tag={NavLink}
                  to={`/${route}`}
                  value={`/${route}/`}
                  onMouseEnter={() => prefetch(route)}
                  type="tab"
                >
                  <Text>{tab.metadata.tabName || tab.title}</Text>
                </TabLine.Item>
              );
            })}
          </TabLine>
        </div>
      )}
      <main className={styles.main} ref={contentRef} onClick={handleClick}>
        <RenderMarkdown tokens={tokens} onRender={scrollCallback} />
      </main>
      <SideBar />
      <ImageFromModal content={contentModal} onClose={handleModalClose} />
    </SidebarWrapper>
  );
};
