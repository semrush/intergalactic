import PlusM from '@semcore/icon/MathPlus/m';
import Pin from '@semcore/icon/Pin/m';
import Settings from '@semcore/icon/Settings/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { RenderRowProps, DropdownMenuProps, DropdownMenuListProps, DropdownMenuItemProps } from '@semcore/ui/dropdown-menu';
import { InputSearch } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const projects = Array.from({ length: 5500 }, (_, index) => `project ${index}`);
const rowHeight = 52;

type ProjectSelectorProps = DropdownMenuProps & DropdownMenuListProps & DropdownMenuItemProps & {
  disabledAll?: boolean;
  disabledFirstItem?: boolean;
  visibleItems?: number;
};

const Row = React.memo(({ index, data, row }: RenderRowProps<string, { selected: string | null; setProject: (project: string, index: number) => void; disabledAll?: boolean; disabledFirstItem?: boolean }>) => {
  const projectName = row;

  return (
    <DropdownMenu.Item
      key={row}
      onClick={() => data.setProject(projectName, index)}
      selected={data.selected === projectName}
      disabled={data.disabledAll || (index === 0 && data.disabledFirstItem)}
      index={index}
      data-test-id={`item-${projectName}`}
    >
      <DropdownMenu inlineActions placement='right'>
        <Flex justifyContent='space-between'>
          <DropdownMenu.Item.Content tag={DropdownMenu.Trigger} h={20}>
            {projectName}
          </DropdownMenu.Item.Content>
          <DropdownMenu.Actions gap={2}>
            <DropdownMenu.Item
              tag={Button}
              addonLeft={Settings}
              title='Settings'
              hintPlacement='right'
              onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
            />
            <DropdownMenu.Item
              tag={Button}
              addonLeft={Pin}
              title='Pin'
              hintPlacement='right'
              onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
            />
          </DropdownMenu.Actions>
        </Flex>
        <DropdownMenu.Item.Hint h={20}>{projectName}</DropdownMenu.Item.Hint>
      </DropdownMenu>
    </DropdownMenu.Item>
  );
});

const Demo = (props: ProjectSelectorProps) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [selectedProject, setProject] = React.useState<string | null>('project 33');

  const visibleItems = props.visibleItems ?? 10;
  const listHeight = visibleItems * rowHeight;

  const normalizedQuery = searchValue.trim().toLowerCase();

  const filteredProjects = React.useMemo(() => {
    if (!normalizedQuery) return projects;
    return projects.filter((p) => p.toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery]);

  const defaultHighlightedIndex = filteredProjects.findIndex(
    (project) => project === selectedProject,
  );

  const handleKeydownCreateButton = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setVisible(false);

      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleSetProject = (project: string, index: number) => {
    setProject(project);
  };

  return (
    <DropdownMenu
      stretch={props.stretch}
      selectable
      itemsCount={filteredProjects.length}
      visible={visible}
      onVisibleChange={setVisible}
      defaultHighlightedIndex={defaultHighlightedIndex}
    >
      <DropdownMenu.Trigger tag={ButtonTrigger} w={220}>
        {selectedProject ?? 'Select project'}
      </DropdownMenu.Trigger>

      <DropdownMenu.Popper aria-label='Select project popover'>
        <InputSearch
          value={searchValue}
          onChange={setSearchValue}
          m={1}
          autoFocus={false}
        />

        {filteredProjects.length > 0 && (
          <DropdownMenu.VirtualList
            key={filteredProjects.length === projects.length ? 'virtual-list-stable-key' : normalizedQuery}
            hMax={listHeight + 41}
            rowHeight={rowHeight}
            renderRow={Row}
            rows={filteredProjects}
            customData={{
              setProject: handleSetProject,
              selected: selectedProject,
              disabledAll: props.disabledAll,
              disabledFirstItem: props.disabledFirstItem,
            }}
          />
        )}
        {searchValue !== '' && <DropdownMenu.StatusItem itemsCount={filteredProjects.length} />}
        <Divider />
        <DropdownMenu.Item
          role='button'
          tabIndex={0}
          tag={Flex}
          alignItems='center'
          aria-checked={undefined}
          onKeyDown={handleKeydownCreateButton}
        >
          <DropdownMenu.Item.Addon tag={PlusM} color='text-link' />
          <DropdownMenu.Item.Content tag={Text} color='text-link'>
            Create new project
          </DropdownMenu.Item.Content>
        </DropdownMenu.Item>
      </DropdownMenu.Popper>
    </DropdownMenu>
  );
};

export const defaultProps: ProjectSelectorProps = {
  disabledAll: false,
  disabledFirstItem: false,
  stretch: undefined,
  visibleItems: 4,
};

Demo.defaultProps = defaultProps;

export default Demo;
