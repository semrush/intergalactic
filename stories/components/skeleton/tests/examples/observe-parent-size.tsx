import Button from '@semcore/button';
import Skeleton from '@semcore/skeleton';
import React from 'react';

const Demo = () => {
  const [wide, setWide] = React.useState(false);

  return (
    <>
      <Button onClick={() => setWide(!wide)}>
        {wide ? 'Narrow' : 'Expand'}
      </Button>

      <div
        style={{
          background: 'lightgray',
          transition: 'width 0.5s',
          width: wide ? '100%' : '200px',
          marginTop: 20,
        }}
      >
        <Skeleton theme='invert' observeParentSize={true}>
          <Skeleton.Text h={20} />
        </Skeleton>

        <Skeleton theme='invert' w={300}>
          <Skeleton.Text h={20} />
        </Skeleton>
      </div>
    </>
  );
};

export default Demo;
