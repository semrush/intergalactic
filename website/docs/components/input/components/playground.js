import React from 'react';
import Input from '@semcore/input';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

import CheckM from '@semcore/icon/lib/Check/m';
import CheckS from '@semcore/icon/lib/Check/s';
import CheckXS from '@semcore/icon/lib/Check/xs';
import CheckXXS from '@semcore/icon/lib/Check/xxs';

import ArrowRightM from '@semcore/icon/lib/ArrowRight/m';
import ArrowRightS from '@semcore/icon/lib/ArrowRight/s';
import ArrowRightXS from '@semcore/icon/lib/ArrowRight/xs';
import ArrowRightXXS from '@semcore/icon/lib/ArrowRight/xxs';

const SIZES = ['s', 'm', 'l', 'xl'];
const STATES = ['normal', 'invalid', 'valid'];

const Preview = (preview) => {
  const { bool, select, radio } = preview('Input');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES,
  });

  const state = select({
    key: 'state',
    defaultValue: 'normal',
    label: 'State',
    options: STATES.map((value) => ({
      name: value,
      value,
    })),
  });

  const before = bool({
    key: 'before',
    defaultValue: false,
    label: 'Before',
  });

  const after = bool({
    key: 'after',
    defaultValue: false,
    label: 'After',
  });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  const readOnly = bool({
    key: 'readOnly',
    defaultValue: false,
    label: 'Read-only',
  });

  const beforeIconMap = {
    xl: <CheckM />,
    l: <CheckS />,
    m: <CheckXS />,
    s: <CheckXXS />,
  };
  const afterIconMap = {
    xl: <ArrowRightM />,
    l: <ArrowRightS />,
    m: <ArrowRightXS />,
    s: <ArrowRightXXS />,
  };

  const renderIcon = (position, size) => {
    switch (position) {
      case 'before':
        return beforeIconMap[size];
      case 'after':
        return afterIconMap[size];
      default:
        return false;
    }
  };

  return (
    <Input size={size} state={state}>
      {before && <Input.Addon>{renderIcon(before && 'before', size)}</Input.Addon>}
      <Input.Value disabled={disabled} readOnly={readOnly} placeholder="Placeholder" />
      {after && <Input.Addon interactive>{renderIcon(after && 'after', size)}</Input.Addon>}
    </Input>
  );
};

export default PlaygroundGeneration(Preview);
