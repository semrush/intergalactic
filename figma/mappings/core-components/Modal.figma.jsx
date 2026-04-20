import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import MailSent from '@semcore/ui/illustration/MailSent';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';

figma.connect(
  Modal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57361-3208',
  {
    variant: { preset: 'text' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      childrenActions: figma.children('Button'),
    },
    example: ({ title, text, childrenActions }) => (
      <Modal>
        <Modal.Title mb={4}>{title}</Modal.Title>
        <Text size={200} tag='p'>
          {text}
        </Text>
        <Flex gap={2} mt={4}>
          {childrenActions}
        </Flex>
      </Modal>
    ),
  },
);

figma.connect(
  Modal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57361-3208',
  {
    variant: { preset: 'form' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      childrenActions: figma.children('Button'),
    },
    example: ({ title, text, childrenActions }) => (
      <Modal>
        <Modal.Title mb={4}>{title}</Modal.Title>
        <Text size={200} tag='p'>
          {text}
        </Text>
        <Flex gap={2} mt={4}>
          <Flex direction='column' gap={6} mb={4}>{/* Place your form here */}</Flex>
          <Flex gap={2} mt={6}>{childrenActions}</Flex>
        </Flex>
      </Modal>
    ),
  },
);

figma.connect(
  Modal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57361-3208',
  {
    variant: { preset: 'checklist' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      childrenActions: figma.children('Button'),
    },
    example: ({ title, text, childrenActions }) => (
      <Modal>
        <Modal.Title mb={4}>{title}</Modal.Title>
        <Text size={200} tag='p' mb={4}>
          {text}
        </Text>
        <Flex direction='column' gap={4}>
          {/* Place your Checkbox list here */}
          <Flex gap={2} mt={6}>{childrenActions}</Flex>
        </Flex>
      </Modal>
    ),
  },
);

figma.connect(
  Modal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57361-3208',
  {
    variant: { preset: 'illustration' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      childrenActions: figma.children('Button'),
    },
    example: ({ title, text, childrenActions }) => (
      <Modal>
        <Flex direction='column' alignItems='center'>
          <MailSent mb={4} />
          <Modal.Title mb={2}>{title}</Modal.Title>
          <Text size={300} tag='p' mb={4}>
            {text}
          </Text>
          <Flex gap={2} mt={4}>{childrenActions}</Flex>
        </Flex>
      </Modal>
    ),
  },
);

figma.connect(
  Modal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57361-3208',
  {
    variant: { preset: 'accordion' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      childrenActions: figma.children('Button'),
    },
    example: ({ title, text, childrenActions }) => (
      <Modal>
        <Modal.Title mb={4}>{title}</Modal.Title>
        <Text size={200} tag='p' mb={4}>
          {text}
        </Text>
        <Flex direction='column' mb={4}>
          {/* Place your Accordion here */}
          <Flex gap={2} mt={6}>{childrenActions}</Flex>
        </Flex>
      </Modal>
    ),
  },
);

figma.connect(
  Modal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57361-3208',
  {
    variant: { preset: 'table' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      childrenActions: figma.children('Button'),
    },
    example: ({ title, text, childrenActions }) => (
      <Modal>
        <Modal.Title mb={4}>{title}</Modal.Title>
        <Text size={200} tag='p' mb={4}>
          {text}
        </Text>
        <Flex direction='column' mb={4}>
          {/* Place your Table here */}
          <Flex gap={2} mt={6}>{childrenActions}</Flex>
        </Flex>
      </Modal>
    ),
  },
);
