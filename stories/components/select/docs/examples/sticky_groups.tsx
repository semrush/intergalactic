import { ButtonTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';
import Divider from '@semcore/divider';
import DropdownMenu from '@semcore/dropdown-menu';
import { Flex, Box, ScreenReaderOnly } from '@semcore/flex-box';
import EditM from '@semcore/icon/Edit/m';
import PlusM from '@semcore/icon/MathPlus/m';
import Settings from '@semcore/icon/Settings/m';
import Select, { InputSearch } from '@semcore/select';
import { Text } from '@semcore/typography';
import React from 'react';

let index = 0;

const groups = Array.from({ length: 3 }, (_, i) => {
  return {
    title: `Group title ${i}`,
    projects: Array.from({ length: 7 }, (_, j) => {
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
      <Select.Option
        key={projectName}
        value={projectName}
      >
        {projectName}
      </Select.Option>
    </div>
  );
});

const Demo = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedProject, setProject] = React.useState<string | null>(null);

  const filteredProjects = groups.reduce<string[]>((acc, { projects }) => {
    projects.forEach((project) => {
      if (project.toLowerCase().includes(searchValue.toLowerCase())) {
        acc.push(project);
      }
    });

    return acc;
  }, []);

  return (
    <Select value={selectedProject} onChange={setProject} placeholder='Select project'>
      <Select.Trigger />

      <Select.Popper aria-label='Select project popover'>
        <Select.InputSearch value={searchValue} onChange={setSearchValue} m={1} />

        <Select.List hMax={listHeight + 41} topOffset={36} shadowSize={5} shadowTheme={{ horizontalTop: 'dark', horizontalBottom: 'light' }}>
          {groups.map((group, index) => {
            if (group.projects.some((project) => {
              return project.toLowerCase().includes(searchValue.toLowerCase());
            }))
              return (
                <Select.Group key={index} title={group.title} sticky>
                  {group.projects
                    .filter((project) => project.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((project, index) => (<Row key={`${group.title}_${project}`} data={{ project, setProject, selectedProject }} />))}
                </Select.Group>
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
        </Select.List>
      </Select.Popper>
    </Select>
  );
};

export default Demo;
