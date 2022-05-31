import React, { useState } from 'react';
import Input from '@semcore/input';
import Button from '@semcore/button';
import updatesImg from '../static/illustration/updates.svg';
import NavLink from './NavLink';
import Tooltip from '@semcore/tooltip';
import { css } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import CheckL from '@semcore/icon/Check/l';
import axios from 'axios';
import styles from './UpdateBlock.module.css';

const tooltipStyles = css`
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
    @media (max-width: 415px) {
      width: 250px;
    }
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
    <div className={styles.updateWrapper} id="updBlock">
      <div className={styles.info}>
        <h2 className={styles.header}>All updates in your inbox</h2>
        <Box mb={8}>Just new releases and component versions. And nothing more!</Box>
        {status === 'subscribed' && (
          <div className={styles.subscribed}>
            <CheckL color={'#45E0A8'} />
            We’ll keep you updated!
          </div>
        )}
        {status === 'initial' && (
          <>
            <form onSubmit={handleSubmit}>
              <Tooltip
                className={styles.tooltipUpdate}
                title={'Please enter a valid email.'}
                visible={!!error && touched}
                interaction="click"
                theme="warning"
                styles={tooltipStyles}
                placement="top-start"
              >
                <Input
                  className={styles.inputSubscribe}
                  size="xl"
                  state={!!error ? 'invalid' : 'normal'}
                >
                  <Input.Value
                    name="email"
                    value={value}
                    placeholder="Your email "
                    onChange={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Input>
              </Tooltip>
              <Input className={styles.inputHidden}>
                <Input.Value
                  value={hiddenValue}
                  onChange={setHiddenValue}
                  placeholder="Placeholder"
                />
              </Input>
              <Button
                className={ButtonSubscribe}
                size="l"
                type="submit"
                onClick={subscribe}
                disabled={!!error || !value || !!hiddenValue}
              >
                I want all updates
              </Button>
            </form>
            <div className={styles.terms}>
              By clicking the button you agree to the
              <NavLink to="/terms/terms-of-use/">Terms of use</NavLink> and
              <NavLink to="/terms/privacy/">Privacy policy</NavLink>.
            </div>
          </>
        )}
      </div>
      <img className={styles.updatesImg} src={updatesImg} />
    </div>
  );
}

export default UpdateBlock;
