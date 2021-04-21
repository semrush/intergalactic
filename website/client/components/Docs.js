import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Prismjs from 'prismjs';
import 'prismjs/components/prism-jsx';
import TabLine from '@semcore/tab-line';
import { Text } from '@semcore/typography';
import useApolloPrefetch from '../useApolloPrefetch';
import RenderTags from '../tags';
import { SideBar, SidebarWrapper } from './SideBar';
import NavLink from './NavLink';
import ImageFromModal from './ImageFromModal';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import Error from './Error';
import { PAGE_QUERY } from '../pages/Page';
import { css } from '@semcore/core';

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
    font-size: 24px;
    line-height: 120%;
    margin: 16px 0 16px;
  }
  h3 {
    font-size: 24px;
    line-height: 120%;
    margin: 16px 0 16px;
  }
  h4 {
    font-size: 18px;
    line-height: 110%;
    margin: 16px 0 16px;
  }
`;

const styles = css`
  STabLineItem {
    min-width: inherit !important;
    justify-content: flex-start;
  }

  SText {
    font-size: 24px;
    color: #171a22;
  }
`;

function useScrollHash(options = {}) {
  let readyStateComplete = new Promise((resolve) => {
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

function Documentation(props) {
  let { category, page, tab } = useParams();
  let slug = `${category}/${page}`;
  if (tab) slug = `${slug}/${tab}`;

  const { error, data } = useQuery(PAGE_QUERY, {
    variables: { slug, category },
    // prod = 1 min; dev = 2 sec
    pollInterval: process.env.NODE_ENV === 'production' ? 60000 : 2000,
  });

  if (error && !data) return <Error title="Oh no! It’s 404!" />;

  const match = useRouteMatch();
  const [contentModal, setContentModal] = useState(false);
  const contentRef = useRef(null);
  const { prefetch } = useApolloPrefetch();
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
      {Boolean(props.tabs.length) && (
        <Tab>
          <TabLine value={match.url} size="xl" styles={styles} underlined={false} mb={6}>
            {props.tabs.map((tab, i) => {
              const { route } = tab;
              const [category] = route.split('/');
              return (
                <TabLine.Item
                  key={i}
                  tag={NavLink}
                  to={`/${route}`}
                  value={`/${route}/`}
                  onMouseEnter={() => prefetch(category, route)}
                >
                  <Text>{tab.metadata.tabName || tab.title}</Text>
                </TabLine.Item>
              );
            })}
          </TabLine>
        </Tab>
      )}
      <Main ref={contentRef} onClick={handleClick}>
        <RenderTags content={props.page.contents} onRender={scrollCallback} />
      </Main>
      <SideBar />
      <ImageFromModal content={contentModal} onClose={handleModalClose} />
    </SidebarWrapper>
  );
}

export default Documentation;
