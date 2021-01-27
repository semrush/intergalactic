import React, { useState } from 'react';
import TabLine from '@semcore/tab-line';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Tooltip from '@semcore/tooltip';
import Tag from '@semcore/tag';
import AllComponents from '../components/AllComponents';
import Error from '../components/Error';
import LoadingPage from '../components/LoadingPage';
import UpdateBlock from '../components/UpdateBlock';
import whale from '../static/whale/whale.svg';
import layout from '../static/space/layout.svg';
import principles from '../static/space/principles.svg';
import style from '../static/space/style.svg';
import ArrowXS from '@semcore/icon/lib/ArrowRight/xs';
import { Link as LinkScroll, animateScroll } from 'react-scroll';
import ArrowUpM from '@semcore/icon/lib/ArrowUp/m';
import { Box } from '@semcore/flex-box';
import updatesButton from '../static/space/search-for-updates.svg';
import { css } from '@semcore/core';

const stylesTabLine = css`
  STabLine {
    margin: auto;
    width: 805px;
  }

  STabLineItem[size='xl'] {
    font-size: 24px;
  }
`;

const stylesTooltip = css`
  STooltip[theme] {
    padding: 12px;
    border: 1px solid #d1d4db;
    box-shadow: 5px 8px 25px rgba(137, 141, 154, 0.2);
    border-radius: 6px;
  }
`;

const PromoWrapper = styled.div`
  display: grid;
  grid-template-rows: 2fr 2fr 3fr;
  grid-template-columns: repeat(4, 1fr);
  padding: 48px 0 12px;
  @media (max-width: 1140px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr repeat(2, 2fr);
    padding: 0 55px 56px;
    margin-top: 48px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 0.5fr) 1fr repeat(3, 1.5fr);
    padding: 0 35px 56px;
  }
  @media (max-width: 320px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.8fr repeat(2, 1fr) repeat(3, 1.8fr);
    padding: 0 0 56px;
    margin-top: 0;
  }
`;

const Overlay = styled.div`
  max-width: 1140px;
  padding: 80px 32px 0;
  position: relative;
  margin: 0 auto;
`;

const Title = styled.h1`
  grid-row: 1;
  grid-column: 1/3;
  font-family: FactorA-Bold, sans-serif;
  font-size: 60px;
  line-height: 105%;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const Desc = styled.div`
  grid-row: 2;
  grid-column: 1/3;
  font-size: 18px;
  line-height: 150%;
  margin: 0;
  color: #575c66;
  display: flex;
  align-items: flex-start;
  @media (max-width: 1140px) {
    align-items: baseline;
    margin-bottom: 24px;
  }
`;

const Started = styled.div`
  grid-row: 3;
  grid-column: 1;
  margin: 10px 15px 10px 0;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  font-family: FactorA-Bold, sans-serif;
  font-size: 24px;
  a {
    margin-top: 16px;
    color: #ff622d;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 1140px) {
    grid-row: 3;
    margin: 0 15px 15px 0;
  }
  @media (max-width: 768px) {
    grid-row: 3;
    margin: 0;
    margin-top: 15px;
    padding: 0;
  }
`;

const InitialPrinciples = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: 10px 10px 45px 0 rgba(137, 141, 154, 0.3);
  margin: 10px 15px;
  padding: 40px;
  background-color: #fff;
  border-radius: 6px;
  z-index: 99;
  @media (max-width: 1140px) {
    margin: 0;
  }
`;

const Principles = styled(InitialPrinciples)`
  grid-row: 3;
  grid-column: 2;
  @media (max-width: 1140px) {
    grid-row: 3;
    grid-column: 2;
    margin: 0 0 15px 15px;
  }
  @media (max-width: 768px) {
    grid-row: 4;
    grid-column: 1;
    margin: 0;
    margin-top: 15px;
  }
`;

const Style = styled(InitialPrinciples)`
  grid-row: 3;
  grid-column: 3;
  @media (max-width: 1140px) {
    grid-row: 4;
    grid-column: 1;
    margin: 15px 15px 0 0;
  }
  @media (max-width: 768px) {
    grid-row: 5;
    grid-column: 1;
    margin: 0;
    margin-top: 40px;
  }
`;

