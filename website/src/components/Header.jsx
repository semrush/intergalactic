import React, { useState } from 'react';
import Button from '@semcore/button';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import mobileLogo from '../static/logo/semrush-logo.svg';
import hamburger from '../static/mobile/hamburger.svg';
import CloseM from '@semcore/icon/Close/m';
import SearchM from '@semcore/icon/Search/m';
import close from '../static/mobile/close.svg';
import SearchHome from './SearchHome';
import SideBarNavigation from './SideBarNavigation';
import Divider from '@semcore/divider';
import LinkKit from '@semcore/link';
import OutsideClick from '@semcore/outside-click';
import { navigationTree } from '@navigation';
import styles from './Header.module.css';

const MobileHeaderMenu = ({ clicked, setClicked }) => (
  <span className={styles.mobileMenu}>
    <span className={styles.mobile}>
      <span className={styles.mobileBackground}>
        <img
          src={close}
          alt="Logo"
          tag={`Button`}
          onClick={() => {
            setClicked(false);
          }}
        />
      </span>
    </span>
    <OutsideClick onOutsideClick={() => setClicked(false)}>
      <div className={styles.side}>
        <div className={styles.links}>
          <Link to="/internal/extension/">Extension ✨</Link>
          <Link to="/internal/roadmap/">Roadmap</Link>
          <Link to="/internal/release/">Releases</Link>
          <a href="https://github.com/semrush/intergalactic" target="_blank">
            GitHub
          </a>
        </div>
        <Divider className={styles.line} orientation="horizontal" />
        <SideBarNavigation
          tag={`Button`}
          visible={clicked}
          onClose={() => setClicked(false)}
          navigation={navigationTree.filter((nav) => !nav.metadata.hide)}
        />
      </div>
    </OutsideClick>
  </span>
);

function Header(props) {
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <header className={styles.headerWrapper} {...props}>
      {clicked ? (
        <MobileHeaderMenu clicked={clicked} setClicked={setClicked} />
      ) : (
        <span className={styles.mobileMenu}>
          <span className={styles.mobile}>
            <img
              src={hamburger}
              alt="Logo"
              tag={`Button`}
              onClick={() => {
                setClicked(true);
              }}
            />
          </span>
        </span>
      )}
      <div className={styles.logo}>
        <img className={styles.mobileLogo} src={mobileLogo} alt="Logo" />
        <div className={styles.desktopLogo}>
          <a className={styles.devportalLink} href="https://developer.semrush.com/">
            <img src={mobileLogo} alt="Logo" />
            Developer
          </a>
          <Link className={styles.intergalacticLink} to="/">
            Intergalactic
          </Link>
        </div>
      </div>
      <div className={styles.searchMobile}>
        <div
          className={styles.mobileSearch}
          tag={Button}
          onClick={() => setVisible(true)}
          style={visible ? { display: 'none' } : { display: 'flex' }}
        >
          <SearchM className={styles.searchIcon} />
        </div>
        <SearchHome
          placeholder="What brings you here, Sole Survivor?"
          style={visible ? { marginLeft: '-200px', width: '258px' } : { display: 'none' }}
        />
        <div
          className={styles.mobileClose}
          tag={Button}
          onClick={() => setVisible(false)}
          style={visible ? { display: 'flex' } : { display: 'none' }}
        >
          <CloseM className={styles.closeIcon} />
        </div>
      </div>
      <div className={styles.search}>
        <SearchHome placeholder="What brings you here, Sole Survivor?" />
      </div>
      <nav className={styles.nav}>
        <span className={styles.item}>
          <NavLink activeStyle={{ textDecoration: 'underline' }} to="/internal/extension/">
            Extension ✨
          </NavLink>
        </span>
        <span className={styles.item}>
          <NavLink activeStyle={{ textDecoration: 'underline' }} to="/internal/roadmap/">
            Roadmap
          </NavLink>
        </span>
        <span className={styles.item}>
          <NavLink activeStyle={{ textDecoration: 'underline' }} to="/internal/release/">
            Releases
          </NavLink>
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
    </header>
  );
}

export default Header;
