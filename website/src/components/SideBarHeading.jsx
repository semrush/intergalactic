import React from 'react';
import styled from 'styled-components';
import { Link, animateScroll } from 'react-scroll';
import ArrowUpM from '@semcore/icon/ArrowUp/m';
import trottle from '@semcore/utils/lib/rafTrottle';

const SideBarWrapper = styled.div`
  position: sticky;
  padding: 48px 32px 132px 0;
  box-sizing: border-box;
  top: 100px;
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
  const [activeId, setActiveId] = React.useState(headings.length ? headings[0].id : undefined);

  React.useEffect(() => {
    const links = headings.map((heading) => document.querySelector(`#${heading.id}`)).reverse();
    const handleScroll = trottle(() => {
      const scrollCenter =
        document.scrollingElement.scrollTop + document.documentElement.clientHeight / 2;
      const linkReversedIndex = links.findIndex((link) => scrollCenter > link.offsetTop);
      if (linkReversedIndex !== -1)
        setActiveId(headings[headings.length - 1 - linkReversedIndex]?.id);
    });
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SideBarWrapper>
        {headings.map((heading) => (
          <NavLink
            key={heading.html}
            active={heading.id === activeId}
            to={heading.id}
            smooth={true}
            offset={-140}
            duration={200}
            delay={0}
          >
            {heading.html}
          </NavLink>
        ))}
      </SideBarWrapper>
      <ButtonUp onClick={() => animateScroll.scrollToTop({ smooth: true })}>
        <ArrowUpM interactive />
      </ButtonUp>
    </>
  );
}

export default SideBarHeading;
