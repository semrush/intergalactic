import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@semcore/input';
import Button from '@semcore/button';
import updatesImg from '../static/space/updates.svg';
import NavLink from './NavLink';
import Tooltip from '@semcore/tooltip';
import { css } from '@semcore/core';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';

const UpdateWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr;
  margin-left: -116px;
  @media (max-width: 768px) {
    margin-left: -238px;
  }
  @media (max-width: 320px) {
    grid-template-columns: 1fr;
    margin-left: 0;
  }
`;

const Info = styled.div`
  grid-row: 1;
  grid-column: 2;
  font-size: 18px;
  @media (max-width: 320px) {
    grid-column: 1;
  }
`;

const Header = styled.h2`
  font-family: FactorA-Bold;
  font-size: 50px;
  line-height: 110%;
  margin: 80px 0 8px;
  @media (max-width: 768px) {
    max-width: 400px;
  }
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Terms = styled.div`
  font-size: 16px;
  color: #898d9a;
  a {
    color: #1a55ed;
    text-decoration: none;
    margin-left: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const UpdatesImg = styled.img`
  grid-row: 1;
  grid-column: 1;
  margin-right: 40px;
  margin-top: -50px;
  @media (max-width: 320px) {
    display: none;
  }
`;

const InputSubscribe = styled(Input)`
  height: 56px !important;
  font-size: 18px !important;
  width: 296px;
  margin: 0 16px 16px 0;
  @media (max-width: 768px) {
    width: 428px;
  }
  @media (max-width: 320px) {
    width: 250px;
  }
`;

const ButtonSubscribe = styled(Button)`
  height: 56px !important;
  width: 200px;
  border-radius: 6px !important;
  background: #ff622d !important;
  border-color: #ff622d !important;
  font-size: 18px !important;
  color: #fff !important;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    width: 428px;
  }
  @media (max-width: 320px) {
    width: 250px;
  }
`;

const styles = css`
  STooltip {
    background-color: #f71939 !important;
    border-color: #f71939 !important;
    max-width: 500px;
    font-size: 16px;
  }
  SArrow {
    &:before {
      border-color: #f71939 !important;
    }
  }
`;

function UpdateBlock() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleInput = (value) => {
    if (!/.+@.+\..+/i.test(value) && value !== '') {
      setError("Email don't valid");
    }
  };

  const handleFocus = () => setError('');

  const handleChange = (value) => setValue(value);

  return (
    <UpdateWrapper id="updBlock">
      <UpdatesImg src={updatesImg} />
      <Info>
        <Header>All updates in your inbox</Header>
        <Box mb={8}>
          We will send only information about new releases and component versions. And nothing more!
        </Box>
        <Tooltip
          title={'You need to enter valid mail, dear friend.'}
          visible={!!error}
          theme="warning"
          styles={styles}
          placement="top-start"
        >
          <InputSubscribe size="xl" state={!!error ? 'invalid' : 'normal'}>
            <Input.Value
              value={value}
              placeholder="Your email "
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={() => handleInput(value)}
            />
          </InputSubscribe>
        </Tooltip>
        <ButtonSubscribe size="l">I want all updates</ButtonSubscribe>
        <Terms>
          By clicking the button you agree to the
          <NavLink to="/terms/terms-of-use/">Terms of use</NavLink> and
          <NavLink to="/terms/privacy/">Privacy policy</NavLink>.
        </Terms>
      </Info>
    </UpdateWrapper>
  );
}

export default UpdateBlock;
