import figma from '@figma/code-connect/react';
import FullscreenModal from '@semcore/ui/fullscreen-modal';

figma.connect(
  FullscreenModal.Header,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55370-5962&t=tjfdRa8KRbX0lwpz-11',
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
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55370-5963&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      children: figma.children('Button'),
    },
    example: ({ children }) => <FullscreenModal.Footer justifyContent='center' alignItems='center' gap={3}>{children}</FullscreenModal.Footer>,
  },
);

figma.connect(
  FullscreenModal,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55370-5832&t=tjfdRa8KRbX0lwpz-11',
  {
    variant: { 'dual-zone': 'false' },
    props: {
      childrenHeader: figma.children('FullscreenModal.Header'),
      childrenFooter: figma.children('FullscreenModal.Footer'),
    },
    example: ({ childrenHeader, childrenFooter }) => <FullscreenModal>
        <FullscreenModal.Close />
        <FullscreenModal.Back>{/* Add button label */}</FullscreenModal.Back>{childrenHeader}
        <FullscreenModal.Body>{/* content */}</FullscreenModal.Body>
        {childrenFooter}
  </FullscreenModal>,
  },
);

figma.connect(
    FullscreenModal,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55370-5832&t=tjfdRa8KRbX0lwpz-11',
    {
      variant: { 'dual-zone': 'true' },
      props: {
        childrenHeader: figma.children('FullscreenModal.Header'),
        childrenFooter: figma.children('FullscreenModal.Footer'),
      },
      example: ({ childrenHeader, childrenFooter }) => <FullscreenModal>
          <FullscreenModal.Close />
          <FullscreenModal.Back>{/* Add button label */}</FullscreenModal.Back>{childrenHeader}
          <FullscreenModal.Body>
            <FullscreenModal.Section>{/* content */}</FullscreenModal.Section>
            <FullscreenModal.Section>{/* content */}</FullscreenModal.Section>
          </FullscreenModal.Body>
          {childrenFooter}
    </FullscreenModal>,
    },
  );