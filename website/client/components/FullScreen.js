import React from 'react';
import styled, { css } from 'styled-components';
import { Col, Row } from '@semcore/grid';
import ChevronLeftM from '@semcore/icon/lib/ChevronLeft/m';
import CollapseM from '@semcore/icon/lib/Collapse/m';

const styleHome = css`
  display: flex;
  padding: 0;
  align-items: center;
  color: #999;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  & > span {
    margin-left: 4px;
  }
`;

const FullScreen = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;

  a {
    ${styleHome};
  }
`;

const Header = styled.div`
  padding: 0 26px;

  & > div {
    height: 70px;
  }
`;

const Home = styled.button`
  border: none;
  background: none;
  outline: none;
  ${styleHome};
`;

export default function FullScreenComponent({ children, location, backHome, ...other }) {
  const ButtonBackHome = ({ children }) => {
    return <Home onClick={() => backHome()}>{children}</Home>;
  };

  return (
    <FullScreen {...other}>
      <Header>
        <Row justifyContent="space-between" alignItems="center">
          <Col>
            <ButtonBackHome>
              <ChevronLeftM />
              <span>Вернуться к гайду</span>
            </ButtonBackHome>
          </Col>
          <Col>
            <ButtonBackHome>
              <CollapseM />
            </ButtonBackHome>
          </Col>
        </Row>
      </Header>
      {children}
    </FullScreen>
  );
}
