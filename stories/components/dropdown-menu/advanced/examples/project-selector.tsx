import { Flex } from '@semcore/ui/base-components';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { RenderRowProps, DropdownMenuProps, DropdownMenuListProps, DropdownMenuItemProps, DropdownMenuItemHintProps } from '@semcore/ui/dropdown-menu';
import PlusM from '@semcore/ui/icon/MathPlus/m';
import Pin from '@semcore/ui/icon/Pin/m';
import Settings from '@semcore/ui/icon/Settings/m';
import { InputSearch } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const projects = Array.from({ length: 100 }, (_, index) => `project ${index}`);
const listHeight = 200;

type ProjectSelectorProps = DropdownMenuProps & DropdownMenuListProps & DropdownMenuItemProps & DropdownMenuItemHintProps & {
  disabledAll?: boolean;
  disabledFirstItem?: boolean;
};

const Row = React.memo(({ index, data }: RenderRowProps<string, { selected: string | null; setProject: (project: string, index: number) => void; disabledAll?: boolean; disabledFirstItem?: boolean }>) => {
  const projectName = projects[index];

  return (
    <DropdownMenu.Item
      key={projectName}
      onClick={() => data.setProject(projectName, index)}
      selected={data.selected === projectName}
      disabled={data.disabledAll || (index === 0 && data.disabledFirstItem)}
      index={index}
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
              onClick={(e) => e.stopPropagation()}
            />
            <DropdownMenu.Item
              tag={Button}
              addonLeft={Pin}
              title='Pin'
              hintPlacement='right'
              onClick={(e) => e.stopPropagation()}
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
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(projects.findIndex((p) => p === selectedProject));

  const handleKeydownCreateButton = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setVisible(false);

      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleSetProject = (project: string, index: number) => {
    setProject(project);
    setHighlightedIndex(index);
  };

  return (
    <DropdownMenu
      stretch={props.stretch}
      selectable
      itemsCount={projects.length}
      visible={visible}
      onVisibleChange={setVisible}
      defaultHighlightedIndex={highlightedIndex}
    >
      <DropdownMenu.Trigger tag={ButtonTrigger} w={220}>
        {selectedProject ?? 'Select project'}
      </DropdownMenu.Trigger>

      <DropdownMenu.Popper aria-label='Select project popover'>
        <InputSearch value={searchValue} onChange={setSearchValue} m={1} autoFocus={false} />

        <DropdownMenu.VirtualList
          hMax={listHeight + 41}
          rowHeight={52}
          renderRow={Row}
          rows={projects}

          customData={{
            setProject: handleSetProject,
            selected: selectedProject,
            disabledAll: props.disabledAll,
            disabledFirstItem: props.disabledFirstItem,
          }}
        />
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
};

Demo.defaultProps = defaultProps;

export default Demo;