const Layout = styled(InitialPrinciples)`
  grid-row: 3;
  grid-column: 4;
  @media (max-width: 1140px) {
    grid-row: 4;
    grid-column: 2;
    margin: 15px 0 0 15px;
  }
  @media (max-width: 768px) {
    grid-row: 6;
    grid-column: 1;
    margin: 0;
    margin-top: 40px;
  }
`;

const LayoutImg = styled.img`
  position: absolute;
  left: 32%;
  bottom: -35%;
  z-index: -1;
  @media (max-width: 1140px) {
    left: 56%;
    bottom: -24%;
    width: 300px;
  }
`;
const PrinciplesImg = styled.img`
  position: absolute;
  left: 50%;
  top: 44%;
  z-index: -1;
  @media (max-width: 1140px) {
    left: 54%;
    top: 15%;
    width: 340px;
  }
`;
const StylesImg = styled.img`
  position: absolute;
  left: 52%;
  bottom: 28%;
  z-index: -1;
  @media (max-width: 1140px) {
    left: 55%;
    top: -24%;
    width: 330px;
  }
`;

const WhaleImg = styled.img`
  position: absolute;
  right: 88px;
  top: 88px;
  @media (max-width: 1140px) {
    display: none;
  }
`;

const MainWrapper = styled.div`
  padding: 32px 0 80px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Tab = styled.div`
  font-family: FactorA-Bold, sans-serif;
  & > div:first-child > div {
    background-color: #ff622d;
    height: 2px;
  }
`;

const Border = styled.div`
  border: 1px solid #d1d4db;
  border-radius: 6px;
  height: 390px;
  padding: 40px 32px;
  font-family: Inter;
  font-size: 18px;
  line-height: 150%;
`;

const Category = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 36px);
  grid-auto-flow: column;
  width: 100%;
  max-height: 405px;
  margin: 0;
  padding: 0;
`;

const LinkStyled = styled(Link)`
  line-height: 1.25;
  color: #171a22;
  cursor: pointer;
  text-decoration: none;
  max-width: 235px;
  &:hover {
    text-decoration: underline;
  }
`;

const LinkDisabled = styled.div`
  line-height: 1.25;
  color: #ccc;
  text-decoration: none;
  cursor: default;
  pointer-events: none;
`;

const TableOverlay = styled.div`
  display: flex;
  & .component {
    margin-right: 38px;
  }
  h3 {
    margin: 0;
    margin-bottom: 8px;
    font-size: 24px;
    font-family: FactorA-Bold, sans-serif;
  }
  a {
    margin-bottom: 8px;
    white-space: nowrap;
  }
`;

const UpdatesButton = styled(LinkScroll)`
  position: fixed;
  top: 439px;
  right: -21px;
  width: 136px;
  z-index: 999;
  @media (max-width: 320px) {
    display: none;
  }
`;

const NAVIGATE_QUERY = gql`
  {
    navigation {
      title
      route
      children {
        route
        title
        metadata {
          disabled
          beta
        }
      }
      metadata {
        hide
      }
    }
  }
`;

const mappingTableToImg = {
  principles: {
    tableStyle: Principles,
    imgStyle: PrinciplesImg,
    img: principles,
    tag: 'Principles',
  },
  styles: {
    tableStyle: Style,
    imgStyle: StylesImg,
    img: style,
    tag: 'Style',
  },
  layout: {
    tableStyle: Layout,
    imgStyle: LayoutImg,
    img: layout,
    tag: 'Layout',
  },
};

function getCustomPage(table, data) {
  return (
    <table.tableStyle>
      <AllComponents
        navigation={data.navigation.filter((nav) => !nav.metadata.hide && nav.title === table.tag)}
      />
      <table.imgStyle src={table.img} alt={table.tag} />
    </table.tableStyle>
  );
}

const renderSwitch = (value, data) => {
  switch (value) {
    case 'components':
      return getTabByTitle(['Components'], data);
    case 'charts':
      return getTabByTitle(['Data display', 'Table'], data);
    case 'ux':
      return getTabByTitle(['UX patterns'], data);
    case 'filters':
      return getTabByTitle(['Filters'], data);
    case 'documentation':
      return getTabByTitle(['Utils 🛠', 'Docs', 'Bugs and requests'], data);
    default:
      return null;
  }
};

