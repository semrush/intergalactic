import React from 'react';

import Dot from '@semcore/ui/dot';
import Button from '@semcore/ui/button';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const SIZES = ['m', 'l'];

const Preview = (preview) => {
  const { bool, radio, text } = preview('Dot');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES,
  });

  const up = bool({
    key: 'up',
    defaultValue: false,
    label: 'Up',
  });

  const hidden = bool({
    key: 'hidden',
    defaultValue: false,
    label: 'Hidden',
  });

  const value = text({
    key: 'value',
    defaultValue: undefined,
    label: 'Value',
  });

  return (
    <Button>
      <Button.Text alignItems="center">Notification</Button.Text>
      {up ? (
        <Dot up={up} size={size} hidden={hidden} aria-label="You have unread notification">
          {value ? value : null}
        </Dot>
      ) : (
        <Button.Addon>
          <Dot size={size} hidden={hidden} aria-label="You have unread notification">
            {value ? value : null}
          </Dot>
        </Button.Addon>
      )}
    </Button>
  );
};

export default PlaygroundGeneration(Preview);
