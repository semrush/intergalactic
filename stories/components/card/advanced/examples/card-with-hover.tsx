import { Box, Flex } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export default function CardWithHoverExample() {
  return (
    <>
      <style>
        {`
        .card-test-hover-shadow {
          transition: box-shadow var(--intergalactic-duration-control, 200ms) ease;
        }
        .card-test-hover-shadow:hover {
          box-shadow: var(--intergalactic-box-shadow-card-hover);
        }

        .card-test-hover-dnd {
          cursor: grab;
          transition: box-shadow var(--intergalactic-duration-control, 200ms) ease;
          box-shadow: var(--intergalactic-box-shadow-card);
        }
        .card-test-hover-dnd:hover {
          box-shadow: var(--intergalactic-box-shadow-dnd);
        }
        .card-test-hover-dnd:active {
          cursor: grabbing;
          box-shadow: var(--intergalactic-box-shadow-dnd);
        }

        .card-test-hover-float-control {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          min-height: var(--intergalactic-form-control-m, 28px);
          padding: 0 var(--intergalactic-spacing-2x, 8px);
          border: 1px solid var(--intergalactic-border-secondary, #c4c7cf);
          border-radius: var(--intergalactic-control-rounded, 6px);
          font-size: var(--intergalactic-fs-200, 14px);
          font-weight: var(--intergalactic-medium, 500);
          line-height: var(--intergalactic-lh-200, 142%);
          color: var(--intergalactic-text-primary, #191b23);
          background-color: var(--intergalactic-control-primary-invert, #ffffff);
          box-shadow: var(--intergalactic-box-shadow-float-control);
          cursor: default;
          transition:
            box-shadow var(--intergalactic-duration-control, 200ms) ease,
            background-color var(--intergalactic-duration-control, 200ms) ease;
        }
        .card-test-hover-float-control:hover {
          background-color: var(--intergalactic-control-primary-invert, #ffffff);
          box-shadow: var(--intergalactic-box-shadow-float-control-hover);
        }
      `}
      </style>
      <Box>
        <Flex direction='column' gap={4} alignItems='flex-start' w='100%'>
          <Card
            tag='section'
            className='card-test-hover-shadow'
            w='100%'
            wMax={520}
            aria-label='Card with hover shadow'
          >
            <Card.Header>
              <Card.Title tag='h3'>Card hover shadow</Card.Title>
            </Card.Header>
            <Card.Body pt={4}>
              <Text size={200} color='text-secondary'>
                Hover the card — shadow switches to
                {' '}
                <Text tag='span' fontWeight={600} color='text-primary'>
                  --intergalactic-box-shadow-card-hover
                </Text>
                .
              </Text>
            </Card.Body>
          </Card>

          <Card
            tag='section'
            className='card-test-hover-dnd'
            w='100%'
            wMax={520}
            aria-label='Card with drag cursor and DnD shadow'
          >
            <Card.Header>
              <Card.Title tag='h3'>Card DnD shadow</Card.Title>
            </Card.Header>
            <Card.Body pt={4}>
              <Text size={200} color='text-secondary'>
                Cursor
                {' '}
                <Text tag='span' fontWeight={600} color='text-primary'>
                  grab
                </Text>
                {' / '}
                <Text tag='span' fontWeight={600} color='text-primary'>
                  grabbing
                </Text>
                ; on hover and active, shadow uses
                {' '}
                <Text tag='span' fontWeight={600} color='text-primary'>
                  --intergalactic-box-shadow-dnd
                </Text>
                .
              </Text>
            </Card.Body>
          </Card>

          <Flex w='100%' wMax={520}>
            <Box tag='div' className='card-test-hover-float-control' aria-label='Float control'>
              Float control
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