const getTabByTitle = (titles, data) => {
  return (
    <TableOverlay>
      {titles.length === 1
        ? getComponents(titles[0], data)
        : titles.map((title) => {
            const tabWidth = 80 / titles.length;
            console.log(tabWidth);
            return (
              <Box mr={3}>
                <h3>{title}</h3>
                {getComponents(title, data)}
              </Box>
            );
          })}
    </TableOverlay>
  );
};

const getImageName = (title) => {
  const name = title.replaceAll(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

const getTooltip = (title) => {
  try {
    return <img src={require(`../static/tooltip/${getImageName(title)}.svg`).default} />;
  } catch (err) {
    ('error');
  }
  return false;
};

const getComponents = (titles, data) => {
  const items = data.navigation.filter((nav) => !nav.metadata.hide && titles.includes(nav.title));
  const getList = (child) => {
    if (child.elem.metadata.disabled) {
      return (
        <LinkDisabled key={child.elem.title} className="component">
          {child.elem.title}
        </LinkDisabled>
      );
    }
    const pic = getTooltip(child.elem.title);
    return (
      <Tooltip styles={stylesTooltip} placement="left" w={'fit-content'} key={child.elem.title}>
        <Tooltip.Trigger className="component">
          <LinkStyled to={`/${child.elem.route}/`}>{child.elem.title}</LinkStyled>
          {child.elem.metadata.beta && (
            <>
              {' '}
              <Tag size="s" theme="warning" use="primary" children="beta" />
            </>
          )}
        </Tooltip.Trigger>
        {pic && <Tooltip.Popper children={pic} />}
      </Tooltip>
    );
  };

  const listItems = items
    .map((item) =>
      item.children.map((child) => {
        return {
          elem: child,
          categoryRoute: item.route,
        };
      }),
    )
    .flat()
    .map((child) => getList(child));

  return <Category>{listItems}</Category>;
};

function Home() {
  const [value, updateValue] = useState('components');
  const { loading, error, data } = useQuery(NAVIGATE_QUERY, {
    // prod = 2 min; dev = 5 sec
    pollInterval: process.env.NODE_ENV === 'production' ? 2 * 60 * 1000 : 5 * 1000,
  });

  if (error && !data) return <Error title="Oh no! It’s 404!" />;

  return (
    <>
      <Helmet>
        <title>Intergalactic – Design System</title>
      </Helmet>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Overlay>
            <PromoWrapper>
              <Title>We unify Semrush interfaces</Title>
              <Desc>
                Intergalactic is a constantly developing system of UI components, guidelines and UX
                patterns. With all these tools you can build your own product based on the Semrush
                platform.
              </Desc>
              <WhaleImg src={whale} alt="Whale" />
              <Started>
                Get started
                <a href="/get-started-guide/dev-starter-guide/" rel="noopener noreferrer">
                  For developers <ArrowXS />
                </a>
                <a href="/get-started-guide/dis-starter-guide/" rel="noopener noreferrer">
                  For designers <ArrowXS />
                </a>
                <a href="/get-started-guide/work-figma/" rel="noopener noreferrer">
                  Figma libraries <ArrowXS />
                </a>
              </Started>
              {getCustomPage(mappingTableToImg.principles, data)}
              {getCustomPage(mappingTableToImg.styles, data)}
              {getCustomPage(mappingTableToImg.layout, data)}
            </PromoWrapper>
            <MainWrapper>
              <Tab>
                <TabLine
                  underlined={false}
                  onChange={updateValue}
                  styles={stylesTabLine}
                  value={value}
                  size="xl"
                >
                  <TabLine.Item value={'components'}>Components</TabLine.Item>
                  <TabLine.Item value={'charts'}>Charts & Table</TabLine.Item>
                  <TabLine.Item value={'ux'}>UX Patterns</TabLine.Item>
                  <TabLine.Item value={'filters'}>Filters</TabLine.Item>
                  <TabLine.Item value={'documentation'}>Developer Docs</TabLine.Item>
                </TabLine>
                <Border>{renderSwitch(value, data)}</Border>
              </Tab>
            </MainWrapper>
            <UpdateBlock />
          </Overlay>
          <UpdatesButton activeClass="active" to="updBlock" spy={true} smooth={true}>
            Updates?
            <img src={updatesButton} alt="Updates button" />
          </UpdatesButton>
          <ButtonUp onClick={() => animateScroll.scrollToTop({ smooth: true })}>
            <ArrowUpM interactive />
          </ButtonUp>
        </>
      )}
    </>
  );
}

export default Home;
