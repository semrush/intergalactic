import React, { useState, useCallback, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import HamburgerL from '@semcore/icon/Hamburger/l';
import CloseL from '@semcore/icon/Close/l';
import SearchL from '@semcore/icon/Search/l';
import TimeDayL from '@semcore/icon/TimeDay/l';
import TimeNightL from '@semcore/icon/TimeNight/l';
import SemrushL from '@semcore/icon/Semrush/l';
import SearchHome from './SearchHome';
import SideBarNavigation from './SideBarNavigation';
import Divider from '@semcore/divider';
import LinkKit from '@semcore/link';
import OutsideClick from '@semcore/outside-click';
import { navigationTree } from '@navigation';
import styles from './Header.module.css';
import cx from 'classnames';
import Tooltip from '@semcore/tooltip';
import { logEvent } from '../utils/amplitude';
import { getThemePreference } from '../utils/theme';

function Header({ theme, setTheme }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useLayoutEffect(() => {
    const currentTheme = getThemePreference();
    setTheme(currentTheme);
  }, []);

  const renderThemeToggle = useCallback(() => {
    if (theme) {
      return theme === 'light' ? (
        <TimeNightL aria-label="Turn on the dark theme" />
      ) : (
        <TimeDayL aria-label="Turn on the light theme" />
      );
    }
  }, [theme]);

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
          <a className={styles.devportalLink} href="/" onClick={() => logEvent('logo_dev:click')}>
            <SemrushL className={styles.semrushLogo} />
            <Tooltip>
              <Tooltip.Trigger className={styles.devportalLink__mobile}>
                <span className={styles.devportalTitle} aria-label="Go to Semrush Developer Portal">
                  Developer
                </span>
              </Tooltip.Trigger>
              <Tooltip.Popper className={styles.headerTooltip}>Go to start page</Tooltip.Popper>
            </Tooltip>
          </a>
          <div className={styles.linkDivider}>
            <Divider mx={2} h={20} orientation="vertical" />
          </div>
          <Link
            className={styles.intergalacticLink}
            aria-label="Go to Intergalactic Design System main page"
            to="/"
            onClick={() => logEvent('logo_intergalactic:click')}
          >
            Intergalactic
          </Link>
        </div>
        <SearchHome
          wrapperClassName={cx(styles.searchWrapper, !searchVisible && styles.mobileSearchHidden)}
          placeholder="What brings you here, Sole Survivor?"
          onItemSelect={() => setSearchVisible(false)}
          onFocus={() => logEvent('search:click')}
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
            color="var(--intergalactic-icon-non-interactive)"
          >
            GitHub
          </LinkKit>
        </span>
      </nav>
      <span
        className={styles.themeToggle}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {renderThemeToggle()}
      </span>
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
              <span
                className={styles.mobileThemeToggle}
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {`${theme === 'light' ? 'Dark' : 'Light'} theme`}
                {theme === 'light' ? (
                  <TimeNightL
                    ml={3}
                    interactive
                    color="var(--intergalactic-icon-non-interactive)"
                  />
                ) : (
                  <TimeDayL ml={3} interactive color="var(--intergalactic-icon-non-interactive)" />
                )}
              </span>
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
