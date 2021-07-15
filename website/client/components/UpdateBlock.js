import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '@semcore/input';
import Button from '@semcore/button';
import updatesImg from '../static/illustration/updates.svg';
import NavLink from './NavLink';
import Tooltip from '@semcore/tooltip';
import { css } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import CheckL from '@semcore/icon/lib/Check/l';
import axios from 'axios';

const UpdateWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr;
  margin-left: 40px;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    margin-left: 0;
    padding: 0 35px 56px;
  }
  @media (max-width: 320px) {
    padding: 0;
  }
`;

const Info = styled.div`
  grid-row: 1;
  grid-column: 1;
  font-size: 18px;
  line-height: 150%;
  margin-right: 40px;
  @media (max-width: 767px) {
    grid-column: 1;
  }
`;

const Header = styled.h2`
  font-family: FactorA-Bold, sans-serif;
  font-size: 50px;
  line-height: 110%;
  margin: 48px 0 16px;
  @media (max-width: 767px) {
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
  grid-column: 2;
  margin-right: 56px;
  @media (max-width: 767px) {
    display: none;
  }
`;

const InputSubscribe = styled(Input)`
  height: 56px !important;
  font-size: 18px !important;
  width: 296px;
  margin: 0 16px 16px 0;
  @media (max-width: 767px) {
    width: 100%;
    margin: 0 0 16px;
  }
`;

const InputHidden = styled(Input)`
  position: absolute;
  top: -100px;
  left: -100px;
`;

const Subscribed = styled.div`
  display: flex;
  align-items: center;
  font-size: 21px;
  color: #575c66;
  line-height: 150%;
  svg {
    width: 38px;
    margin-right: 19px;
  }
`;

const ButtonSubscribe = css`
  SButton {
    height: 56px !important;
    width: 200px;
    border-radius: 6px !important;
    background: #ff622d !important;
    border-color: #ff622d !important;
    font-size: 18px !important;
    color: #fff !important;
    margin-bottom: 16px;
    &:hover {
      background: #b23300 !important;
      border-color: #b23300 !important;
    }
    &[disabled] {
      opacity: 1 !important;
    }

    @media (max-width: 767px) {
      width: 100%;
    }
    @media (max-width: 320px) {
      width: 250px;
    }
  }
`;

const TooltipUpdate = styled(Tooltip)`
  @media (max-width: 767px) {
    width: 100%;
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
  SButton[disabled] {
    opacity: 1 !important;
  }
`;

function UpdateBlock() {
  const [value, setValue] = useState('');
  const [hiddenValue, setHiddenValue] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('initial');
  const [touched, setTouched] = useState(false);

  const handleInput = (value) => {
    setValue(value);
    if (!/.+@.+\..+/i.test(value)) {
      setError("Email don't valid");
    } else {
      setError('');
    }
  };

  const handleBlur = () => setTouched(false);

  const handleFocus = () => setTouched(true);

  const subscribe = () => setTimeout(() => setStatus('subscribed'), 1000);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'mailer/post',
      data: { email: value },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <UpdateWrapper id="updBlock">
      <Info>
        <Header>All updates in your inbox</Header>
        <Box mb={8}>Just new releases and component versions. And nothing more!</Box>
        {status === 'subscribed' && (
          <Subscribed>
            <CheckL color={'#45E0A8'} />
            We’ll keep you updated!
          </Subscribed>
        )}
        {status === 'initial' && (
          <>
            <form onSubmit={handleSubmit}>
              <TooltipUpdate
                title={'Please enter a valid email.'}
                visible={!!error && touched}
                interaction="click"
                theme="warning"
                styles={styles}
                placement="top-start"
              >
                <InputSubscribe size="xl" state={!!error ? 'invalid' : 'normal'}>
                  <Input.Value
                    name="email"
                    value={value}
                    placeholder="Your email "
                    onChange={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </InputSubscribe>
              </TooltipUpdate>
              <InputHidden>
                <Input.Value
                  value={hiddenValue}
                  onChange={setHiddenValue}
                  placeholder="Placeholder"
                />
              </InputHidden>
              <Button
                styles={ButtonSubscribe}
                size="l"
                type="submit"
                onClick={subscribe}
                disabled={!!error || !value || !!hiddenValue}
              >
                I want all updates
              </Button>
            </form>
            <Terms>
              By clicking the button you agree to the
              <NavLink to="/terms/terms-of-use/">Terms of use</NavLink> and
              <NavLink to="/terms/privacy/">Privacy policy</NavLink>.
            </Terms>
          </>
        )}
      </Info>
      <UpdatesImg src={updatesImg} />
    </UpdateWrapper>
  );
}

export default UpdateBlock;
