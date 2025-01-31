import React from 'react';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import Skeleton from '@semcore/skeleton';

const Demo = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <Flex role='status' aria-live='polite'>
        {!loading && (
          <Text size={200}>
            The Egyptian pyramids are ancient masonry structures located in Egypt. Sources cite at
            least 118 identified "Egyptian" pyramids. Approximately 80 pyramids were built within
            the Kingdom of Kush, now located in the modern country of Sudan.
          </Text>
        )}
        <Skeleton hidden={!loading} h={60}>
          <Skeleton.Text amount={2} />
          <Skeleton.Text y='40' width='60%' />
        </Skeleton>
      </Flex>
      <Button onClick={() => setLoading(!loading)} mt={3}>
        {loading ? 'Stop loading' : 'Start loading'}
      </Button>
    </>
  );
};

export default Demo;
