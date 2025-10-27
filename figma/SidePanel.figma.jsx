import figma from '@figma/code-connect/react';
import SidePanel from '@semcore/ui/side-panel';

figma.connect(
  SidePanel.Header,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55411-1711&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      title: figma.textContent('↳ title'),
    },
    example: ({title}) => <SidePanel.Header>
    <SidePanel.Back>{/* Add button label */}</SidePanel.Back>
    <SidePanel.Title>{title}</SidePanel.Title>
  </SidePanel.Header>,
  },
);

figma.connect(
  SidePanel.Footer,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55411-1714&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      children: figma.children('Button'),
    },
    example: ({children}) => <SidePanel.Footer justifyContent='center' pt={2}>{children}</SidePanel.Footer>,
  },
);

figma.connect(
  SidePanel,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55411-1724&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
        childrenHeader: figma.children('SidePanel.Header'),
        childrenFooter: figma.children('SidePanel.Footer'),
    },
    example: ({ childrenHeader, childrenFooter }) => <SidePanel aria-label='{/* Add your aria-label */}'>
        <SidePanel.Close />
        <SidePanel.Back>{/* Add button label */}</SidePanel.Back>{childrenHeader}
        <SidePanel.Body>{/* content */}</SidePanel.Body>
        {childrenFooter}
  </SidePanel>,
  },
);