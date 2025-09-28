import CheckAltM from '@semcore/icon/CheckAlt/m';
import Input from '@semcore/ui/input';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [passed, setPassed] = React.useState(false);

  const handleChange = React.useCallback((value: string) => {
    setValue(value);

    if (value.length >= 5) {
      setPassed(true);
    } else {
      setPassed(false);
    }
  }, []);

  const content = (
    <p key={`1_${passed}`}>
      {!passed ? '•' : <CheckAltM aria-hidden={false} aria-label='passed' />}
      {' '}
      Should contain min 5
      symbols
    </p>
  );

  return (
    <Tooltip>
      <Tooltip.Trigger tag={Input}>
        <Input.Value value={value} onChange={handleChange} />
      </Tooltip.Trigger>
      <Tooltip.Popper>{content}</Tooltip.Popper>
    </Tooltip>
  );
};

export default Demo;
