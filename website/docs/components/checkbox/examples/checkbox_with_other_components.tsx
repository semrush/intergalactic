import React from 'react';
import Checkbox from 'intergalactic/checkbox';
import { Hint } from 'intergalactic/tooltip';
import InfoM from 'intergalactic/icon/Info/m';
import Link from 'intergalactic/link';

function noop(e) {
  e.preventDefault();
}

const Demo = () => (
  <>
    {[0, 1, 2].map((item) => (
      <div key={item}>
        <Checkbox mb={3} label={`Note ${item + 1}`} />
        <Hint
          title='There is information about point.'
          placement='right-start'
          ml={1}
          tag={InfoM}
          color='icon-secondary-neutral'
          interactive
          aria-label='Additional info'
        />
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
