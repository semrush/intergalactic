import PlusM from '@semcore/icon/MathPlus/m';
import Pin from '@semcore/icon/Pin/m';
import Settings from '@semcore/icon/Settings/m';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import { lastInteraction } from '@semcore/ui/core';
import Divider from '@semcore/ui/divider';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { Flex } from '@semcore/ui/flex-box';
import { InputSearch } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';
import { FixedSizeList } from 'react-window';

const projects = Array.from({ length: 100 }, (_, index) => `project ${index}`);
const listItemHeight = 52;
const listHeight = 200;

const Row = React.memo(({ index, style, data: { project, projects, setProject } }: any) => {
  const projectName = projects[index];

  return (
    <div style={style}>
      <DropdownMenu.Item
        key={projectName}
        onClick={() => setProject(projectName)}
        selected={project === projectName}
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
    </div>
  );
});

const Demo = () => {
  const listRef = React.useRef<FixedSizeList>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);
  const [selectedProject, setProject] = React.useState<string | null>('project 33');

  React.useEffect(() => {
    if (selectedProject && visible) {
      const selectedIndex = projects.findIndex((p) => selectedProject === p);
      setHighlightedIndex(selectedIndex);
      listRef.current?.scrollToItem(selectedIndex, 'center');
    }
  }, [projects, selectedProject, visible]);

  const handleKeydownCreateButton = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setVisible(false);

      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <DropdownMenu
      selectable
      itemsCount={projects.length}
      visible={visible}
      onVisibleChange={setVisible}
      highlightedIndex={highlightedIndex}
      onHighlightedIndexChange={setHighlightedIndex}
    >
      <DropdownMenu.Trigger tag={ButtonTrigger} w={220}>
        {selectedProject ?? 'Select project'}
      </DropdownMenu.Trigger>

      <DropdownMenu.Popper aria-label='Select project popover'>
        <InputSearch value={searchValue} onChange={setSearchValue} m={1} autoFocus={false} />

        <DropdownMenu.List hMax={listHeight + 41}>
          <FixedSizeList
            ref={listRef}
            height={projects.length > 7 ? listHeight : projects.length * listItemHeight}
            width='100%'
            itemCount={projects.length}
            overscanCount={5}
            itemSize={listItemHeight}
            itemData={{ projects, project: selectedProject, setProject }}
          >
            {Row}
          </FixedSizeList>
        </DropdownMenu.List>
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

export default Demo;
