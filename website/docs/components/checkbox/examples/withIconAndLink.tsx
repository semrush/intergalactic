import React from 'react';
import Checkbox from '@semcore/ui/checkbox';
import Tooltip from '@semcore/ui/tooltip';
import InfoM from '@semcore/ui/icon/Info/m';
import Link from '@semcore/ui/link';

function noop(e) {
  e.preventDefault();
}

const Demo = () => (
  <>
    {[0, 1, 2].map((item) => (
      <div key={item}>
        <Checkbox mb={3} label={`Note ${item + 1}`} />
        <Tooltip title='There is information about point.' placement='right-start' ml={1}>
          <InfoM color='icon-secondary-neutral' interactive aria-label='Additional info' />
        </Tooltip>
      </div>
    ))}

    {[3, 4, 5].map((item) => (
      <div key={item}>
        <Checkbox mb={3}>
          <Checkbox.Value />
          <Checkbox.Text>
            {`Note ${item + 1}`}{' '}
            <Link href='#' onClick={noop}>
              Link to somewhere
            </Link>
          </Checkbox.Text>
        </Checkbox>
      </div>
    ))}
  </>
);

export default Demo;
