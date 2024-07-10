import React from 'react';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';
import Skeleton from 'intergalactic/skeleton';

const Demo = () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Flex gap={2} mb={3}>
        <Button onClick={() => setLoading(true)}>Load data</Button>
        <Button onClick={() => setLoading(false)}>Stop loading</Button>
      </Flex>
      <Flex role='status' aria-live='polite' h={80}>
        {!loading && (
          <Text size={200}>
            The Egyptian pyramids are ancient masonry structures located in Egypt. Sources cite at
            least 118 identified "Egyptian" pyramids. Approximately 80 pyramids were built within
            the Kingdom of Kush, now located in the modern country of Sudan.
          </Text>
        )}
        <Skeleton hidden={!loading}>
          <Skeleton.Text amount={2} />
          <Skeleton.Text y='40' width='60%' />
        </Skeleton>
      </Flex>
    </>
  );
};

export default Demo;
