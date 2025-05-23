import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import Pagination from '@semcore/pagination';

const Demo = () => {
  return (
    <Flex>
      <Box>
        <Pagination
          locale='nld'
          i18n={{
            nld: {
              prevPageLabel: 'Vorige',
              nextPageLabel: 'Volgende',
              pageInputLabel: 'Pagina:',
              totalPagesLabel: 'van',
              pagination: 'Paginering',
              firstPage: 'Eerste pagina',
              lastPage: 'Laatste pagina #{lastPageNumber}',
            },
          }}
          totalPages={123}
        />
      </Box>
    </Flex>
  );
};

export default Demo;
