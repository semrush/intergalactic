import React from 'react';
import { Box, Flex } from 'intergalactic/flex-box';
import Pagination from 'intergalactic/pagination';

const Demo = () => {
  return (
    <Flex>
      <Box>
        <Pagination
          locale='nld'
          i18n={{
            nld: {
              prevPageLabel: 'Vorige',
              prevPageDescription: 'Vorige pagina {pageNumber}',
              nextPageLabel: 'Volgende',
              nextPageDescription: 'Volgende pagina {pageNumber}',
              pageInputLabel: 'Pagina:',
              totalPagesLabel: 'van',
              pagination: 'Paginering',
              firstPage: 'Eerste pagina',
              currentPage: 'Huidige pagina',
              confirm: 'Bevestig paginanummer',
              lastPage: 'Laatste pagina #{lastPageNumber}',
              goToPage: 'Pagina {pageNumber}',
            },
          }}
          totalPages={123}
        />
      </Box>
    </Flex>
  );
};

export default Demo;
