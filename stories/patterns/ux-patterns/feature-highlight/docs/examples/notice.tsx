import { NoticeFH } from '@semcore/feature-highlight';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

const Demo = () => (
  <NoticeFH closable aria-label='Highlighted notice' label={<SummaryAI />}>
    We have a new feature!
  </NoticeFH>
);

export default Demo;
