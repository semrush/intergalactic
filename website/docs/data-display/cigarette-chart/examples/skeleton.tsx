import React from 'react';
import Skeleton from '@semcore/skeleton';

class Demo extends React.PureComponent {
  render() {
    return (
      <Skeleton>
        <Skeleton.Text height={24} />
      </Skeleton>
    );
  }
}

export default Demo;
