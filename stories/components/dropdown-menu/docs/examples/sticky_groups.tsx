import EditM from '@semcore/icon/Edit/m';
import PlusM from '@semcore/icon/MathPlus/m';
import Settings from '@semcore/icon/Settings/m';
import { Flex, Box, ScreenReaderOnly } from '@semcore/ui/base-components';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { InputSearch } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

let index = 0;

const groups = Array.from({ length: 3 }, (_, i) => {
  return {
    title: `Group title ${i}`,
    projects: Array.from({ length: 6 }, (_, j) => {
      index++;
      return `Project ${index}`;
    }),
  };
});

const listHeight = 200;

const Row = React.memo(({ style, data: { project, setProject, selectedProject } }: any) => {
  const projectName = project;

  return (
    <div style={style}>
      <DropdownMenu.Item
        key={projectName}
        onClick={() => setProject(projectName)}
        selected={selectedProject === projectName}
      >
        <DropdownMenu inlineActions placement='right'>
          <Flex justifyContent='space-between'>
            <DropdownMenu.Item.Content tag={DropdownMenu.Trigger} h={20}>
              {projectName}
            </DropdownMenu.Item.Content>
            <DropdownMenu.Actions gap={2}>
              <DropdownMenu.Item
                tag={Button}
                addonLeft={EditM}
                title='Edit project name'
                hintPlacement='right'
                onClick={(e) => e.stopPropagation()}
              />
              <DropdownMenu.Item
                tag={Button}
                addonLeft={Settings}
                title='Settings'
                hintPlacement='right'
                onClick={(e) => e.stopPropagation()}
              />
            </DropdownMenu.Actions>
          </Flex>
          <DropdownMenu.Item.Hint h={20}>Description</DropdownMenu.Item.Hint>
        </DropdownMenu>
      </DropdownMenu.Item>
    </div>
  );
});

const Demo = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);
  const [selectedProject, setProject] = React.useState<string | null>(null);

  const handleKeydownCreateButton = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setVisible(false);

      e.stopPropagation();
      e.preventDefault();
    }
  };

  const filteredProjects = groups.reduce<string[]>((acc, { projects }) => {
    projects.forEach((project) => {
      if (project.toLowerCase().includes(searchValue.toLowerCase())) {
        acc.push(project);
      }
    });

    return acc;
  }, []);

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
        <InputSearch value={searchValue} onChange={setSearchValue} m={1} autoFocus={false} aria-describedby={searchValue ? 'search-result' : undefined} />

        <DropdownMenu.List hMax={listHeight + 41} topOffset={36} shadowSize={5} shadowTheme={{ horizontalTop: 'dark', horizontalBottom: 'light' }}>
          {groups.map((group, index) => {
            if (group.projects.some((project) => {
              return project.toLowerCase().includes(searchValue.toLowerCase());
            }))
              return (
                <DropdownMenu.Group key={index} title={group.title} sticky>
                  {group.projects
                    .filter((project) => project.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((project, index) => (<Row key={`${group.title}_${project}`} data={{ project, setProject, selectedProject }} />))}
                </DropdownMenu.Group>
              );
          })}

          {filteredProjects.length
            ? (
                <ScreenReaderOnly id='search-result' aria-hidden='true'>
                  {filteredProjects.length}
                  {' '}
                  result
                  {filteredProjects.length > 1 && 's'}
                  {' '}
                  found
                </ScreenReaderOnly>
              )
            : (
                <Text
                  tag='div'
                  id='search-result'
                  key='Nothing'
                  p='6px 8px'
                  size={200}
                  use='secondary'
                >
                  Nothing found
                </Text>
              )}
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
