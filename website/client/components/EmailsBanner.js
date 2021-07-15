import React from 'react';
import styled from 'styled-components';
import emailImg from '../static/illustration/email-library-pic.svg';
import Tag from '@semcore/tag';
import { Box } from '@semcore/flex-box';

const EmailsWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 3fr;
  overflow: hidden;
  box-shadow: 5px 8px 25px rgba(137, 141, 154, 0.2);
  border-radius: 6px;
  background-color: #fff;
  margin-bottom: 80px;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 1fr;
    margin-left: 0;
    margin: 0 0 56px;
  }
  @media (max-width: 320px) {
    padding: 0;
    margin: 0;
  }
`;

const Info = styled.div`
  grid-row: 1;
  grid-column: 2;
  font-size: 18px;
  line-height: 150%;
  margin-left: 40px;
  max-width: 560px;
  @media (max-width: 767px) {
    margin: 0px 40px 0 16px;
    grid-row: 2;
    grid-column: 1;
  }
`;

const Header = styled.h3`
  font-family: FactorA-Bold, sans-serif;
  font-size: 30px;
  line-height: 120%;
  margin: 40px 8px 0 0;
  display: inline-block;
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: 120%;
    margin: 0 8px 0 0;
  }
`;

const EmailImg = styled.img`
  grid-row: 1;
  grid-column: 1;
  @media (max-width: 767px) {
    margin-left: -150px;
  }
`;

function BannerBlock() {
  return (
    <EmailsWrapper id="bannerBlock">
      <EmailImg src={emailImg} />
      <Info>
        <Box>
          <Header mr={2}>Product emails library</Header>
          <Tag size="s" theme="muted" use="primary" children="soon" />
        </Box>
        <Box mt={2} mb={8}>
          All you need for making your product newsletter cool and consistent.
        </Box>
      </Info>
    </EmailsWrapper>
  );
}

export default BannerBlock;
