import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';

figma.connect(
  Modal,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=5771-181110&',
  {
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      actions: figma.children('Button'),
    },
    example: ({ title, text, actions }) => (
      <Modal>
        <Modal.Title mb={2}>{title}</Modal.Title>
        <Text size={200} tag='p'>
          {text}
        </Text>
        <Flex gap={2} mt={4}>{actions}</Flex>
      </Modal>
    ),
  },
);

figma.connect(
  Modal,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=5771-181110&',
  {
    variant: { case: 'Delete project' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      list: figma.children('List'),
      actions: figma.children('Button'),
    },
    example: ({ title, text, list, actions }) => (
      <Modal>
        <Modal.Title mb={2}>{title}</Modal.Title>
        <Text size={200} tag='p'>
          {text}
        </Text>
        {list}
        {/* Add input for confirmation, refer to the documentation for Confirmation modal dialog */}
        <Flex gap={2} mt={4}>{actions}</Flex>
      </Modal>
    ),
  },
);
