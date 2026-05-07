import { Box, Flex } from '@semcore/ui/flex-box';
import Card from '@semcore/ui/card';
import React from 'react';

import FeedbackRatingFormExample from '../../../../../../patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form';

export type TablesProps = {
  showPrimaryAndSecondary?: boolean;
};

export function Tables({ showPrimaryAndSecondary = true }: TablesProps) {
  const [pageErrorActive, setPageErrorActive] = React.useState(false);

  return (
    <Box w='100%'>
      {showPrimaryAndSecondary && (
        <>
          {/*<PrimaryTable onPageErrorChange={setPageErrorActive} />*/}
          here should be primary table

          {!pageErrorActive && (
            <>
              <Box my={4} w='100%'>
                <FeedbackRatingFormExample />
              </Box>

              <Flex my={4} gap={4}>
                <Card w='100%'>
                  <Card.Header>
                    <Card.Title tag='h3'>Keywords</Card.Title>
                  </Card.Header>
                  <Card.Body p={0} pb={1}>
                    {/*<SecondaryTable />*/}
                    here should be secondary table
                  </Card.Body>
                </Card>
              </Flex>
            </>
          )}
        </>
      )}
    </Box>
  );
}
