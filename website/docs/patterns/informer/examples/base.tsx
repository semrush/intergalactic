import React from 'react';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';

import InfoM from '@semcore/ui/icon/Info/m';
import InfoL from '@semcore/ui/icon/Info/l';

class Demo extends React.Component {
  render() {
    return (
      <>
        <div>
          <Text size={700}>Label</Text>
          <Tooltip title='Awesome hint text'>
            <InfoL ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <Text size={600}>Label</Text>
          <Tooltip title='Awesome hint text'>
            <InfoL ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <Text size={500}>Label</Text>
          <Tooltip title='Awesome hint text'>
            <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <div>
            <Text size={400}>Label</Text>
            <Tooltip title='Awesome hint text'>
              <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
            </Tooltip>
          </div>
          <div />
          <Text size={300}>Label</Text>
          <Tooltip title='Awesome hint text'>
            <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <Text size={200}>Label</Text>
          <Tooltip title='Awesome hint text'>
            <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <Text size={100}>Label</Text>
          <Tooltip title='Awesome hint text'>
            <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
      </>
    );
  }
}

export default Demo;
