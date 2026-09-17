import figma from '@figma/code-connect';
import Pagination from '@semcore/ui/pagination';
import Select from '@semcore/ui/select';

figma.connect(
  Pagination,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10270-109137',
  {
    variant: { 'select (# of rows)': false },
    props: {
      size: figma.enum('size', { L: 'l' }),
    },
    example: (p) => (
      <Pagination
        size={p.size}
        currentPage={/* number */}
        totalPages={/* number */}
      />
    ),
  });

figma.connect(
  Pagination,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10270-109137',
  {
    variant: { 'select (# of rows)': true },
    props: {
      size: figma.enum('size', { L: 'l' }),
      ml: figma.enum('size', { M: 4, L: 5 }),
    },
    example: (p) => (
      <Pagination
        size={p.size}
        currentPage={/* number */}
        totalPages={/* number */}
      >
        <Pagination.FirstPage />
        <Pagination.PrevPage />
        <Pagination.NextPage />
        <Pagination.PageInput />
        <Pagination.TotalPages />
        <Select
          {...p}
          options={/* options */}
          value={/* current value */}
        />
      </Pagination>
    ),
  });
