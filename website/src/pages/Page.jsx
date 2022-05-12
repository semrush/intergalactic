import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { scroller } from 'react-scroll';
import { Col, Row } from '@semcore/grid';
import { Text } from '@semcore/typography';
import LoadingPage from '../components/LoadingPage';
import SideBarNavigation from '../components/SideBarNavigation';
import { Docs } from '../components/Docs';
import DocsHeader from '../components/DocsHeader';
import SideBarHeading from '../components/SideBarHeading';
import ErrorView from '../components/Error';
import ArrowRightXS from '@semcore/icon/ArrowRight/m';
import ArrowLeftXS from '@semcore/icon/ArrowLeft/m';
import Select from '@semcore/select';
import {
  routes,
  routeParents,
  routePrevSiblings,
  routeNextSiblings,
  navigationTree,
} from '@navigation';
import { useRouting, usePageData } from '../components/routing';

const DocumentationWrapper = styled.div`
  padding: 56px 32px 64px;
  position: relative;
  color: #191b23;
  @media (max-width: 767px) {
    padding: 96px 32px 64px;
  }
  @media (max-width: 415px) {
    padding: 80px 20px 32px;
  }
`;

const NextGuide = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 32px 96px;
  @media (max-width: 415px) {
    margin: 0 32px 80px;
  }

  a {
    color: #171a22;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SideBar = styled.div`
  position: sticky;
  top: 120px;
  height: calc(100vh - 120px);
  background: #f5f5f5;
  max-width: 260px;
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileSelect = styled(Select)`
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: fixed;
    z-index: 998;
    width: 100%;
    margin-bottom: 32px;
    border-radius: 0 !important;
    top: 120px;
    background-color: #fff !important;
    border: 1px solid #d1d4db;
    border-style: solid none solid none;
    div div {
      margin: 0 32px !important;
    }
    @media (max-width: 415px) {
      div div {
        margin: 0 20px !important;
      }
    }

    &:hover,
    &:active {
      border: 1px solid #171a22;
      border-style: solid none solid none;
    }
  }
`;

const HomePage = styled(Row)`
  padding-top: 120px;
`;

const getHeadingOptions = (headings) => {
  return headings.map((option) => ({
    value: option.route,
    label: option.title,
    children: (
      <Text mx={5} color={'#171a22'}>
        {option.title}
      </Text>
    ),
  }));
};

const useLegacyPageHashes = (oldHashToNewHash) => {
  React.useEffect(() => {
    let hash = String(window.location.hash);
    if (hash.startsWith('#')) hash = hash.substring(1);
    if (oldHashToNewHash[hash]) {
      window.location.hash = oldHashToNewHash[hash];
    }
  }, [oldHashToNewHash]);
};

const PageView = ({ route, page }) => {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  });

  const tabs = [];

  const routeDepth = route.split('/').length;
  if (routeDepth === 2 && routes[route].children?.length > 0) {
    tabs.push(routes[route], ...routes[route].children);
  } else if (routeDepth === 3 && routeParents[route]?.children.length > 0) {
    tabs.push(routeParents[route], ...routeParents[route].children);
  }

  const headingOptions = getHeadingOptions(page.headings);

  const title = routes[route].title ?? routeParents[route].title;
  const category = routeParents[routeParents[route].route].title ?? routeParents[route].title;

  const htmlTitle = routeParents[route].title
    ? `${routes[route].title} | ${routeParents[route].title}`
    : `${routes[route].title}`;

  useLegacyPageHashes(page.legacyHeaderHashes);

  return (
    <>
      <Helmet>
        <title>{htmlTitle}</title>
      </Helmet>
      {!!headingOptions.length && (
        <MobileSelect
          options={headingOptions}
          onChange={(value) => {
            scroller.scrollTo(value, {
              smooth: true,
              offset: -150,
              duration: 200,
            });
          }}
          placeholder="Select section"
          size="xl"
          id="select"
        />
      )}
      <HomePage>
        <Col sm={12} md={4} span={3}>
          <SideBar>
            <SideBarNavigation navigation={navigationTree.filter((nav) => !nav.metadata.hide)} />
          </SideBar>
        </Col>
        <Col sm={12} md={8} span={7} id="main-content">
          <DocumentationWrapper>
            <DocsHeader
              title={title}
              category={category}
              fileSource={page.fileSource}
              sourcePath={page.sourcePath}
              beta={page.beta}
            />
            <Docs tokens={page.tokens} tabs={tabs} />
          </DocumentationWrapper>
          <NextGuide>
            {routePrevSiblings[route] && (
              <div>
                <ArrowLeftXS mr={2} />
                <Link to={'/' + routePrevSiblings[route].route} rel="noopener noreferrer">
                  {routePrevSiblings[route].title}
                </Link>
              </div>
            )}
            {routeNextSiblings[route] && (
              <div>
                <Link to={'/' + routeNextSiblings[route].route} rel="noopener noreferrer">
                  {routeNextSiblings[route].title}
                </Link>
                <ArrowRightXS ml={2} />
              </div>
            )}
          </NextGuide>
        </Col>
        <Col md={0} span={2}>
          <SideBarHeading headings={page.headings} />
        </Col>
      </HomePage>
    </>
  );
};

const DynamicPage = ({ route }) => {
  const { loading, error, page } = usePageData(route);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorView title={`Oh no! ${error.message}`} />;

  return <PageView route={route} page={page} />;
};

const Page = () => {
  const { route } = useRouting();

  if (globalThis.__ssr) {
    if (!globalThis.__ssr_page_data) {
      throw new Error(`On server side globalThis.__ssr_page_data should be defined`);
    }
    const page = globalThis.__ssr_page_data;

    return <PageView route={route} page={page} />;
  }
  if (globalThis.__ssr_preloaded_page_route === route) {
    page = globalThis.__ssr_preloaded_page_data;

    return <PageView route={route} page={page} />;
  }

  return <DynamicPage route={route} />;
};

export default Page;
