import React from 'react';

import Pagination from '@semcore/pagination';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { onChange, text } = createGroupWidgets('Pagination');

    const currentPage = text({
      key: 'currentPage',
      defaultValue: 1,
      label: 'CurrentPage',
    });

    const totalPages = text({
      key: 'totalPages',
      defaultValue: 122360,
      label: 'TotalPages',
    });

    return (
      <Pagination
        currentPage={currentPage}
        onCurrentPageChange={(value) => onChange('currentPage', value)}
        totalPages={totalPages}
      />
    );
  },
  {
    filterProps: ['onChange'],
  },
);
