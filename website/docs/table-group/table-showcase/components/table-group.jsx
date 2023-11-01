import React from 'react';
import ComponentCard from '@docs/../src/components/ComponentCard';
import { getImageName } from '@docs/../src/pages/Home';

const group = {
  accordion: {
    title: 'Accordion',
    route: '/table-group/table-controls/#accordion',
    disabled: false,
    type: 'table',
  },
  checkboxes: {
    title: 'Checkboxes',
    route: '/table-group/table-controls/#checkboxes',
    disabled: false,
    type: 'table',
  },
  resizing: {
    title: 'Columns resizing',
    route: '/table-group/table-controls/#columns_resizing',
    disabled: false,
    type: 'table',
  },
  editing: {
    title: 'Editing and adding content',
    route: '/table-group/table-controls/#editing_and_adding_content',
    disabled: false,
    type: 'table',
  },
  highlighting: {
    title: 'Highlighting content',
    route: '/table-group/table-controls/#highlighting_content',
    disabled: false,
    type: 'table',
  },
  links: {
    title: 'Internal and external links',
    route: '/table-group/table-controls/#internal_and_external_links',
    disabled: false,
    type: 'table',
  },
  linksLong: {
    title: 'Long links and text',
    route: '/table-group/table-controls/#long_links_and_text',
    disabled: false,
    type: 'table',
  },
  pagination: {
    title: 'Pagination',
    route: '/table-group/table-controls/#pagination',
    disabled: false,
    type: 'table',
  },
  sorting: {
    title: 'Sorting',
    route: '/table-group/table-controls/#sorting',
    disabled: false,
    type: 'table',
  },
  actionsRow: {
    title: 'Status and actions row',
    route: '/table-group/table-controls/#status_and_actions_row',
    disabled: false,
    type: 'table',
  },
  empty: {
    title: 'Empty table',
    route: '/table-group/table-states/#empty_table',
    disabled: false,
    type: 'table',
  },
  loading: {
    title: 'Loading',
    route: '/table-group/table-states/#loading',
    disabled: false,
    type: 'table',
  },
  noData: {
    title: 'No data',
    route: '/table-group/table-states/#no_data',
    disabled: false,
    type: 'table',
  },
  nothingFound: {
    title: 'Nothing found',
    route: '/table-group/table-states/#nothing_found',
    disabled: false,
    type: 'table',
  },
  progressbar: {
    title: 'Progressbar',
    route: '/table-group/table-states/#progressbar',
    disabled: false,
    type: 'table',
  },
  skeleton: {
    title: 'Skeleton',
    route: '/table-group/table-states/#skeleton',
    disabled: false,
    type: 'table',
  },
  error: {
    title: 'Something went wrong',
    route: '/table-group/table-states/#something_went_wrong',
    disabled: false,
    type: 'table',
  },
};

const styles = `
  .table-group-grid {
    display: grid;
    grid-template-rows: max-content;
    grid-template-columns: repeat(auto-fill, 176px);
    grid-gap: 12px 12px;
    width: 100%;
    margin: 0;
    margin-top: 12px;
    padding: 0;
  }
`;

export default function (props) {
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const items = props.group.map((el) => group[el]);

  return (
    <div className='table-group-grid'>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </div>
  );
}
