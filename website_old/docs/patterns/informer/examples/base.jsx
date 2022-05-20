import React from 'react';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';

import InfoM from '@semcore/icon/Info/m';
import InfoL from '@semcore/icon/Info/l';

class Demo extends React.Component {
  render() {
    return (
      <>
        <div>
          <Text size={600}>Label</Text>
          <Tooltip title="Awesome hint text">
            <InfoL ml="4px" color="stone" cursor="help" />
          </Tooltip>
        </div>
        <div>
          <Text size={500}>Label</Text>
          <Tooltip title="Awesome hint text">
            <InfoM ml="4px" color="stone" cursor="help" />
          </Tooltip>
        </div>
        <div>
          <Text size={300}>Label</Text>
          <Tooltip title="Awesome hint text">
            <InfoM ml="4px" color="stone" cursor="help" />
          </Tooltip>
        </div>
        <div>
          <Text size={200}>Label</Text>
          <Tooltip title="Awesome hint text">
            <InfoM ml="4px" color="stone" cursor="help" />
          </Tooltip>
        </div>
      </>
    );
  }
}

export default Demo;
