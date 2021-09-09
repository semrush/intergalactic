import React from 'react';
import styled from 'styled-components';
import logo from '../static/logo/semrush-logo-title.svg';
import NavLink from './NavLink';
import { Blockquote, Hint, List, Text } from '@semcore/typography';
import whale from '../static/illustration/whale.svg';

const Card = styled.a`
  padding: 16px;
  &:hover {
    border: 2px solid #0071cd;
    box-shadow: 5px 8px 25px 0 #898d9a33;
    transition: all ease-in-out 100ms;
  }
`;

function ComponentCard(props) {
  return (
    <Card>
      <img src={props.image} />
      <Text mt={2}>{props.text}</Text>
    </Card>
  );
}

export default ComponentCard;
