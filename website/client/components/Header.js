import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@semcore/button';
import styled from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import NavLink from './NavLink';
import mobileLogo from '../static/logo/semrush-logo.svg';
import hamburger from '../static/mobile/hamburger.svg';
import Close from '@semcore/icon/lib/Close/s';
import SearchM from '@semcore/icon/lib/Search/m';
import close from '../static/mobile/close.svg';
import SearchHome from './SearchHome';
import SideBarNavigation from './SideBarNavigation';
import { gql, useQuery } from '@apollo/client';
import Error from './Error';
import Divider from '@semcore/divider';
import OutsideClick from '@semcore/outside-click';
import { Flex } from '@semcore/flex-box';
import trottle from '@semcore/utils/lib/rafTrottle';

const HeaderWrapper = styled.header`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 0.5fr 1fr 1fr;
  position: fixed;
  width: inherit;
  padding: 0 40px;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  box-sizing: border-box;
  color: #fff;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 999;
  box-sizing: border-box;
  a {
    color: #171a22;
    text-decoration: none;
  }
  @media (max-width: 1140px) {
    grid-template-columns: 1fr 4fr 0.4fr;
  }
  @media (max-width: 767px) {
    grid-template-columns: 0.4fr 0.4fr 4fr;
    padding: 0;
  }
  @media (max-width: 320px) {
    grid-template-columns: 0.7fr 1fr 2fr;
    padding: 0;
  }
`;

const Item = styled.span`
  padding: 10px 12px;
  font-size: 16px;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`;

const Logo = styled.div`
  grid-row: 1;
  grid-column: 1;
  display: flex;
  align-items: center;
  text-align: center;
  font-family: FactorA-Bold, sans-serif;
  font-size: 22px;
  line-height: 130%;
  color: #ff622d;
  img {
    margin-right: 8px;
  }
  svg {
    margin-right: 4px;
  }
  @media (max-width: 767px) {
    grid-column: 2;
  }
`;

const Nav = styled.nav`
  grid-row: 1;
  grid-column: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;
  @media (max-width: 1140px) {
    display: none;
  }
`;

const Search = styled.div`
  grid-row: 1;
  grid-column: 2;
  margin-left: 40px;
  @media (max-width: 767px) {
    grid-column: 3;
    margin-left: 5px;
  }
  @media (max-width: 320px) {
    display: none;
  }
`;

const SearchMobile = styled.div`
  display: none;
  @media (max-width: 320px) {
    grid-row: 1;
    grid-column: 3;
    display: flex;
    position: relative;
    margin-left: 80px;
  }
`;

const CloseIcon = styled(Close)`
  display: none;
  @media (max-width: 320px) {
    fill: #171a22;
    display: flex;
    &:hover {
      cursor: default;
    }
  }
`;

const SearchIcon = styled(SearchM)`
  display: none;
  @media (max-width: 320px) {
    fill: #171a22;
    display: flex;
    &:hover {
      cursor: default;
    }
  }
`;

const MobileClose = styled.div`
  position: absolute;
  background-color: #fff;
  width: 22px;
  height: 22px;
  top: 12px;
  right: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileSearch = styled.div`
  position: absolute;
  background-color: #fff;
  width: 22px;
  height: 22px;
  top: -11px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileLogo = styled.img`
  display: none;
  @media (max-width: 767px) {
    display: flex;
    align-items: center;
  }
`;

const DesktopLogo = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1140px) {
    grid-column: 2;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const Side = styled.div`
  position: absolute;
  width: 324px;
  height: calc(100vh - 80px);
  overflow: auto;
  left: 0;
  top: 80px;
  bottom: 0;
  z-index: -1;
  background: #f5f5f5;
  box-shadow: 5px 8px 25px rgba(137, 141, 154, 0.2);
  @media (max-width: 320px) {
    width: 100%;
  }
`;

const MobileMenu = styled.span`
  @media (min-width: 768px) {
    display: none;
  }
`;

const Mobile = styled.span`
  height: 80px;
  width: 80px;
  display: flex;
  @media (max-width: 767px) {
    justify-content: center;
    grid-row: 1;
    grid-column: 1;
  }
  img {
    width: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const MobileBackground = styled.span`
  @media (max-width: 767px) {
    grid-row: 1;
    grid-column: 1;
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
  }
`;

const Links = styled.div`
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    padding: 40px 32px 28px;
    color: #171a22;
    font-size: 16px;
    a {
      margin-bottom: 16px;
    }
  }
