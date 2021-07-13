import React, { useState } from 'react';
import Dropdown from '@semcore/dropdown';
import Select from '@semcore/select';
import Input from '@semcore/input';
import MathPlusXS from '@semcore/icon/lib/MathPlus/xs';
import { Flex } from '@semcore/flex-box';
import Link from '@semcore/link';
import Divider from '@semcore/divider';
import Button from '@semcore/button';
import { FilterTrigger } from '@semcore/base-trigger';

const generateOptions = (list) => list.map((v) => ({ value: v, children: v }));

const Filter = (props) => (
  <Flex {...props}>
    <Select wMin={120} mr={4} options={generateOptions(['Include', 'Exclude'])} />
    <Select wMin={120} mr={4} options={generateOptions(['Keyword', 'Not keyword'])} />
    <Select wMin={120} mr={4} options={generateOptions(['Containing', 'Not containing'])} />
    <Input>
      <Input.Value />
    </Input>
  </Flex>
);

export default () => {
  const [filters, setFilters] = useState(0);
  const [visible, updateVisible] = useState(false);
  const clearAll = () => setFilters(0);
  const addFilter = () => {
    setFilters(filters + 1);
  };
  const applyFilters = () => {
    updateVisible(false);
  };

  return (
    <Dropdown visible={visible} onVisibleChange={updateVisible}>
      <Dropdown.Trigger
        placeholder="Advanced filters"
        empty={!filters}
        onClear={clearAll}
        tag={FilterTrigger}
      >
        <FilterTrigger.Text>Advanced filters</FilterTrigger.Text>
        {!!filters && <FilterTrigger.Counter>{filters}</FilterTrigger.Counter>}
      </Dropdown.Trigger>
      <Dropdown.Popper>
        <Flex direction="column" p={4}>
          <Filter mb={4} />
          {[...new Array(filters)].map((_, ind) => (
            <Filter key={ind} mb={4} />
          ))}
          <Link onClick={addFilter} size={100}>
            <Link.Addon tag={MathPlusXS} />
            <Link.Text>Add condition</Link.Text>
          </Link>
        </Flex>
        <Divider />
        <Flex p={4} justifyContent="space-between">
          <Button use="primary" theme="info" onClick={applyFilters}>
            Apply
          </Button>
          <Button use="tertiary" theme="muted" onClick={clearAll}>
            Clear all
          </Button>
        </Flex>
      </Dropdown.Popper>
    </Dropdown>
  );
};
