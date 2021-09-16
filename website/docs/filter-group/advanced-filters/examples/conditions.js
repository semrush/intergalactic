import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '@semcore/dropdown';
import Select from '@semcore/select';
import Input from '@semcore/input';
import MathPlusXS from '@semcore/icon/lib/MathPlus/xs';
import { Flex } from '@semcore/flex-box';
import Divider from '@semcore/divider';
import Button from '@semcore/button';
import { FilterTrigger } from '@semcore/base-trigger';
import CloseXS from '@semcore/icon/lib/Close/xs';
import TrashXS from '@semcore/icon/lib/Trash/xs';
import styled from 'styled-components';

const generateOptions = (list) => list.map((v) => ({ value: v, children: v }));

const Filter = ({ closable, onClose, ...props }) => (
  <Flex {...props}>
    <Select wMin={120} mr={4} options={generateOptions(['Include', 'Exclude'])} />
    <Select wMin={120} mr={4} options={generateOptions(['Keyword', 'Not keyword'])} />
    <Select wMin={120} mr={4} options={generateOptions(['Containing', 'Not containing'])} />
    <Input>
      <Input.Value />
    </Input>
    {closable ? <TrashXS color="stone" interactive ml={2} py={2} onClick={onClose} /> : null}
  </Flex>
);

const FlexOverflow = styled(Flex)`
  max-height: 18em;
  overflow: auto;
`;

export default () => {
  const [filters, setFilters] = useState(0);
  const [visible, updateVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [filters]);

  const clearAll = () => setFilters(0);
  const addFilter = () => {
    setFilters(filters + 1);
  };
  const applyFilters = () => {
    updateVisible(false);
  };
  const handleCloseFilter = () => {
    setFilters(filters - 1);
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
        <FlexOverflow direction="column" p={4} alignItems="flex-start">
          <Filter mb={4} closable={filters} onClose={handleCloseFilter} />
          {[...new Array(filters)].map((_, ind) => (
            <Filter key={ind} mb={4} closable onClose={handleCloseFilter} />
          ))}
          <Button use="tertiary" onClick={addFilter} ref={buttonRef}>
            <Button.Addon tag={MathPlusXS} />
            <Button.Text>Add condition</Button.Text>
          </Button>
        </FlexOverflow>
        <Divider />
        <Flex p={4} justifyContent="space-between">
          <Button use="primary" theme="info" onClick={applyFilters}>
            Apply
          </Button>
          <Button use="tertiary" theme="muted" onClick={clearAll}>
            <Button.Addon tag={CloseXS} />
            <Button.Text>Clear all</Button.Text>
          </Button>
        </Flex>
      </Dropdown.Popper>
    </Dropdown>
  );
};
