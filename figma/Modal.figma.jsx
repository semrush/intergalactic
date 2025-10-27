import figma from '@figma/code-connect/react';
import Modal from '@semcore/ui/modal';

// I think we don't need to add Modal.Overlay

figma.connect(
  Modal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55346-1714&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      title: figma.textContent('↳ title'),
      children: figma.children('{ Text }'),
    },
    example: ({ title, children }) => <Modal>
    <Modal.Title mb={4}>{title}</Modal.Title>
    {children}
  </Modal>,
  },
);