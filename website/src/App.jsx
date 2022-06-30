import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, StaticRouter, Redirect, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import icon from 'static/favicon/favicon.png';
import iconRotate from 'static/favicon/favicon-rotate.png';
import './main.css';
import './roadmap-page.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Tracking from './components/Tracking';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Page from './pages/Page';
import NotFound from './pages/NotFound';
import ContactUs from './pages/ContactUs';

function isWorking() {
  const d = new Date();
  return !(d.getHours() < 8 || d.getHours() > 22);
}

const Router = !globalThis.__ssr
  ? BrowserRouter
  : ({ children, basename }) => {
      if (globalThis.__ssr_route === undefined) {
        throw new Error(`On server side globalThis.__ssr_route should be defined`);
      }
      const location = !globalThis.__ssr_route ? `/` : `/${globalThis.__ssr_route}/`;

      return (
        <StaticRouter basename={basename} location={location}>
          {children}
        </StaticRouter>
      );
    };

export function App() {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <link rel="icon" href={isWorking() ? icon : iconRotate} />

        <title>Loading...</title>
        <meta name="description" content="Intergalactic – Design System" />
      </Helmet>
      <Router basename={process.env.PUBLIC_PATH.slice(0, -1)}>
        <ScrollToTop />
        <Tracking />
        <div className={styles.body}>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact strict path="/contacts/contact-info/">
              <ContactUs />
            </Route>
            <Route exact strict path="/not-found/">
              <NotFound />
            </Route>
            <Route exact strict path="/:category/:page/:tab?/">
              <Page />
            </Route>
            <Route
              render={({
                history: {
                  location: { pathname, search, hash },
                },
              }) => {
                return pathname.slice(-1) !== '/' ? (
                  <Redirect to={`${pathname}/${search}${hash}`} />
                ) : (
                  <NotFound />
                );
              }}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    </>
  );
}
