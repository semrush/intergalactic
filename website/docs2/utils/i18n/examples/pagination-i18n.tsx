import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import Pagination from '@semcore/ui/pagination';

const Demo = () => {
  return (
    <Flex>
      <Box>
        <Pagination
          locale='epo'
          i18n={{
            epo: {
              prevPageLabel: 'Antaŭa',
              prevPageDescription: 'Antaŭa paĝo {pageNumber}',
              nextPageLabel: 'Sekva',
              pageInputLabel: 'Paĝo:',
              totalPagesLabel: 'de',
              pagination: 'Paĝonumerado',
              firstPage: 'Unua paĝo',
              currentPage: 'Aktuala paĝo',
              confirm: 'Konfirmi paĝnumeron',
              lastPage: 'Lasta paĝo {lastPageNumber}',
              goToPage: 'Paĝo {pageNumber}',
            },
          }}
          totalPages={123}
        />
      </Box>
    </Flex>
  );
};

export default Demo;
