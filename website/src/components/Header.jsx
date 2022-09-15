import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import mobileLogo from '../static/logo/semrush-logo.svg';
import HamburgerL from '@semcore/icon/Hamburger/l';
import CloseL from '@semcore/icon/Close/l';
import SearchL from '@semcore/icon/Search/l';
import SearchHome from './SearchHome';
import SideBarNavigation from './SideBarNavigation';
import Divider from '@semcore/divider';
import LinkKit from '@semcore/link';
import OutsideClick from '@semcore/outside-click';
import { navigationTree } from '@navigation';
import styles from './Header.module.css';
import cx from 'classnames';
import Tooltip from '@semcore/tooltip';

function Header(props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.headerMain}>
        <div
          className={cx(
            styles.menuIcon,
            menuVisible && styles.activeMenuIcon,
            searchVisible && styles.activeSearch,
          )}
        >
          {menuVisible ? (
            <CloseL onClick={() => setMenuVisible(false)} />
          ) : (
            <HamburgerL onClick={() => setMenuVisible(true)} />
          )}
        </div>
        <div className={cx(styles.logo, searchVisible && styles.activeSearch)}>
          <a className={styles.devportalLink} href="/">
            <img src={mobileLogo} className={styles.semrushLogo} alt="Logo" />
            <Tooltip>
              <Tooltip.Trigger className={styles.devportalLink__mobile}>
                <span className={styles.devportalTitle}>Developer</span>
              </Tooltip.Trigger>
              <Tooltip.Popper className={styles.headerTooltip}>Go to start page</Tooltip.Popper>
            </Tooltip>
          </a>
          <div className={styles.linkDivider}>
            <Divider mx={2} h={20} orientation="vertical" />
          </div>
          <Link className={styles.intergalacticLink} to="/">
            Intergalactic
          </Link>
        </div>
        <SearchHome
          className={styles.searchField}
          wrapperClassName={cx(styles.searchWrapper, !searchVisible && styles.mobileSearchHidden)}
          placeholder="What brings you here, Sole Survivor?"
          onItemSelect={() => setSearchVisible(false)}
        />
      </div>
      <div className={styles.searchIcon}>
        {searchVisible ? (
          <CloseL onClick={() => setSearchVisible(false)} />
        ) : (
          <SearchL onClick={() => setSearchVisible(true)} />
        )}
      </div>
      <nav className={styles.nav} aria-label="Relevant links">
        <Tooltip>
          <Tooltip.Trigger>
            <span className={styles.item}>
              <NavLink to="/internal/extension/">Extension</NavLink>
            </span>
          </Tooltip.Trigger>
          <Tooltip.Popper className={styles.headerTooltip}>
            Chrome extension is available only for users registered in the corporate mail
          </Tooltip.Popper>
        </Tooltip>
        <span className={styles.item}>
          <NavLink to="/internal/roadmap/">Roadmap</NavLink>
        </span>
        <span className={styles.item}>
          <NavLink to="/internal/release/">Releases</NavLink>
        </span>
        <span className={styles.item}>
          <LinkKit
            href="https://github.com/semrush/intergalactic"
            target="_blank"
            rel="noopener noreferrer nofollow"
            color="#171a22"
          >
            GitHub
          </LinkKit>
        </span>
      </nav>
      {menuVisible && (
        <OutsideClick onOutsideClick={() => setMenuVisible(false)}>
          <nav className={styles.mobileMenu}>
            <div className={styles.mobileMenuLinks}>
              <Link to="/internal/extension/" onClick={() => setMenuVisible(false)}>
                Extension
              </Link>
              <Link to="/internal/roadmap/" onClick={() => setMenuVisible(false)}>
                Roadmap
              </Link>
              <Link to="/internal/release/" onClick={() => setMenuVisible(false)}>
                Releases
              </Link>
              <a
                href="https://github.com/semrush/intergalactic"
                target="_blank"
                onClick={() => setMenuVisible(false)}
              >
                GitHub
              </a>
            </div>
            <div className={styles.mobileMenuDivider}>
              <Divider orientation="horizontal" />
            </div>
            <SideBarNavigation
              className={styles.mobileMenuNavigation}
              tag={`Button`}
              onClose={() => setMenuVisible(false)}
              onNavigate={() => setMenuVisible(false)}
              navigation={navigationTree.filter((nav) => !nav.metadata.hide)}
            />
          </nav>
        </OutsideClick>
      )}
    </header>
  );
}

export default Header;
