import React from 'react';
import { Link, animateScroll } from 'react-scroll';
import ArrowUpM from '@semcore/icon/ArrowUp/m';
import trottle from '@semcore/utils/lib/rafTrottle';
import cx from 'classnames';
import styles from './SideBarHeading.module.css';

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
      <div className={styles.sideBarWrapper}>
        {headings.map((heading) => (
          <Link
            className={cx(styles.navLink, heading.id === activeId && styles.navLinkActive)}
            key={heading.html}
            to={heading.id}
            smooth={true}
            offset={-140}
            duration={200}
            delay={0}
          >
            {heading.html}
          </Link>
        ))}
      </div>
      <span className={styles.buttonUp} onClick={() => animateScroll.scrollToTop({ smooth: true })}>
        <ArrowUpM interactive />
      </span>
    </>
  );
}

export default SideBarHeading;
