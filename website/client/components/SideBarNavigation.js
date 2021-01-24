import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, withRouter } from 'react-router-dom';
import { InstantSearch } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';
import IF from '@semcore/utils/lib/if';
import { Text } from '@semcore/typography';
import ChevronRightXS from '@semcore/icon/lib/ChevronRight/xs';

import CONFIG from '../algolia';
import HighlightFromGroup from './HighlightFromGroup';
import useApolloPrefetch from '../useApolloPrefetch';

const searchClient = algoliasearch(CONFIG.ALGOLIA_APP, CONFIG.ALGOLIA_OPEN_KEY);

const Root = styled.div`
  height: 100%;
  max-width: 350px;
  .ais-InstantSearch__root {
    height: 100%;
  }
  @media (max-width: 768px) {
    margin-right: 0;
    max-width: 100%;
  }
`;

const NavigationView = styled.div`
  padding: 32px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  @media (max-width: 768px) {
    height: 100vh;
    overflow: scroll;
  }
`;

const CategoryItem = styled.a`
  padding: 8px 0 8px 24px;
  font-size: 18px;
  line-height: 1.25;
  color: #171a22;
  cursor: pointer;
  text-decoration: none;
  display: block;
  transition: color 0.5s;
  box-shadow: ${({ highlighted }) => (highlighted ? '0 0 0 3px rgba(42, 148, 224, 0.3)' : 'none')};

  &:hover {
    color: #ff622d;
  }

  & ais-highlight-0000000000 {
    background-color: rgba(255, 200, 63, 0.3);
  }
  ${({ disabled }) =>
    disabled &&
    `
    cursor: default;
    pointer-events: none;
    color: #ccc;
  `} ${({ active }) =>
    active &&
    `
    color: #ff622d;
  `};
`;

const CategoryTitle = styled.div`
  color: #898d9a !important;
  cursor: pointer;
  padding: 8px 0;
  font-weight: 500;
  font-size: 21px !important;
  line-height: 135%;
  &:hover,
  &:hover > * {
    color: #ff622d;
  }
`;

const SideBarNavigation = withRouter(
  connectAutoComplete(({ currentRefinement, refine, hits, navigation, history }) => {
    const { category, page } = useParams();
    const refHighlightFromGroup = React.createRef();
    const refInputSearch = React.createRef();
    const [highlightedIndex, setHighlightedIndex] = useState();
    const [collapseCategories, setCollapseCategories] = useState([category]);
    const { prefetch } = useApolloPrefetch();

    function getFilterNavigation() {
      return navigation
        .map((c) => ({
          ...c,
          // copy hack
          children: c.children
            .map((p) => ({ ...p }))
            .filter((p) => p.title !== 'Terms of Use' && p.title !== 'Privacy Policy')
            .filter((p) => {
              // if search value
              if (currentRefinement) {
                // filter result search
                const hit = hits.find((h) => h.slug === `/${p.route}/`);
                if (hit) p.title = hit._highlightResult.title.value;
                return !!hit;
              }
              return p;
            }),
        }))
        .filter((c) => !!c.children.length);
    }

    // cmd + k = focus input
    useEffect(() => {
      function keyDown(e) {
        if (e.keyCode === 75 && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          refInputSearch.current && refInputSearch.current.focus();
        }
      }

      document.addEventListener('keydown', keyDown);
      return () => document.removeEventListener('keydown', keyDown);
    });

    // hack scroll START 😡
    useEffect(() => {
      if (refHighlightFromGroup.current) {
        refHighlightFromGroup.current.listNode = document.documentElement;
        if (refHighlightFromGroup.current.highlightedNode) {
          refHighlightFromGroup.current.highlightedNode.scrollIntoView({
            block: 'nearest',
          });
        }
      }
    }, [highlightedIndex]);
    // hack scroll END 😡

    return (
      <HighlightFromGroup
        ref={refHighlightFromGroup}
        highlightedIndex={highlightedIndex}
        onHighlightedIndexChange={(highlightedIndex) => {
          getFilterNavigation().reduce((i, c) => {
            if (i <= highlightedIndex && highlightedIndex <= i + c.children.length - 1) {
              if (!collapseCategories.includes(c.route)) {
                setCollapseCategories(collapseCategories.concat(c.route));
              }
            }
            return i + c.children.length;
          }, 0);
          setHighlightedIndex(highlightedIndex);
        }}
        onSelect={(item) => history.push(item.to)}
      >
        {({ getItemProps }) => (
          <NavigationView>
            {getFilterNavigation().map((c, i) => {
              const isOpen = collapseCategories.includes(c.route);
              return (
                <React.Fragment key={i}>
                  <CategoryTitle
                    key={`category-${i}`}
                    onClick={() => {
                      if (collapseCategories.includes(c.route)) {
                        setCollapseCategories(collapseCategories.filter((r) => r !== c.route));
                      } else {
                        setCollapseCategories(collapseCategories.concat(c.route));
                      }
                    }}
                  >
                    <ChevronRightXS
                      mr={2}
                      style={{
                        transform: `rotate(${isOpen ? 90 : 0}deg)`,
                        transition: 'transform 0.25s ease-in-out',
                      }}
                    />
                    <Text fontSize={'18px'} lineHeight={'150%'}>
                      {c.title}
                    </Text>
                  </CategoryTitle>
                  <IF condition={isOpen} key={`if-${i}`}>
                    {c.children.map((p, i) => {
                      const props = getItemProps({
                        disabled: p.metadata.disabled,
                        active: p.route === `${category}/${page}`,
                        href: `/${p.route}/`,
                        onMouseEnter: () => prefetch(category, p.route),
                      });

                      const highlighted = props.index === highlightedIndex;
                      if (highlighted) {
                        prefetch(category, p.route);
                      }

                      return (
                        <CategoryItem
                          key={`page-${i}`}
                          highlighted={highlighted}
                          dangerouslySetInnerHTML={{ __html: p.title }}
                          {...props}
                        />
                      );
                    })}
                  </IF>
                </React.Fragment>
              );
            })}
          </NavigationView>
        )}
      </HighlightFromGroup>
    );
  }),
);

export default (props) => (
  <Root>
    <InstantSearch searchClient={searchClient} indexName={CONFIG.ALGOLIA_INDEX}>
      <SideBarNavigation {...props} />
    </InstantSearch>
  </Root>
);
