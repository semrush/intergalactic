import React from 'react';
import Checkbox from '@semcore/ui/checkbox';
import Tooltip from '@semcore/ui/tooltip';
import InfoXS from '@semcore/ui/icon/Info/m';
import Link from '@semcore/ui/link';

function noop(e) {
  e.preventDefault();
}

const Demo = () => (
  <>
    {[0, 1, 2].map((item) => (
      <div key={item}>
        <Checkbox mb={3}>
          <Checkbox.Value />
          <Checkbox.Text>{`Note ${item + 1}`}</Checkbox.Text>
        </Checkbox>
        <Tooltip title="There is information about point." placement="right" ml={1}>
          <InfoXS color="stone" interactive aria-label="Additional info" />
        </Tooltip>
      </div>
    ))}

    {[3, 4, 5].map((item) => (
      <div key={item}>
        <Checkbox mb={3}>
          <Checkbox.Value />
          <Checkbox.Text>
            {`Note ${item + 1}`}{' '}
            <Link href="#" onClick={noop}>
              Link to somewhere
            </Link>
          </Checkbox.Text>
        </Checkbox>
      </div>
    ))}
  </>
);

export default Demo;
