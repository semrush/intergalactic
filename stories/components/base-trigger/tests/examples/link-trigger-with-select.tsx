import { LinkTrigger } from '@semcore/base-trigger';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import React from 'react';

interface Project {
  id: number;
  name: string;
}

const Demo = () => {
  const [selectedProject, setSelectedProject] = React.useState<Project | undefined>();

  const handleSelect = (id: number) => {
    setSelectedProject(() => projects.find((project) => project.id === id));
  };

  return (
    <Flex gap={2}>
      <Text size={200} tag='label' htmlFor='device-link-select'>
        Device:
      </Text>
      <Select tag={LinkTrigger} options={devices} id='device-link-select' />
      <Select
        tag={LinkTrigger}
        options={periods}
        aria-label='Period'
        placeholder='Select period'
        ml={4}
      />
      <Select
        value={selectedProject?.id}
        onChange={handleSelect}
        placeholder='Select Project'
      >
        {({ getTriggerProps }, actions) => {
          return (
            <>
              <Select.Trigger tag={LinkTrigger}>
                <LinkTrigger.Text
                  size={400}
                  tag={Text}
                  fontWeight={400}
                  noWrap
                >
                  {selectedProject?.name ??
                    (getTriggerProps().placeholder as string)}
                </LinkTrigger.Text>
              </Select.Trigger>
              <Select.Popper w={280} aria-label='Projects'>
                {projects.map((project) => (
                  <Select.Option key={project.id} value={project.id}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select.Popper>
            </>
          );
        }}
      </Select>
    </Flex>
  );
};

const devices = ['Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

const periods = ['Last week', 'Last month', 'Last 6 months'].map((item) => ({
  value: item,
  children: item,
}));

const projects: Project[] = [
  {
    id: 1,
    name: 'Semrush',
  },
  { id: 2, name: 'Google' },
];

export default Demo;
