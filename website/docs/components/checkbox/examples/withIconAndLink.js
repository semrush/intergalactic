import React from 'react';
import Checkbox from '@semcore/checkbox';
import Tooltip from '@semcore/tooltip';
import InfoXS from '@semcore/icon/lib/Info/xs';
import Link from '@semcore/link';

function noop(e) {
  e.preventDefault();
}

const Demo = () => (
  <>
    {[0, 1, 2].map((item) => (
      <div key={item}>
        <Checkbox mb={2}>
          <Checkbox.Value />
          <Checkbox.Text>{`Пункт ${item + 1}`}</Checkbox.Text>
        </Checkbox>
        <Tooltip title="There is information about point." placement="right" ml={1}>
          <InfoXS color="stone" interactive />
        </Tooltip>
      </div>
    ))}

    {[3, 4, 5].map((item) => (
      <div key={item}>
        <Checkbox mb={2}>
          <Checkbox.Value />
          <Checkbox.Text>
            {`Пункт ${item + 1}`} <Link onClick={noop}>Link to somewhere</Link>
          </Checkbox.Text>
        </Checkbox>
      </div>
    ))}
  </>
);

export default Demo;
