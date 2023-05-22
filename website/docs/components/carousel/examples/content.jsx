import React, { useState } from 'react';
import { Text } from '@semcore/ui/typography';
import Carousel from '@semcore/ui/carousel';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Open Carousel</Button>
      <Modal visible={visible} onClose={() => setVisible(false)} w={664}>
        <Carousel autoFocus tabIndex={1}>
          <Carousel.Container>
            {[1, 2].map((_, ind) => (
              <Carousel.Item key={ind}>
                <Text size={500} mb={4} bold tag="h4">
                  Heading
                </Text>
                <Text>
                  Gregor Samsa wakes up one morning to find himself transformed into a "monstrous
                  vermin". He initially considers the transformation to be temporary and slowly
                  ponders the consequences of this metamorphosis. Unable to get up and leave the
                  bed, Gregor reflects on his job as a traveling salesman and cloth merchant, which
                  he characterizes as being full of "temporary and constantly changing human
                  relationships, which never come from the heart". He sees his employer as a despot
                  and would quickly quit his job had he not been his family's sole breadwinner and
                  working off his bankrupt father's debts. While trying to move, Gregor finds that
                  his office manager, the chief clerk, has shown up to check on him, indignant about
                  Gregor's unexcused absence. Gregor attempts to communicate with both the manager
                  and his family, but all they can hear from behind the door is incomprehensible
                  vocalizations. Gregor laboriously drags himself across the floor and opens the
                  door. The manager, upon seeing the transformed Gregor, flees the apartment.
                  Gregor's family is horrified, and his father drives him back into his room under
                  the threat of violence.
                </Text>
              </Carousel.Item>
            ))}
          </Carousel.Container>
          <Carousel.Prev position="absolute" h="100%" w={48} left="-48px" />
          <Carousel.Next position="absolute" h="100%" w={48} right="-48px" />
        </Carousel>
      </Modal>
    </>
  );
};

export default Demo;
