import SummaryAI from '@semcore/icon/SummaryAI/m';
import { NoticeFH } from '@semcore/ui/feature-highlight';
import React from 'react';

const Demo = () => (
  <NoticeFH closable aria-label='Highlighted notice' label={<SummaryAI />} text='We have a new feature!' />
);

export default Demo;
