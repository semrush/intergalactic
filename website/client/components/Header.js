import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '@semcore/button';
import styled from 'styled-components';
import NavLink from './NavLink';
import logo from '../static/logo/semrush-logo-title.svg';
import mobileLogo from '../static/logo/semrush-logo.svg';
import hamburger from '../static/mobile/hamburger.svg';
import close from '../static/mobile/close.svg';
import SearchHome from './SearchHome';
import SideBarNavigation from './SideBarNavigation';
import { gql, useQuery } from '@apollo/client';
import Error from './Error';
import Divider from '@semcore/divider';
import OutsideClick from '@semcore/outside-click';
import { Flex } from '@semcore/flex-box';

const HeaderWrapper = styled.header`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 0.8fr 1fr 0.8fr;
  position: fixed;
  width: 100%;
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
  a {
    color: #171a22;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 1140px) {
    grid-template-columns: 1fr 4fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 4fr;
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
  font-family: FactorA-Bold;
  img {
    margin-right: 8px;
  }
  svg {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    grid-column: 3;
    margin-left: 50px;
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
    margin-left: 50px;
  }
`;

const MobileLogo = styled.img`
  display: none;
  @media (max-width: 320px) {
    display: flex;
    align-items: center;
  }
`;

const TabletLogo = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
  @media (max-width: 320px) {
    display: none;
  }
`;

const DesktopLogo = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1140px) {
    grid-column: 2;
  }
  @media (max-width: 768px) {
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
  z-index: 999;
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
  width: 117px;
  display: flex;
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    grid-row: 1;
    grid-column: 1;
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
  }
`;

const Links = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 40px 32px 28px;
    color: #171a22;
    font-size: 18px;
    a {
      margin-bottom: 12px;
    }
  }
`;

const Line = styled(Divider)`
  @media (max-width: 768px) {
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

function Header(props) {
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const { error, data } = useQuery(NAVIGATE_QUERY, {
    pollInterval: process.env.NODE_ENV === 'production' ? 120000 : 5000,
  });

  if (error && !data) return <Error title="Oh no! It’s 404!" />;

  return (
    <HeaderWrapper {...props}>
      {clicked ? (
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
                <NavLink to="/internal/roadmap/">Roadmap</NavLink>
                <NavLink to="/internal/release/">Releases</NavLink>
                <NavLink
                  to={{ pathname: 'https://github.com/semrush/intergalactic' }}
                  target="_blank"
                >
                  GitHub
                </NavLink>
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
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo>
          <MobileLogo src={mobileLogo} alt="Logo" />
          <TabletLogo>
            <img src={mobileLogo} alt="Logo" />
            <svg width="2" height="16">
              <rect width="1" height="16" style={{ fill: '#171A22', strokeWidth: '1' }} />
            </svg>
            <Flex mt={1}>INTERGALACTIC</Flex>
          </TabletLogo>
          <DesktopLogo>
            <img src={logo} alt="Logo" />
            <svg width="2" height="16">
              <rect width="1" height="16" style={{ fill: '#171A22', strokeWidth: '1' }} />
            </svg>
            <Flex mt={1}>INTERGALACTIC</Flex>
          </DesktopLogo>
        </Logo>
      </Link>
      <SearchMobile tag={Button} onClick={() => setVisible(true)}>
        <SearchHome
          placeholder="What brings you here, Sole Survivor?"
          style={
            visible
              ? { display: 'flex', marginLeft: '-200px', width: '227px' }
              : { display: 'none' }
          }
        />
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
