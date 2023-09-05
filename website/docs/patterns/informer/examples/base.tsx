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
          <Text size={700}>Text</Text>
          <Tooltip title='Awesome hint text'>
            <InfoL ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <Text size={600}>Text</Text>
          <Tooltip title='Awesome hint text'>
            <InfoL ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <Text size={500}>Text</Text>
          <Tooltip title='Awesome hint text'>
            <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <div>
            <Text size={400}>Text</Text>
            <Tooltip title='Awesome hint text'>
              <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
            </Tooltip>
          </div>
          <div />
          <Text size={300}>Text</Text>
          <Tooltip title='Awesome hint text'>
            <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <Text size={200}>Text</Text>
          <Tooltip title='Awesome hint text'>
            <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
        <div>
          <Text size={100}>Text</Text>
          <Tooltip title='Awesome hint text'>
            <InfoM ml='4px' color='gray-300' cursor='help' tabIndex={0} />
          </Tooltip>
        </div>
      </>
    );
  }
}
