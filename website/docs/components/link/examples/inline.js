import React from 'react';
import FormatText from '@semcore/format-text';
import Link from '@semcore/link';
import EditXS from '@semcore/icon/lib/Edit/m';

class Demo extends React.PureComponent {
  render() {
    return (
      <FormatText>
        <p>
          Lorem ipsum dolor sit amet, adipisicing elit. Ab aperiam aut autem beatae, consequuntur
          debitis doloremque facilis fuga illum inventore ipsa iure magni maxime molestias omnis
          reprehenderit, voluptas voluptatem voluptates{' '}
          <Link>
            <Link.Addon tag={EditXS} />
            <Link.Text>consectetur corporis cupiditate</Link.Text>
          </Link>
          .
        </p>
        <p>
          Atque beatae commodi culpa dicta nam odit rerum{' '}
          <Link>
            suscipit temporibus! Accusamus accusantium assumenda beatae dignissimos eius id nam{' '}
          </Link>{' '}
          quae repellendus temporibus voluptatibus. Ad cum error excepturi, ipsum necessitatibus
          officiis temporibus.
        </p>
        <p>
          Commodi consequuntur dolorum id maiores maxime, natus nesciunt nihil odit sapiente sequi!
          Blanditiis dicta ea, eum excepturi explicabo hic id, incidunt ipsum itaque molestias neque
          officia placeat rerum sint, veritatis.
        </p>
        <p>
          Distinctio doloremque eaque eos fugiat incidunt iure magni officia praesentium quidem{' '}
          <Link>repudiandae tempora, voluptate, voluptatem voluptatibus!</Link> Enim exercitationem
          id labore sunt totam velit. Ab animi provident quo quos tenetur voluptatem.
        </p>
      </FormatText>
    );
  }
}

export default Demo;
