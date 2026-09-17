import figma from '@figma/code-connect/react';
import FullscreenModal from '@semcore/ui/fullscreen-modal';

figma.connect(
  FullscreenModal.Header,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10976-128065',
  {
    props: {
      title: figma.textContent('↳ title'),
      description: figma.textContent('↳ description'),
    },
    example: ({ title, description }) => (
      <FullscreenModal.Header title={title} description={description} />
    ),
  },
);

figma.connect(
  FullscreenModal.Footer,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10269-107418',
  {
    props: {
      children: figma.children('Button'),
    },
    example: ({ children }) => <FullscreenModal.Footer justifyContent='center' alignItems='center' gap={3}>{children}</FullscreenModal.Footer>,
  },
);

figma.connect(
  FullscreenModal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=10269-111996',
  {
    props: {
      childrenHeader: figma.children('FullscreenModal.Header'),
      childrenFooter: figma.children('FullscreenModal.Footer'),
    },
    example: ({ childrenHeader, childrenFooter }) => (
      <FullscreenModal>
        <FullscreenModal.Close />
        <FullscreenModal.Back>{/* Add button label */}</FullscreenModal.Back>
        {childrenHeader}
        <FullscreenModal.Body>{/* content */}</FullscreenModal.Body>
        {childrenFooter}
      </FullscreenModal>
    ),
  },
);
