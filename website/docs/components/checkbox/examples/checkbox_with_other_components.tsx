import React from 'react';
import Checkbox from 'intergalactic/checkbox';
import { DescriptionTooltip } from 'intergalactic/tooltip';
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
        <DescriptionTooltip placement='right-start'>
          <DescriptionTooltip.Trigger
            ml={1}
            tag={InfoM}
            color='icon-secondary-neutral'
            interactive
            aria-label='Additional info'
          />
          <DescriptionTooltip.Popper aria-label={'Additional info about checkbox item'}>
            There is information about point.
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>
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
