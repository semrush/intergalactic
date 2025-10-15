import figma from '@figma/code-connect/react';
import Breadcrumbs from '@semcore/ui/breadcrumbs';

figma.connect(
  Breadcrumbs,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11878-115146&t=Q0bSsRErIQ7IEZAU-11',
  {
    variant: { 'folder': 'true' },
    props: {
      homeLink: figma.nestedProps('Home link', {
        label: figma.textContent('↳ text'),
      }),
      folderLink: figma.nestedProps('Folder link', {
        label: figma.textContent('↳ text'),
      }),
      productLink: figma.nestedProps('Product link', {
        label: figma.textContent('↳ text'),
      }),
    },
    example: ({ homeLink, folderLink, productLink }) => (
      <Breadcrumbs>
        <Breadcrumbs.Item href='#'>{homeLink.label}</Breadcrumbs.Item>
        <Breadcrumbs.Item href='#'>{folderLink.label}</Breadcrumbs.Item>
        <Breadcrumbs.Item href='#' active>{productLink.label}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
  },
);

figma.connect(
  Breadcrumbs,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11878-115146&t=Q0bSsRErIQ7IEZAU-11',
  {
    variant: { 'folder': 'false' },
    props: {
      homeLink: figma.nestedProps('Home link', {
        label: figma.textContent('↳ text'),
      }),
      productLink: figma.nestedProps('Product link', {
        label: figma.textContent('↳ text'),
      }),
    },
    example: ({ homeLink, productLink }) => (
      <Breadcrumbs>
        <Breadcrumbs.Item href='#'>{homeLink.label}</Breadcrumbs.Item>
        <Breadcrumbs.Item href='#' active>{productLink.label}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
  },
);