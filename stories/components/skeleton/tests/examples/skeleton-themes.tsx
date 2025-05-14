import React from 'react';
import Skeleton from '@semcore/skeleton';

const Demo = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <>
     <div style={{ background: 'black' }}>
      <Skeleton h={100} theme = 'dark' duration={3000}>
        <Skeleton.Text h={50} />
      </Skeleton>
      </div>
      <Skeleton h={100} theme = 'invert'>
        <Skeleton.Text h={50} />
      </Skeleton>

      <div style={{ background: 'black' }}>
          <Skeleton height={48} theme='dark'>
            <Skeleton.Text amount={2} />
            <Skeleton.Text y='40' width='60%' />
          </Skeleton>
        </div>

        <div style={{ background: 'blue' }}>
          <Skeleton height={48} theme='invert'>
            <Skeleton.Text amount={2} />
            <Skeleton.Text y='40' width='60%' />
          </Skeleton>
        </div>
    </>
  );
};

export default Demo;
