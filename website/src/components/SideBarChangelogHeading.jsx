import React from 'react';
import { Link, animateScroll } from 'react-scroll';
import ArrowUpM from '@semcore/icon/ArrowUp/m';
import trottle from '@semcore/utils/lib/rafTrottle';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import styles from './SideBarHeading.module.css';

function SideBarChangelogHeading({ blocks }) {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = React.useState();

  React.useEffect(() => {
    setActiveId(blocks.length ? blocks[0].version : undefined);
    const links = blocks.map((block) => document.querySelector(`#${block.selector}`)).reverse();
    const handleScroll = trottle(() => {
      const scrollCenter =
        document.scrollingElement.scrollTop + document.documentElement.clientHeight / 2;
      const linkReversedIndex = links.findIndex((link) => scrollCenter > link?.offsetTop);
      if (linkReversedIndex !== -1)
        setActiveId(blocks[blocks.length - 1 - linkReversedIndex]?.version);
    });
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [pathname, blocks]);

  return (
    <>
      <nav className={styles.sideBarWrapper} aria-label="Guide headings">
        {blocks.map((block, i) => (
          <Link
            className={cx(styles.navLink, block.version === activeId && styles.navLinkActive)}
            key={block.title + i}
            to={block.version}
            smooth={true}
            offset={-140}
            duration={200}
            delay={0}
          >
            {block.title}
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

export default SideBarChangelogHeading;
