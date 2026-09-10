import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import MailSent from '@semcore/ui/illustration/MailSent';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';

figma.connect(
  Modal,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=17095-22543&',
  {
    variant: { type: 'modal window' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      actions: figma.children('Button'),
    },
    example: ({ title, text, actions }) => (
      <Modal>
        <MailSent />
        <Modal.Title mt={6}>{title}</Modal.Title>
        <Text size={200} tag='p'>
          {text}
        </Text>
        <Flex gap={2} mt={6}>{actions}</Flex>
      </Modal>
    ),
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=17095-22543&',
  {
    variant: { type: 'message' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      actions: figma.children('Button'),
    },
    example: ({ title, text, actions }) => (
      <Flex direction='column'>
        <MailSent />
        <Text mb={2} mt={6} size={400} bold>{title}</Text>
        <Text size={200} tag='p'>
          {text}
        </Text>
        <Flex gap={2} mt={6}>{actions}</Flex>
      </Flex>
    ),
  },
);
