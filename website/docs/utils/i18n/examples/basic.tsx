import { Box, Flex } from '@semcore/ui/base-components';
import Pagination from '@semcore/ui/pagination';
import React from 'react';

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
