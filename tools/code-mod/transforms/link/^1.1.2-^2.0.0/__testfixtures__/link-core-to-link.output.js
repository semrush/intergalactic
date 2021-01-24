import React from 'react';
import ScLink from "@semcore/link";

export default () => (
  <ScLink size={300} color="#66ccf7">
    <ScLink.Addon>test</ScLink.Addon>
    <ScLink.Text>Text</ScLink.Text>
    <ScLink.Addon>!</ScLink.Addon>
  </ScLink>
);
