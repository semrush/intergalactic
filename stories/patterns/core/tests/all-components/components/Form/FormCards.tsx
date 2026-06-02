import { Flex } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { ArticleLaunchForm } from './ArticleLaunchForm';
import { CardBodySkeleton } from './CardBodySkeleton';
import type { FormTabColumnStyle } from './form-utils';
import { RequestForm } from './RequestForm';
import HeadingTagAccordion from '../../../../../../components/accordion/docs/examples/heading_tag';
import NonCompactAccordion from '../../../../../../components/accordion/docs/examples/non_compact';
import BulkTextareaBasicExample from '../../../../../../components/bulk-textarea/docs/examples/basic-usage';
import CarouselStory from '../../../../../../components/carousel/docs/examples/carousel_with_default_indicators';
import { PaywallMessage } from '../../../../advanced/components/Components/PaywallMessage';

type FormCardsProps = {
  columnStyle: FormTabColumnStyle;
  contentReady: boolean;
};

export function FormCards({ columnStyle, contentReady }: FormCardsProps) {
  return (
    <>
      <Flex direction='column' gap={4} style={columnStyle}>
        <RequestForm mt={0} contentReady={contentReady} />
        <Card w='100%'>
          <Card.Header>
            <Card.Title innerHint='Schedule, channels, and visuals before publish'>
              Article content launch
            </Card.Title>
          </Card.Header>
          <Card.Body tag={Flex} direction='column' gap={6}>
            <CardBodySkeleton contentReady={contentReady} h={560}>
              <ArticleLaunchForm />
            </CardBodySkeleton>
          </Card.Body>
        </Card>
      </Flex>

      <Flex direction='column' gap={4} style={columnStyle}>
        <Card w='100%'>
          <Card.Header>
            <Card.Title tag='h3'>FAQ</Card.Title>
          </Card.Header>
          <Card.Body tag={Flex} direction='column'>
            <CardBodySkeleton contentReady={contentReady} h={200}>
              <NonCompactAccordion />
              <Text size={300} my={3} semibold>
                Accordion with heading tag
              </Text>
              <HeadingTagAccordion />
            </CardBodySkeleton>
          </Card.Body>
        </Card>

        <Card w='100%'>
          <Card.Body tag={Flex} gap={4} alignItems='flex-start'>
            <CardBodySkeleton contentReady={contentReady} h={160}>
              <CarouselStory />
            </CardBodySkeleton>
          </Card.Body>
        </Card>

        <Card w='100%'>
          <Card.Body tag={Flex} direction='column'>
            <CardBodySkeleton contentReady={contentReady} h={320}>
              <BulkTextareaBasicExample />
            </CardBodySkeleton>
          </Card.Body>
        </Card>
        <Card w='100%'>
          <Card.Body tag={Flex} direction='column'>
            <CardBodySkeleton contentReady={contentReady} h={320}>
              <PaywallMessage />
            </CardBodySkeleton>
          </Card.Body>
        </Card>
      </Flex>
    </>
  );
}
