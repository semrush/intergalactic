import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Helmet from 'react-helmet';
import icon from './static/favicon/favicon.png';
import iconRotate from './static/favicon/favicon-rotate.png';

import client from './apollo';
import Header from './components/Header';
import Footer from './components/Footer';

import Tracking from './components/Tracking';

import Home from './pages/Home';
import Page from './pages/Page';
import NotFound from './pages/NotFound';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function isWorking() {
  const d = new Date();
  return !(d.getHours() < 8 || d.getHours() > 22);
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Helmet>
        <meta charSet="UTF-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* пасхалка */}
        <link rel="icon" href={isWorking() ? icon : iconRotate} />

        <title>Loading...</title>
        <meta name="description" content="Intergalactic – Design System" />
      </Helmet>
      <Router>
        <Tracking />
        <Body>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
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
        </Body>
      </Router>
    </ApolloProvider>
  );
}

export default App;
