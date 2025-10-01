import AddFilter from '@semcore/ui/add-filter';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

const defaultFilterData = {
  Color: '',
};

type FilterKeys = keyof typeof defaultFilterData;
type FilterData = Record<FilterKeys, string>;

const colors = ['Blue', 'Green', 'Yellow'];

const filters: Array<{ name: FilterKeys; values: string[] }> = [
  {
    name: 'Color',
    values: colors,
  },
];

const Demo = () => {
  const [filterData, setFilterData] = React.useState<FilterData>(defaultFilterData);
  const [visibleFilters, setVisibleFilters] = React.useState<string[]>([]);
  const [visible, setVisible] = React.useState<Record<FilterKeys, boolean>>({
    Color: false,
  });

  const updateFilterData = (value: string, name: string) => {
    const newVisibleFilters = new Set(visibleFilters);
    newVisibleFilters.add(name);
    setVisibleFilters(Array.from(newVisibleFilters));
    setVisible((prev) => ({ ...prev, [name]: false }));
    setFilterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearField = React.useCallback(
    (name: keyof FilterData) => {
      setFilterData((prev) => ({ ...prev, [name]: '' }));
    },
    [],
  );

  const handleVisible = React.useCallback(
    (key: FilterKeys) => (visible: boolean) => {
      setVisible((prevVisible) => ({
        ...prevVisible,
        [key]: visible,
      }));
    },
    [],
  );

  const handleVisibleFiltersChange = React.useCallback(
    (newVisibleFilters: string[]) => {
      const visibleFiltersSet = new Set(visibleFilters);
      if (newVisibleFilters.length > visibleFiltersSet.size) {
        const newVisibleFilter = newVisibleFilters.find((key) => !visibleFiltersSet.has(key));
        if (newVisibleFilter) {
          setVisible((prevState) => ({
            ...prevState,
            [newVisibleFilter]: true,
          }));
        }
      }
      setVisibleFilters(newVisibleFilters);
    },
    [visibleFilters],
  );

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
        {filters.map(({ name, values }) => (
          <AddFilter.Select
            key={name}
            name={name}
            displayName={name}
            onChange={(v: any) => {
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
              onClear={() => clearField(name)}
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
        ))}
      </AddFilter>

      <Box mt={4}>
        <strong>Set color filter via button:</strong>
        <Flex gap={2} mt={2}>
          {colors.map((color) => (
            <Button key={color} onClick={() => updateFilterData(color, 'Color')}>
              {color}
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Demo;
