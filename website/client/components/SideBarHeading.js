import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, animateScroll } from 'react-scroll';
import ArrowUpM from '@semcore/icon/lib/ArrowUp/m';
import trottle from '@semcore/utils/lib/rafTrottle';

const SideBarWrapper = styled.div`
  position: sticky;
  padding: 48px 32px 132px 0;
  box-sizing: border-box;
  top: 48px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;

const NavLink = styled(({ active, ...other }) => {
  return <Link {...other} />;
})`
  font-size: 16px;
  cursor: pointer;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 12px;
  color: #171a22;
  text-decoration: none;
  ${({ active }) =>
    active &&
    `
    color: #FF622D;
  `};

  &:hover {
    transition: all 0.5s;
    text-decoration: underline;
  }
`;

const HideButton = styled.div`
  width: 100%;
  height: calc(100vh - 260px);
`;

const ButtonUp = styled.span`
  cursor: pointer;
  position: sticky;
  top: calc(100vh - 11px - 72px);
  margin-bottom: 8px;
  margin-left: calc(100% - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  width: 72px;
  box-sizing: border-box;
  background: #d1d4db;
  border-radius: 20px 0 0 20px;
  svg {
    fill: #fff;
  }
  &:hover {
    background-color: #898d9a;
  }
`;

function SideBarHeading({ headings }) {
  const [activeID, setActiveID] = useState(headings.length ? headings[0].route : undefined);

  useLayoutEffect(() => {
    const links = headings.map((h) => document.querySelector(`#${h.route}`)).reverse();
    const onScroll = trottle(() => {
      const scrollCenter =
        document.scrollingElement.scrollTop + document.documentElement.clientHeight / 2;
      const link = links.find((link) => scrollCenter > link.offsetTop);
      if (link) setActiveID(link.id);
    });

    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SideBarWrapper>
        {headings.map((heading, i) => (
          <NavLink
            key={i}
            active={heading.route === activeID}
            to={heading.route}
            smooth={true}
            offset={-30}
            duration={200}
            delay={0}
          >
            {heading.title}
          </NavLink>
        ))}
      </SideBarWrapper>
      <HideButton />
      <ButtonUp onClick={() => animateScroll.scrollToTop({ smooth: true })}>
        <ArrowUpM interactive />
      </ButtonUp>
    </>
  );
}

export default SideBarHeading;
