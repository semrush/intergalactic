import React from 'react';
import Link from '@semcore/ui/link';

class Demo extends React.PureComponent {
  render() {
    return (
      <div>
        <Link color='red-500' href='#' size='300'>
          Warning link
        </Link>
        <br />
        <br />
        <Link color='green-500' href='#' size='300'>
          Success link
        </Link>
      </div>
    );
  }
}

export default Demo;
