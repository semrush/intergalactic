import React from 'react';
import Link from '@semcore/ui/link';

class Demo extends React.PureComponent {
  render() {
    return (
      <div>
        <Link color="orange" href="#">
          Warning link
        </Link>
        <br />
        <br />
        <Link color="green" href="#">
          Success link
        </Link>
      </div>
    );
  }
}

export default Demo;
