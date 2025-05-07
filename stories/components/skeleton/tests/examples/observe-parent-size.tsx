import React from 'react';
import Skeleton from '@semcore/skeleton';
import Button from '@semcore/button';

const Demo = () => {
  const [wide, setWide] = React.useState(false);

  return (
    <>
      <Button onClick={() => setWide(!wide)}>
        {wide ? 'Сузить' : 'Расширить'}
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
