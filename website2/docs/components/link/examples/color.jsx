import React from 'react';
import Link from '@semcore/link';

class Demo extends React.PureComponent {
  render() {
    return (
      <div>
        <Link color="orange">Warning link</Link>
        <br />
        <br />
        <Link color="green">Success link</Link>
      </div>
    );
  }
}

export default Demo;
