import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';
import { IntlProvider } from 'react-intl';

import type { AccordionInTableProps } from './table_perf/table_perf';
import { accordionInsideTableDefaultProps, cols, componentsMap, DEFAULT_LOCALE, DEFAULT_MESSAGES, data, refsMap } from './table_perf/table_perf';

const data2 = Array.from({ length: 1000 }, (_, r) => {
  const index = r % data.length;

  const d = Object.entries(data[index]).reduce<Record<string, any>>((acc, [key, value]) => {
    if (key === 'payment_intent_id') {
      acc[key] = `${r}__${value}`;
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});

  return d;
});

const Demo = (demoProps: AccordionInTableProps) => {
  const cropPos = demoProps.cropPosition ?? 'middle';

  return (
    <IntlProvider
      locale={DEFAULT_LOCALE}
      defaultLocale={DEFAULT_LOCALE}
      messages={DEFAULT_MESSAGES}
    >
      <DataTable
        loading={demoProps.loading}
        data={data2}
        aria-label='big-big table with virtualScroll'
        defaultGridTemplateColumnWidth='1fr'
        columns={cols}
        w='calc(100vw - 50px)'
        h={500}
        headerProps={{ sticky: true }}
        virtualScroll={{ rowHeight: 45 }}
        renderCell={(props) => {
          const parentRowIndex = props.rowIndex;

          if (parentRowIndex === 0 && props.columnName === ACCORDION) {
            return {
              p: 0, // set empty paddings for the first accordion
              children: props.defaultRender(),
            };
          }

          if (props.dataKey === 'description_ellipsis') {
            return {
              children: (
                <Text
                  ellipsis:cropPosition={cropPos}
                  hint={demoProps.hintProps}
                >
                  {String(props.row.payment_description)}
                </Text>
              ),
            };
          }

          // @ts-ignore
          const Component = componentsMap[props.columnName];
          if (Component) {
            return {
              children: <Component value={props.value} row={props.row} cellProps={props} headerRef={refsMap[props.columnName]} cropPosition={cropPos} hintProps={demoProps.hintProps} />,
            };
          }

          return {
            children: <Text>{props.value}</Text>,
          };
        }}
      />
    </IntlProvider>
  );
};

Demo.defaultProps = accordionInsideTableDefaultProps;

export default Demo;
