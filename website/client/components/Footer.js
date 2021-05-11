import React from 'react';
import styled from 'styled-components';
import logo from '../static/logo/semrush-logo-title.svg';
import NavLink from './NavLink';

const FooterWrapper = styled.footer`
  display: grid;
  position: relative;
  grid-template-rows: 15fr 6fr 5fr;
  grid-template-columns: 3fr repeat(2, 4fr);
  margin-top: auto;
  height: 163px;
  border-top: 1px solid #d1d4db;
  background: #ffffff;
  padding: 31px 40px 40px 40px;
  align-items: start;
  line-height: 150%;
  font-weight: 400;
  letter-spacing: 0;
  text-align: left;
  @media (max-width: 767px) {
    padding: 31px 55px;
    height: 366px;
    grid-template-rows: repeat(2, 6fr) repeat(2, 1fr);
    grid-template-columns: 1fr;
  }
  @media (max-width: 320px) {
    padding: 32px;
  }
`;

const Logo = styled.div`
  grid-row: 2;
  grid-column: 1;
  display: flex;
  font-size: 14px;
  img {
    margin-left: 4px;
  }
  @media (max-width: 767px) {
    grid-row: 3;
    white-space: nowrap;
  }
  @media (max-width: 320px) {
    padding: 12px 0;
  }
`;

const Description = styled.div`
  grid-row: 3;
  grid-column: 1;
  color: #898d9a;
  font-size: 14px;
  @media (max-width: 767px) {
    grid-row: 4;
  }
  @media (max-width: 320px) {
    padding-bottom: 40px;
  }
`;

const Contacts = styled.div`
  font-size: 16px;
  grid-row: 1;
  grid-column: 3;
  text-align: right;
  a {
    color: #1a55ed;
    text-decoration: none;
    margin: 0 5px;

    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 767px) {
    grid-row: 2;
    grid-column: 1;
    text-align: left;
    align-self: center;
  }
  @media (max-width: 320px) {
    margin: 32px 0 32px;
    white-space: break-spaces;
  }
`;

const Links = styled.div`
  grid-row: 1;
  grid-column: 1;
  font-size: 16px;
  white-space: nowrap;
  a {
    margin-right: 20px;
    color: #171a22;
    text-decoration: none;
    @media (max-width: 767px) {
      margin-bottom: 20px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <Links>
        <NavLink to="/terms/terms-of-use/">Terms of Use</NavLink>
        <NavLink to="/terms/privacy/">Privacy Policy</NavLink>
        <a href="https://www.semrush.com/company/careers" target="_blank" rel="noopener noreferrer">
          Careers
        </a>
        <NavLink to="/contacts/contact-info/">Contact Us</NavLink>
      </Links>

      <Logo>
        Powered by <img src={logo} alt="Logo" />
      </Logo>
      <Description>© 2008–{new Date().getFullYear()} Semrush. All rights reserved.</Description>

      <Contacts>
        If you want to ask something, drop us a line at
        <a href="mailto:ui-kit-team@semrush.com" target="_blank">
          ui-kit-team@semrush.com
        </a>
        or open an
        <a
          href="https://github.com/semrush/intergalactic"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue on the GitHub
        </a>
      </Contacts>
    </FooterWrapper>
  );
}

export default Footer;
