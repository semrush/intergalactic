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
import InputMask from '@semcore/input-mask';

const SIZES = ['s', 'm', 'l', 'xl'];
const STATES = ['normal', 'invalid', 'valid'];

const Preview = (preview) => {
  const { bool, text, select, radio } = preview('InputMask');

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

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  const hideMask = bool({
    key: 'hideMask',
    defaultValue: false,
    label: 'Hide mask',
  });

  const mask = text({
    key: 'mask',
    defaultValue: '9999 9999 9999 9999',
    label: 'Mask',
  });

  const placeholder = text({
    key: 'placeholder',
    defaultValue: '____ ____ ____ ____',
    label: 'Placeholder',
  });

  return (
    <InputMask size={size} state={state} w={300}>
      <InputMask.Value
        disabled={disabled}
        mask={mask}
        placeholder={placeholder}
        hideMask={hideMask}
      />
    </InputMask>
  );
};

export default PlaygroundGeneration(Preview);
