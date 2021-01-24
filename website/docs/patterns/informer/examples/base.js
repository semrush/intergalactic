import React from 'react';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';

import InfoM from '@semcore/icon/lib/Info/m';
import InfoS from '@semcore/icon/lib/Info/s';
import InfoXS from '@semcore/icon/lib/Info/xs';
import InfoXXS from '@semcore/icon/lib/Info/xxs';

class Demo extends React.Component {
  render() {
    return (
      <>
        <div>
          <Text size={600}>Label</Text>
          <Tooltip title="Awesome hint text">
            <InfoM ml="4px" color="stone" cursor="help" />
          </Tooltip>
        </div>
        <div>
          <Text size={500}>Label</Text>
          <Tooltip title="Awesome hint text">
            <InfoS ml="4px" color="stone" cursor="help" />
          </Tooltip>
        </div>
        <div>
          <Text size={300}>Label</Text>
          <Tooltip title="Awesome hint text">
            <InfoXS ml="4px" color="stone" cursor="help" />
          </Tooltip>
        </div>
        <div>
          <Text size={200}>Label</Text>
          <Tooltip title="Awesome hint text">
            <InfoXXS ml="4px" color="stone" cursor="help" />
          </Tooltip>
        </div>
      </>
    );
  }
}

export default Demo;
