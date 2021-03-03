import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import Input from '@semcore/input';
import Button from '@semcore/button';
import Changelog from './Changelog';
import updatesImg from '../static/space/updates.svg';
import NavLink from './NavLink';
import Tooltip from '@semcore/tooltip';
import { css } from '@semcore/core';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';
import CheckL from '@semcore/icon/lib/Check/l';
import axios from 'axios';
import Loadable from 'react-loadable';
import FormatText from './FormatText';
import ChangelogByComponent from './ChangelogByComponent';
import RenderTags from '../tags';
const mailchimp = require('@mailchimp/mailchimp_marketing');
import release2 from '../../../release/CHANGELOG.md';

const UpdateWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr;
  margin-left: -116px;
  @media (max-width: 768px) {
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
  margin: 80px 0 16px;
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

    @media (max-width: 768px) {
      width: 428px;
    }
    @media (max-width: 320px) {
      width: 250px;
    }
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
  const [error, setError] = useState('');
  const [status, setStatus] = useState('initial');

  const handleInput = (value) => {
    if (!/.+@.+\..+/i.test(value)) {
      setError("Email don't valid");
    } else {
      setTimeout(() => setStatus('subscribed'), 3000);
    }
  };

  const handleFocus = () => setError('');

  const handleChange = (value) => setValue(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'patch',
      url: 'mailer/patch',
      data: { email: value },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  let releaseText;
  useEffect(() => {
    fetch(release2)
      .then((response) => response.text())
      .then((text) => {
        releaseText = text;
      });
  }, []);

  return (
    <UpdateWrapper id="updBlock">
      <UpdatesImg src={updatesImg} />
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
              <Tooltip
                title={'Please enter a valid email.'}
                visible={!!error}
                theme="warning"
                styles={styles}
                placement="top-start"
              >
                <InputSubscribe size="xl" state={!!error ? 'invalid' : 'normal'}>
                  <Input.Value
                    name="email"
                    value={value}
                    placeholder="Your email "
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={() => handleInput(value)}
                  />
                </InputSubscribe>
              </Tooltip>
              <Button
                styles={ButtonSubscribe}
                size="l"
                type="submit"
                onClick={() => handleInput(value)}
                disabled={!!error}
              >
                I want all updates
              </Button>
            </form>

            {/*<ReactMarkdown children={release2} />*/}
            <Terms>
              By clicking the button you agree to the
              <NavLink to="/terms/terms-of-use/">Terms of use</NavLink> and
              <NavLink to="/terms/privacy/">Privacy policy</NavLink>.
            </Terms>
          </>
        )}
      </Info>
    </UpdateWrapper>
  );
}

export default UpdateBlock;
