import React from 'react';
import { P } from '@semcore/typography';

export default () => [
  <P tag={'span'} size={'m'}>Text text text</P>,
  <P size={'l'}>Text text text</P>,
  <P size={'xl'} gutterBottom>Text text text</P>,
  <P size="m" gutterBottom={false}>Text text text</P>,
  <P size="l" gutterBottom={true}>Text text text</P>,
  <P size="xl">Text text text</P>,
];
