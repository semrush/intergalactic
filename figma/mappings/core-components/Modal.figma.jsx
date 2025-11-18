import figma from '@figma/code-connect/react';
import Modal from '@semcore/ui/modal';

figma.connect(
  Modal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10142-188594&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      title: figma.textContent('↳ title'),
      // children: figma.children('*'),
    },
    example: ({ title }) => <Modal>
    <Modal.Title mb={4}>{title}</Modal.Title>
    {/* Place content here */}
  </Modal>,
  },
);