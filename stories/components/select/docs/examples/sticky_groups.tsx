import { ScreenReaderOnly } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
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
        <Select.InputSearch value={searchValue} onChange={setSearchValue} m={1} aria-describedby={searchValue ? 'search-result' : undefined} />

        <Select.List aria-label='Projects' hMax={listHeight + 41} topOffset={36} shadowSize={5} shadowTheme={{ horizontalTop: 'dark', horizontalBottom: 'light' }}>
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
                  p={2}
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
