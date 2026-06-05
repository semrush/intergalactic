import { Popper } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

const style = { background: 'var(--intergalactic-bg-primary-neutral)', color: 'var(--intergalactic-text-primary)', borderRadius: 'var(--intergalactic-popper-rounded)', border: '1px solid var(--intergalactic-border-primary)', padding: 'var(--intergalactic-spacing-4x, 16px)', boxShadow: 'var(--intergalactic-box-shadow-popper)' };

const Demo = () => (
  <Popper interaction='hover'>
    <Popper.Trigger tag={Button}>Open popper on hover or focus</Popper.Trigger>
    <Popper.Popper style={style}>Attached content</Popper.Popper>
  </Popper>
);

export default Demo;
