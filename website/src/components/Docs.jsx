import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Prismjs from 'prismjs';
import 'prismjs/components/prism-jsx';
import TabLine from '@semcore/tab-line';
import Badge from '@semcore/badge';
import { routes } from '@navigation';
import { RenderMarkdown } from './Markdown';
import { SideBar, SidebarWrapper } from './SideBar';
import NavLink from './NavLink';
import ImageFromModal from './ImageFromModal';
import scrollToHash from '../utils/scrollToHash';
import { logEvent } from '../utils/amplitude';
import styles from './Docs.module.css';

const BLOCKQUOTE_A11Y_MAP = {
  A: '<blockquote class="--info">\n<h4>WCAG 2.1 A: Essential</h4>\n<p>This level defines the lowest or minimum level of accessibility. Assistive technology is able to read, understand, or fully operate the page or view.</p></blockquote>',
  AA: '<blockquote class="--info">\n<h4>WCAG 2.1 AA: Ideal Support</h4>\n<p>Component is usable and understandable for the majority of people with or without disabilities. The meaning conveyed and the functionality available is the same.</p></blockquote>',
  AAA: '<blockquote class="--info">\n<h4>WCAG 2.1 AAA: Specialized Support</h4>\n<p>The highest level of accessibility of a component that serve a specialized audience.</p></blockquote>',
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

export const Docs = ({ route, tokens, tabs, pageTitle }) => {
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
      console.warn(`[${match.url}] Invalid value "${activeTab.metadata.a11y}" for "a11y" field`);
    }
  }

  return (
    <SidebarWrapper>
      {Boolean(tabs.length) && (
        <TabLine value={match.url} size="l" underlined={false} className={styles.tabLine}>
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
                className={styles.tabLineItem}
                onClick={() =>
                  logEvent('tab:click', {
                    group: 'int_patterns',
                    page: pageTitle,
                    tab: tab.metadata.tabName || tab.title,
                  })
                }
              >
                <TabLine.Item.Text>{tab.metadata.tabName || tab.title}</TabLine.Item.Text>
                {tab.metadata.a11y && (
                  <TabLine.Item.Addon>
                    <Badge bg="blue-300">WCAG-{tab.metadata.a11y}</Badge>
                  </TabLine.Item.Addon>
                )}
              </TabLine.Item>
            );
          })}
        </TabLine>
      )}
      <main className={styles.main} ref={contentRef} onClick={handleClick}>
        <RenderMarkdown tokens={tokens} onRender={scrollCallback} />
      </main>
      <SideBar />
      <ImageFromModal content={contentModal} onClose={handleModalClose} />
    </SidebarWrapper>
  );
};
