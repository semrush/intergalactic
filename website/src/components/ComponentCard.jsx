import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@semcore/typography';
import staticFiles from '@static';

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 2px solid transparent;
  background: #f6f7f8;
  border-radius: 6px;
  margin-bottom: 0 !important;
  text-decoration: none;
  color: #171a22;
  &:hover {
    cursor: pointer;
    border: 2px solid #0071cd;
    box-shadow: 5px 8px 25px 0 #898d9a33;
    transition: all ease-in-out 100ms;
    text-decoration: underline;
  }
  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const LinkUI = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Title = styled(Text)`
  margin-top: 12px;
  white-space: break-spaces;
`;

function ComponentCard({ image, text, disabled, href, type }) {
  const url = staticFiles[`${type}/${image}.svg`];

  if (!url) {
    // eslint-disable-next-line no-console
    console.warn(`No image found for ${type}/${image}`);
    return null;
  }

  return (
    <Card disabled={disabled}>
      <LinkUI to={href} />
      <img src={url} alt="image" />
      <Title>{text}</Title>
    </Card>
  );
}

export default ComponentCard;
