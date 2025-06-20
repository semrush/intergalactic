import { ButtonTrigger } from '@semcore/base-trigger';
import Button, { ButtonLink } from '@semcore/button';
import Divider from '@semcore/divider';
import DropdownMenu from '@semcore/dropdown-menu';
import { Flex, Box } from '@semcore/flex-box';
import CloseM from '@semcore/icon/Close/m';
import PlusM from '@semcore/icon/MathPlus/m';
import Pin from '@semcore/icon/Pin/m';
import SearchM from '@semcore/icon/Search/m';
import Settings from '@semcore/icon/Settings/m';
import Input from '@semcore/input';
import { Text } from '@semcore/typography';
import React from 'react';
import type { FixedSizeList } from 'react-window';

const groups = Array.from({ length: 3 }, (_, index) => {
  return {
    title: `Group ${index}`,
    projects: Array.from({ length: 6 }, (_, index) => `project ${index}`),
  };
});

const listHeight = 200;

const Row = React.memo(({ index, style, data: { project, group, setProject } }: any) => {
  const projectName = `${group.title}_${group.projects[index]}`;

  return (
    <div style={style}>
      <DropdownMenu.Item
        key={projectName}
        onClick={() => setProject(projectName)}
        selected={project === projectName}
        // index={index}
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
  const [searchValue, setSearchValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);
  const [selectedProject, setProject] = React.useState<string | null>('Group 2_project 5');

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
      visible={visible}
      onVisibleChange={setVisible}
      highlightedIndex={highlightedIndex}
      onHighlightedIndexChange={setHighlightedIndex}
    >
      <DropdownMenu.Trigger tag={ButtonTrigger} w={220}>
        {selectedProject ?? 'Select project'}
      </DropdownMenu.Trigger>

      <DropdownMenu.Popper aria-label='Select project popover'>
        <Box m={1}>
          <Input>
            <Input.Addon>
              <SearchM />
            </Input.Addon>
            <Input.Value
              value={searchValue}
              onChange={setSearchValue}
              aria-label='Enter project name'
            />

            {searchValue && (
              <Input.Addon>
                <ButtonLink
                  addonLeft={CloseM}
                  use='secondary'
                  aria-label='Clear'
                  onClick={() => setSearchValue('')}
                />
              </Input.Addon>
            )}
          </Input>
        </Box>

        <DropdownMenu.List hMax={listHeight + 41} topOffset={36} shadowSize={5} shadowTheme={{ horizontalTop: 'dark', horizontalBottom: 'light' }}>
          {groups.map((group, index) => {
            return (
              <DropdownMenu.Group key={index} title={group.title} sticky>
                {group.projects.map((project, index) => (<Row key={`${group.title}_${project}`} index={index} data={{ project, group, setProject }} />))}
              </DropdownMenu.Group>
            );
          })}
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