`;

const IntergalacticLink = styled.a`
  color: #ff642d !important;
  margin-left: 8px;
`;

const DevportalLink = styled.a`
  display: flex;
  align-items: center;
  img {
    margin-bottom: 7px;
  }
`;

const Line = styled(Divider)`
  @media (max-width: 767px) {
    width: 244px !important;
    margin-left: 32px;
    background-color: #d1d4db !important;
  }
  @media (max-width: 320px) {
    width: 100% !important;
    margin-left: 0;
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
        }
      }
      metadata {
        hide
      }
    }
  }
`;

const MobileHeaderMenu = ({ clicked, setClicked, data }) => (
  <MobileMenu>
    <Mobile>
      <MobileBackground>
        <img
          src={close}
          alt="Logo"
          tag={`Button`}
          onClick={() => {
            setClicked(false);
          }}
        />
      </MobileBackground>
    </Mobile>
    <OutsideClick onOutsideClick={() => setClicked(false)}>
      <Side>
        <Links>
          <a href="/internal/roadmap/">Roadmap</a>
          <a href="/internal/release/">Releases</a>
          <a href="https://github.com/semrush/intergalactic" target="_blank">
            GitHub
          </a>
        </Links>
        <Line orientation="horizontal" />
        <SideBarNavigation
          tag={`Button`}
          visible={clicked}
          onClose={() => setClicked(false)}
          navigation={data.navigation.filter((nav) => !nav.metadata.hide)}
        />
      </Side>
    </OutsideClick>
  </MobileMenu>
);

function Header(props) {
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const headerRef = React.createRef();

  const { error, data } = useQuery(NAVIGATE_QUERY, {
    pollInterval: process.env.NODE_ENV === 'production' ? 120000 : 5000,
  });

  if (error && !data) return <Error title="Oh no! It’s 404!" />;

  const updateWidthHeader = (headerNode) =>
    trottle(() => {
      if (!document || !headerNode) return;
      headerNode.style.width = document.body.offsetWidth + 'px';
    });

  useEffect(() => {
    let resizeObserver = null;
    if (document) {
      resizeObserver = new ResizeObserver(updateWidthHeader(headerRef.current));
      resizeObserver.observe(document.body);
    }

    return () => {
      resizeObserver && resizeObserver.disconnect();
    };
  }, []);

  return (
    <HeaderWrapper {...props} ref={headerRef}>
      {clicked ? (
        <MobileHeaderMenu clicked={clicked} setClicked={setClicked} data={data} />
      ) : (
        <MobileMenu>
          <Mobile>
            <img
              src={hamburger}
              alt="Logo"
              tag={`Button`}
              onClick={() => {
                setClicked(true);
              }}
            />
          </Mobile>
        </MobileMenu>
      )}
      <Logo>
        <MobileLogo src={mobileLogo} alt="Logo" />
        <DesktopLogo>
          <DevportalLink href="https://developer.semrush.com/">
            <img src={mobileLogo} alt="Logo" />
            Developer
          </DevportalLink>
          <IntergalacticLink href="/">Intergalactic</IntergalacticLink>
        </DesktopLogo>
      </Logo>
      <SearchMobile>
        <MobileSearch
          tag={Button}
          onClick={() => setVisible(true)}
          style={visible ? { display: 'none' } : { display: 'flex' }}
        >
          <SearchIcon />
        </MobileSearch>
        <SearchHome
          placeholder="What brings you here, Sole Survivor?"
          style={visible ? { marginLeft: '-200px', width: '244px' } : { display: 'none' }}
        />
        <MobileClose
          tag={Button}
          onClick={() => setVisible(false)}
          style={visible ? { display: 'flex' } : { display: 'none' }}
        >
          <CloseIcon />
        </MobileClose>
      </SearchMobile>
      <Search>
        <SearchHome placeholder="What brings you here, Sole Survivor?" />
      </Search>
      <Nav>
        <Item>
          <NavLink activeStyle={{ textDecoration: 'underline' }} to="/internal/roadmap/">
            Roadmap
          </NavLink>
        </Item>
        <Item>
          <NavLink activeStyle={{ textDecoration: 'underline' }} to="/internal/release/">
            Releases
          </NavLink>
        </Item>
        <Item>
          <NavLink
            activeStyle={{ textDecoration: 'underline' }}
            to={{ pathname: 'https://github.com/semrush/intergalactic' }}
            target="_blank"
          >
            GitHub
          </NavLink>
        </Item>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
