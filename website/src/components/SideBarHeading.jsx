import React from 'react';
import { Link, animateScroll } from 'react-scroll';
import ArrowUpM from '@semcore/icon/ArrowUp/m';
import trottle from '@semcore/utils/lib/rafTrottle';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import styles from './SideBarHeading.module.css';

function SideBarHeading({ headings }) {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = React.useState();

  React.useEffect(() => {
    setActiveId(headings.length ? headings[0].id : undefined);
    const links = headings.map((heading) => document.querySelector(`#${heading.id}`)).reverse();
    const handleScroll = trottle(() => {
      const offsetTop = document.scrollingElement.scrollTop + 100;
      const linkReversedIndex = links.findIndex((link) => offsetTop > link.offsetTop);
      if (linkReversedIndex !== -1)
        setActiveId(headings[headings.length - 1 - linkReversedIndex]?.id);
    });
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [pathname, headings]);

  return (
    <>
      <nav className={styles.sideBarWrapper} aria-label="Guide headings">
        {headings.map((heading, i) => (
          <Link
            className={cx(styles.navLink, heading.id === activeId && styles.navLinkActive)}
            key={heading.html + i}
            to={heading.id}
            smooth={true}
            offset={-140}
            duration={200}
            delay={0}
          >
            {heading.html}
          </Link>
        ))}
      </nav>
      <span
        aria-hidden="true"
        className={styles.buttonUp}
        onClick={() => animateScroll.scrollToTop({ smooth: true })}
      >
        <ArrowUpM interactive aria-label="Scroll page to the top" />
      </span>
    </>
  );
}

export default SideBarHeading;
