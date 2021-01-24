import React from 'react';
import SpinContainer from '@semcore/spin-container';

export default function(props) {
  return <SpinContainer size="xxl" theme="#B880FF" hMin="50vh" loading {...props} />;
}
