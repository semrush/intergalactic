import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import spaceman from '../static/illustration/spaceman.svg';

const Content = styled.div`
  padding: 200px 90px 96px 160px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  line-height: 150%;
  @media (max-width: 767px) {
    padding: 120px 56px 96px 56px;
    flex-direction: column;
  }
`;

const Info = styled.div`
  width: 665px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  white-space: nowrap;
  a {
    margin-right: 5px;
    color: #1a55ed;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 767px) {
    width: 525px;
    white-space: normal;
    margin-left: 40px;
  }
`;

const Spaceman = styled.img`
  width: 400px;
  margin-right: 72px;
`;

export default (props) => (
  <Content>
    <Spaceman src={spaceman} />
    <Info>
      <h1>{props.title}</h1>
      <p>
        Huston, we have problems. <br /> Try to return to the <Link to="/">Main page.</Link>
      </p>
      <p>
        If you see this page all the time, feel free to drop us <br /> a line at{' '}
        <a href="mailto:ui-kit-team@semrush.com">ui-kit-team@semrush.com</a>
        or open an{' '}
        <a
          href="https://github.com/semrush/intergalactic"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue on the GitHub.
        </a>{' '}
        <br /> We'll do something about it 😛
      </p>
    </Info>
  </Content>
);
