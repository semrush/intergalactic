import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import { scroller } from 'react-scroll';
import { Col, Row } from '@semcore/grid';
import { Text } from '@semcore/typography';
import LoadingPage from '../components/LoadingPage';
import SideBarNavigation from '../components/SideBarNavigation';
import Docs from '../components/Docs';
import DocsHeader from '../components/DocsHeader';
import SideBarHeading from '../components/SideBarHeading';
import Error from '../components/Error';
import ArrowRightXS from '@semcore/icon/lib/ArrowRight/m';
import ArrowLeftXS from '@semcore/icon/lib/ArrowLeft/m';
import Select from '@semcore/select';

const DocumentationWrapper = styled.div`
  padding: 56px 32px 64px;
  position: relative;
  color: #171a22;
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

function getNavigationPage(navigation, page) {
  let navigationPage;
  let prevNavigationPage;

  navigation.forEach(function findPage(n) {
    if (n.route === page.route)
      navigationPage = {
        ...n,
        parent: prevNavigationPage,
      };
    if (n.children) {
      prevNavigationPage = n;
      n.children.forEach(findPage);
      prevNavigationPage = undefined;
    }
  });
  return navigationPage;
}

export const PAGE_QUERY = gql`
  query getPage($slug: String!, $category: String!) {
    page(slug: $slug) {
      title
      route
      sourcePath
      contents {
        tag
        value
        level
        route
        options
      }
    }
    category: page(slug: $category) {
      title
    }
    headings(slug: $slug) {
      title
      route
      level
    }
    navigation {
      title
      route
      children {
        title
        route
        metadata {
          disabled
          fileSource
          tabName
          beta
        }
        children {
          title
          route
          metadata {
            disabled
            fileSource
            tabName
          }
        }
      }
      metadata {
        hide
      }
    }
  }
`;
const getChildren = (data) => data.navigation.map((category) => category.children).flat();

const getCurrentIndex = (title, allPages) => allPages.map((child) => child.title).indexOf(title);

const getNextPage = (title, allPages) => {
  return getCurrentIndex(title, allPages) === allPages.length - 1
    ? false
    : allPages[getCurrentIndex(title, allPages) + 1];
};

const getPrevPage = (title, allPages) => {
  return getCurrentIndex(title, allPages) === '1'
    ? false
    : allPages[getCurrentIndex(title, allPages) - 1];
};

const getHeadingOptions = (data) => {
  return data.headings.map((option) => ({
    value: option.route,
    label: option.title,
    children: (
      <Text mx={5} color={'#171a22'}>
        {option.title}
      </Text>
    ),
  }));
};

function Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let { category, page, tab } = useParams();
  let slug = `${category}/${page}`;
  if (tab) slug = `${slug}/${tab}`;

  const { loading, error, data } = useQuery(PAGE_QUERY, {
    variables: { slug, category },
    // prod = 1 min; dev = 2 sec
    pollInterval: process.env.NODE_ENV === 'production' ? 60 * 1000 : 2 * 1000,
  });

  if (loading) return <LoadingPage />;
  if (error && !data) return <Error title="Oh no! It’s 404!" />;

  const tabs = [];

  let navigationPage = getNavigationPage(data.navigation, data.page);

  if (tab && navigationPage.parent) {
    tabs.push(navigationPage.parent);
    tabs.push(...navigationPage.parent.children);
    navigationPage = navigationPage.parent;
  } else if (navigationPage.children.length) {
    tabs.push(navigationPage);
    tabs.push(...navigationPage.children);
  }
  const allPages = getChildren(data);

  const headingOptions = getHeadingOptions(data);

  return (
    <>
      <Helmet>
        <title>
          {navigationPage.title} | {data.category.title}
        </title>
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
            <SideBarNavigation navigation={data.navigation.filter((nav) => !nav.metadata.hide)} />
          </SideBar>
        </Col>
        <Col sm={12} md={8} span={7} id="main-content">
          <DocumentationWrapper>
            <DocsHeader
              title={navigationPage.title}
              category={data.category.title}
              fileSource={navigationPage.metadata.fileSource}
              sourcePath={data.page.sourcePath}
              beta={navigationPage.metadata.beta}
            />
            <Docs page={data.page} tabs={tabs} />
          </DocumentationWrapper>
          <NextGuide>
            {getPrevPage(navigationPage.title, allPages) && (
              <div>
                <ArrowLeftXS mr={2} />
                <a
                  href={'/' + getPrevPage(navigationPage.title, allPages).route}
                  rel="noopener noreferrer"
                >
                  {getPrevPage(navigationPage.title, allPages).title}
                </a>
              </div>
            )}
            {getNextPage(navigationPage.title, allPages) && (
              <div>
                <a
                  href={'/' + getNextPage(navigationPage.title, allPages).route}
                  rel="noopener noreferrer"
                >
                  {getNextPage(navigationPage.title, allPages).title}
                </a>
                <ArrowRightXS ml={2} />
              </div>
            )}
          </NextGuide>
        </Col>
        <Col md={0} span={2}>
          <SideBarHeading headings={data.headings} />
        </Col>
      </HomePage>
    </>
  );
}

export default Page;
