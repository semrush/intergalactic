import EditM from '@semcore/icon/Edit/m';
import PlusM from '@semcore/icon/MathPlus/m';
import Settings from '@semcore/icon/Settings/m';
import { Flex } from '@semcore/ui/base-components';
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
      return {
        title: `Project ${index}`,
      };
    }),
  };
});

const listHeight = 200;

const Row = React.memo(({ style, data: { project, setProject, selectedProject } }: any) => {
  const projectName = project.title;

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
  const [filteredMenuData, setFilteredMenuData] = React.useState(groups);

  const handleKeydownCreateButton = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setVisible(false);

      e.stopPropagation();
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    const newFilteredProjects: typeof groups = [];
    let highlightedIndex = -1;
    let index = -1;
    groups.forEach((group, i) => {
      group.projects.forEach((item, j) => {
        if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
          if (!newFilteredProjects[i]) {
            newFilteredProjects[i] = {
              ...group,
              projects: [],
            };
          }
          newFilteredProjects[i].projects.push(item);
          index++;
          if (item.title === selectedProject || highlightedIndex === -1) {
            highlightedIndex = index;
          }
        }
      });
    });
    setHighlightedIndex(highlightedIndex);
    setFilteredMenuData(newFilteredProjects);
  }, [searchValue]);

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
        <InputSearch value={searchValue} onChange={setSearchValue} m={1} autoFocus={false} />

        {filteredMenuData.length > 0 && (
          <DropdownMenu.List hMax={listHeight + 41} topOffset={36} shadowSize={5} shadowTheme={{ horizontalTop: 'dark', horizontalBottom: 'light' }}>
            {filteredMenuData.map((group, index) => {
              return (
                <DropdownMenu.Group key={index} title={group.title} sticky>
                  {group.projects.map((project) => (<Row key={`${group.title}_${project.title}`} data={{ project, setProject, selectedProject }} />))}
                </DropdownMenu.Group>
              );
            })}
          </DropdownMenu.List>
        )}
        {searchValue !== '' && <DropdownMenu.StatusItem itemsCount={filteredMenuData.length} />}
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
