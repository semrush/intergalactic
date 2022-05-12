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
import styled from 'styled-components';
import { css } from '@semcore/core';
import { routes } from '@navigation';

const Tab = styled.div`
  position: relative;
  overflow: auto;
  & > div:first-child {
    font-family: FactorA-Bold, sans-serif;
  }
  & > div:first-child > div {
    background-color: #ff622d;
    height: 2px;
  }
`;

const Main = styled.main`
  h2 {
    font-family: FactorA-Bold, sans-serif;
    font-size: 24px;
    line-height: 120%;
    margin: 40px 0 16px;
    &:first-child {
      margin: 0 0 16px;
    }
  }
  h3 {
    font-family: FactorA-Bold, sans-serif;
    font-size: 18px;
    line-height: 110%;
    margin: 24px 0 16px 0;
  }
  h4 {
    font-family: FactorA-Bold, sans-serif;
    font-size: 16px;
    line-height: 150%;
    margin: 16px 0;
  }
`;

const styles = css`
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
    readyStateComplete.then(() => {
      if (window.location.hash) {
        scroller.scrollTo(window.location.hash.replace('#', ''), {
          smooth: 'easeInOutQuint',
          offset: -150,
          ...options,
        });
      }
    });
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
        <Tab>
          <TabLine value={match.url} size="xl" styles={styles} underlined={false} mb={6}>
            {tabs.map((tab) => {
              const { route } = tab;
              return (
                <TabLine.Item
                  key={route}
                  tag={NavLink}
                  to={`/${route}`}
                  value={`/${route}/`}
                  onMouseEnter={() => prefetch(route)}
                >
                  <Text>{tab.metadata.tabName || tab.title}</Text>
                </TabLine.Item>
              );
            })}
          </TabLine>
        </Tab>
      )}
      <Main ref={contentRef} onClick={handleClick}>
        <RenderMarkdown tokens={tokens} onRender={scrollCallback} />
      </Main>
      <SideBar />
      <ImageFromModal content={contentModal} onClose={handleModalClose} />
    </SidebarWrapper>
  );
};
