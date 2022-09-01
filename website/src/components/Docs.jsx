import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Prismjs from 'prismjs';
import 'prismjs/components/prism-jsx';
import TabLine from '@semcore/tab-line';
import Badge from '@semcore/badge';
import { css } from '@semcore/core';
import { routes } from '@navigation';
import { RenderMarkdown } from './Markdown';
import { SideBar, SidebarWrapper } from './SideBar';
import NavLink from './NavLink';
import ImageFromModal from './ImageFromModal';
import scrollToHash from '../utils/scrollToHash';
import styles from './Docs.module.css';

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

const BLOCKQUOTE_A11Y_MAP = {
  A: '<blockquote class="--info">\n<h4>WAI-A: Essential</h4>\n<p>This level defines the lowest or minimum level of accessibility. Assistive technology is able to read, understand, or fully operate the page or view.</p></blockquote>',
  AA: '<blockquote class="--info">\n<h4>WAI-AA: Ideal Support</h4>\n<p>Component is usable and understandable for the majority of people with or without disabilities. The meaning conveyed and the functionality available is the same.</p></blockquote>',
  AAA: '<blockquote class="--info">\n<h4>WAI-AAA: Specialized Support</h4>\n<p>The highest level of accessibility of a component that serve a specialized audience.</p></blockquote>',
};

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

export const Docs = ({ route, tokens, tabs }) => {
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
  const activeTab = tabs.find((tab) => `/${tab.route}/` === match.url);

  if (activeTab?.metadata?.a11y) {
    const html = BLOCKQUOTE_A11Y_MAP[activeTab.metadata.a11y];
    if (html) {
      // copy
      tokens = tokens.slice();
      tokens.unshift({
        html,
        type: 'text',
      });
    } else {
      console.warn(`[${match.url}] Invalid value "${tab.metadata.a11y}" for "a11y" field`);
    }
  }

  return (
    <SidebarWrapper>
      {Boolean(tabs.length) && (
        <div className={styles.tab}>
          <TabLine
            value={match.url}
            size="l"
            styles={tabLineStyles}
            underlined={false}
            className={styles.tabLine}
          >
            {tabs.map((tab) => {
              const { route } = tab;
              return (
                <TabLine.Item
                  key={route}
                  tag={NavLink}
                  to={`/${route}/`}
                  value={`/${route}/`}
                  onMouseEnter={() => prefetch(route)}
                  type="tab"
                >
                  <TabLine.Item.Text>{tab.metadata.tabName || tab.title}</TabLine.Item.Text>
                  {tab.metadata.a11y && (
                    <TabLine.Item.Addon>
                      <Badge bg="blue-300">WAI-{tab.metadata.a11y}</Badge>
                    </TabLine.Item.Addon>
                  )}
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
