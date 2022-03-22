import React from 'react';
import InlineInput from '@semcore/inline-input';

const Example = () => {
  return (
    <>
      <InlineInput state="valid" />
      <br />
      <br />
      <InlineInput state="invalid" />
      <br />
      <br />
      <InlineInput state="disabled" />
      <br />
      <br />
      <InlineInput loading />
    </>
  );
};

export default Example;
