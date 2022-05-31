import React, { useEffect } from 'react';
import styles from './Page.module.css';
import { Link } from 'react-router-dom';
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
    // if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

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
        <Select
          className={styles.mobileSelect}
          options={headingOptions}
          onChange={(value) => {
            scroller.scrollTo(value, {
              smooth: true,
              offset: -150,
              duration: 200,
            });
          }}
          placeholder="Select section"
          size="l"
          id="select"
        />
      )}
      <Row className={styles.homePage}>
        <Col sm={12} md={4} span={3}>
          <div className={styles.sideBar}>
            <SideBarNavigation navigation={navigationTree.filter((nav) => !nav.metadata.hide)} />
          </div>
        </Col>
        <Col sm={12} md={8} span={7} id="main-content">
          <div className={styles.documentationWrapper}>
            <DocsHeader
              title={title}
              category={category}
              fileSource={page.fileSource}
              sourcePath={page.sourcePath}
              beta={page.beta}
            />
            <Docs tokens={page.tokens} tabs={tabs} />
          </div>
          <div className={styles.nextGuide}>
            {routePrevSiblings[route] && (
              <div className={styles.navigationButton}>
                <ArrowLeftXS mr={2} />
                <Link to={'/' + routePrevSiblings[route].route} rel="noopener noreferrer">
                  {routePrevSiblings[route].title}
                </Link>
              </div>
            )}
            {routeNextSiblings[route] && (
              <div className={styles.navigationButton}>
                <Link to={'/' + routeNextSiblings[route].route} rel="noopener noreferrer">
                  {routeNextSiblings[route].title}
                </Link>
                <ArrowRightXS ml={2} />
              </div>
            )}
          </div>
        </Col>
        <Col md={0} span={2}>
          <SideBarHeading headings={page.headings} />
        </Col>
      </Row>
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
    const page = globalThis.__ssr_preloaded_page_data;

    return <PageView route={route} page={page} />;
  }

  return <DynamicPage route={route} />;
};

export default Page;
