import React from 'react';
import Carousel from '@semcore/carousel';
import { Box } from '@semcore/flex-box';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, text, onChange } = createGroupWidgets('Carousel');

    const navigation = bool({
      key: 'navigation',
      defaultValue: true,
      label: 'Navigation',
    });

    const dots = bool({
      key: 'dots',
      defaultValue: false,
      label: 'Dots',
    });

    const index = text({
      key: 'index',
      defaultValue: 0,
      label: 'Index',
    });

    return (
      <Box style={{ position: 'relative' }}>
        <Carousel index={index} onIndexChange={(v) => onChange(v)}>
          <Carousel.Container>
            {[...new Array(2)].map((_, ind) => (
              <Carousel.Item key={ind}>
                <Box
                  tag="img"
                  w={300}
                  h={200}
                  src="https://via.placeholder.com/300x200"
                  style={{ borderRadius: '6px' }}
                />
              </Carousel.Item>
            ))}
          </Carousel.Container>
          {dots && <Carousel.Indicators />}
          {navigation && (
            <>
              <Carousel.Prev
                style={{ position: 'absolute', top: 'calc(50% - 22px)', left: '-60px' }}
              />
              <Carousel.Next
                style={{ position: 'absolute', top: 'calc(50% - 22px)', right: '-60px' }}
              />
            </>
          )}
        </Carousel>
      </Box>
    );
  },
  {
    filterProps: ['onChange'],
  },
);
