import { Chart } from '@semcore/d3-chart';
import AddFilter from '@semcore/ui/add-filter';
import { Box } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import type { SelectValue } from '@semcore/ui/select';
import Select from '@semcore/ui/select';
import React from 'react';

const defaultFilterData = {
  size: '',
  Color: '',
};

type FilterKeys = keyof typeof defaultFilterData;
type FilterData = Record<FilterKeys, string>;

const sizes = ['Small', 'Medium', 'Large'];
const colors = ['Blue', 'Green', 'Yellow'];

const filters: Array<{ name: FilterKeys; values: string[] }> = [
  {
    name: 'Color',
    values: colors,
  },
];

const Demo = () => {
  const [filterData, setFilterData] =
          React.useState<FilterData>(defaultFilterData);
  const [visibleFilters, setVisibleFilters] = React.useState<string[]>([]);
  const [visible, setVisible] = React.useState<Record<FilterKeys, boolean>>({
    size: false,
    Color: false,
  });

  const updateFilterData = (value: string, name: string) => {
    if (name === 'Color') {
      const newVisibleFilters = new Set(visibleFilters);
      newVisibleFilters.add('Color');
      setVisibleFilters(Array.from(newVisibleFilters));
      setVisible({
        size: false,
        Color: false,
      });
    }

    setFilterData((prevData) => {
      return { ...prevData, ...{ [name]: value } };
    });
  };

  const clearField = React.useCallback(
    (name: keyof FilterData) => {
      const tempData = { ...filterData, [name]: '' };
      setFilterData(tempData);
    },
    [filterData],
  );

  const handleVisible = React.useCallback((key: FilterKeys) => (visible: boolean) => {
    setVisible((prevVisible) => {
      return {
        ...prevVisible,
        [key]: visible,
      };
    });
  }, [visible, setVisible]);

  const handleVisibleFiltersChange = React.useCallback((newVisibleFilters: string[]) => {
    const visibleFiltersSet = new Set(visibleFilters);
    if (newVisibleFilters.length > visibleFiltersSet.size) {
      const newVisibleFilter = newVisibleFilters.find((key) => !visibleFiltersSet.has(key));

      if (newVisibleFilter) {
        setVisible((prevState) => {
          return {
            ...prevState,
            [newVisibleFilter]: true,
          };
        });
      }
    }

    setVisibleFilters(newVisibleFilters);
  }, [visibleFilters]);

  return (
    <Box>
      <AddFilter
        filterData={filterData}
        onClearAll={() => {
          setFilterData(defaultFilterData);
        }}
        gap={2}
        flexWrap
        visibleFilters={visibleFilters}
        onVisibleFiltersChange={handleVisibleFiltersChange}
      >
        <Select
          value={filterData.size}
          onChange={(v: string) => updateFilterData(v, 'size')}
        >
          <Select.Trigger
            empty={!filterData.size}
            placeholder='Size'
            tag={FilterTrigger}
            onClear={() => clearField('size')}
            aria-label='Size'
          >
            <span aria-hidden>Size:</span> {filterData.size}
          </Select.Trigger>
          <Select.Menu aria-label='Size'>
            {sizes.map((item, idx) => (
              <Select.Option key={idx} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select.Menu>
        </Select>

        {filters.map(({ name, values }) => {
          return (
            <AddFilter.Select
              key={name}
              name={name}
              displayName={name}
              onChange={(v: SelectValue) => {
                if (typeof v === 'string') {
                  updateFilterData(v, name);
                }
              }}
              visible={visible[name]}
              onVisibleChange={handleVisible(name)}
            >
              <AddFilter.Select.Trigger
                placeholder={name}
                aria-label={name}
                onClear={() => {
                  clearField(name);
                }}
              >
                <span aria-hidden>{name}:</span> {filterData[name]}
              </AddFilter.Select.Trigger>
              <AddFilter.Select.Menu aria-label={name}>
                {values.map((item, idx) => (
                  <AddFilter.Select.Option key={idx} value={item}>
                    {item}
                  </AddFilter.Select.Option>
                ))}
              </AddFilter.Select.Menu>
            </AddFilter.Select>
          );
        })}
      </AddFilter>

      <Box>
        Sizes:
        <Chart.Cigarette
          data={{
            [sizes[0]]: 1,
            [sizes[1]]: 2,
            [sizes[2]]: 3,
          }}
          plotWidth={400}
          plotHeight={28}
          aria-label='Sizes'
          onClick={(key: string) => {
            updateFilterData(key, 'size');
          }}
        />
      </Box>

      <Box>
        Colors:
        <Chart.Cigarette
          data={{
            [colors[0]]: 1,
            [colors[1]]: 2,
            [colors[2]]: 3,
          }}
          plotWidth={400}
          plotHeight={28}
          aria-label='Colors'
          onClick={(key: string) => {
            updateFilterData(key, 'Color');
          }}
        />
      </Box>
    </Box>
  );
};

export default Demo;
