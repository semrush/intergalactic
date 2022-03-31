import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import postman from '../static/illustration/email-pic.svg';
import PinMapM from '@semcore/icon/PinMap/m';
import GitHubM from '@semcore/icon/color/GitHub/m';
import MailM from '@semcore/icon/Mail/m';
import Helmet from 'react-helmet';

const Content = styled.div`
  display: grid;
  position: relative;
  grid-template-rows: 1fr 6fr;
  grid-template-columns: repeat(3, 1fr);
  padding: 152px 100px 250px;
  max-width: 1140px;
  margin: 0 auto;
  h2 {
    font-family: FactorA-Bold, sans-serif;
    font-size: 50px;
    line-height: 110%;
    color: #171a22;
    margin: 0;
  }
  ul {
    padding: 0 24px;
  }
  li {
    margin-bottom: 8px;
  }
  a {
    color: #1a55ed;
    text-decoration: none;
    margin-left: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 767px) {
    grid-template-rows: 0.5fr 2fr 3fr 2fr;
    grid-template-columns: 1fr;
    padding: 152px 55px 96px;
  }
  @media (max-width: 414px) {
    grid-template-rows: 0fr 2fr 3fr 2fr;
    padding: 136px 35px 96px;
    h2 {
      font-size: 30px;
    }
  }
`;

const Header = styled.div`
  grid-row: 1;
  grid-column: 1 / span 3;
  flex-direction: column;
  color: #575c66;
  margin-bottom: 56px;
  text-align: center;
  @media (max-width: 767px) {
    grid-column: 1;
  }
  @media (max-width: 414px) {
    text-align: left;
  }
`;

const Github = styled.div`
  grid-row: 2;
  grid-column: 1;
  margin: 0 16px 0;
  @media (max-width: 767px) {
    margin: 0;
  }
`;

const Email = styled.div`
  grid-row: 2;
  grid-column: 2;
  margin: 0 16px 0;
  @media (max-width: 767px) {
    grid-row: 3;
    grid-column: 1;
    margin: 0;
    margin-top: 40px;
  }
`;

const Address = styled.div`
  grid-row: 2;
  grid-column: 3;
  margin: 0 16px 0;
  @media (max-width: 767px) {
    grid-row: 4;
    grid-column: 1;
    margin: 0;
    margin-top: 40px;
  }
`;

const Text = styled.div`
  background-color: #f6f7f8;
  padding: 12px 24px 24px;
  margin-top: 24px;
  border-radius: 6px;
`;

const Subtitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  color: #000000;
  margin: 12px 0;
`;

const Title = styled.div`
  font-family: FactorA-Bold, sans-serif;
  font-size: 30px;
  font-weight: 600;
  line-height: 120%;
  color: #000000;
  margin-bottom: 8px;
  white-space: nowrap;
  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

const Postman = styled.img`
  position: absolute;
  width: 480px;
  right: 0px;
  bottom: 40px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Contacts = () => (
  <>
    <Helmet>
      <title>Contact Us | Contacts</title>
    </Helmet>
    <Content>
      <Header>
        <h2>Contact Us</h2>
        Have any questions? We’d love to hear from you.
      </Header>
      <Github>
        <Title>
          <GitHubM mr={2} />
          GitHub
        </Title>
        Any developer can contribute via pull-request and
        <a
          href="https://github.com/semrush/intergalactic"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue on the GitHub
        </a>
        .
        <Text>
          <Subtitle>Bug reporting & Improvements</Subtitle>
          Found a bug? Good job! ✨
          <ul>
            <li>
              Make sure that issue tracker doesn't contain the similar issue and create one with the
              steps to reproduce the error.
            </li>
            <li>Have a solution — great! We'll be happy to review your pull-request.</li>
            <li>
              Don't forget to follow
              <a
                href="https://github.com/semrush/intergalactic/blob/master/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                contributing guide
              </a>
              . It will make our joint work more effective!
            </li>
          </ul>
        </Text>
      </Github>
      <Email>
        <Title>
          <MailM mr={2} />
          Email
        </Title>
        Feel free to drop us a line at
        <a href="mailto:ui-kit-team@semrush.com" target="_blank">
          ui-kit-team@semrush.com
        </a>{' '}
        in case:
        <Text>
          <Subtitle>Send a request to develop a new component</Subtitle>
          Before sending email, check our
          <Link to="/internal/roadmap/" rel="noopener noreferrer">
            Roadmap
          </Link>
          , perhaps needed component is already there. If not, share with some details:
          <ul>
            <li>Cases and requirements</li>
            <li>Guide and mockups</li>
            <li>Interactive prototype if there is an animation (any format: gif, axure, etc.)</li>
          </ul>
          <Subtitle>Leave feedback</Subtitle>
          We care about usability and will be happy to receive feedback on both the site and the
          experience with our components.
          <Subtitle>Ask a question</Subtitle>
          Just write your message 🙂 Your email won't be lost. We'll get back to you as soon as we
          can.
        </Text>
      </Email>
      <Address>
        <Title>
          <PinMapM mr={2} />
          Address
        </Title>
        Find us in St. Petersburg, Zastavskaya street, 22k2, 196006.
        <Text>
          <Subtitle>Visit us</Subtitle>
          If you want live dialogue, welcome to our office from 12:00 PM – 6:00 PM, Monday – Friday.{' '}
          <br />
          <br />
          But please let us know about your visit in advance because now we mostly work from home.
          <Subtitle>Send us a postcard</Subtitle>
          If suddenly you want to do something nice for us, just send a couple of words on a
          postcard from your city 🙂
        </Text>
      </Address>
      <Postman src={postman} />
    </Content>
  </>
);

export default Contacts;
