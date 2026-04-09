import { Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import type { LinkTriggerProps } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';
interface Project {
  id: number;
  name: string;
}

type LinkTriggerSelectDDMenuExample = LinkTriggerProps;
const Demo = (props: LinkTriggerSelectDDMenuExample) => {
  const [selectedProject, setSelectedProject] = React.useState<Project | undefined>();

  const handleSelect = (id: number) => {
    setSelectedProject(() => projects.find((project) => project.id === id));
  };

  return (
    <Flex gap={2} alignItems='start' direction='column'>
      <Select
        tag={LinkTrigger}
        options={devices}
        data-test-id='base-trigger-as-tag-in-select'
        aria-label='base addon'
        size={props.size}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
        loading={props.loading}
        color={props.color}
      />

      <Select
        value={selectedProject?.id}
        onChange={handleSelect}
        placeholder='Select Project'
      >
        {({ getTriggerProps }) => {
          return (
            <>
              <Select.Trigger
                tag={LinkTrigger}
                active={props.active}
                empty={props.empty}
                placeholder={props.placeholder}
                disabled={props.disabled}
                loading={props.loading}
                color={props.color}
                size={props.size}
              >
                <LinkTrigger.Text
                  tag={Text}
                  fontWeight={400}
                  noWrap
                >
                  {selectedProject?.name ??
                    (getTriggerProps().placeholder as string)}
                </LinkTrigger.Text>
              </Select.Trigger>
              <Select.Popper aria-label='Projects'>
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

const projects: Project[] = [
  {
    id: 1,
    name: 'Semrush',
  },
  { id: 2, name: 'Google' },
];

export const linkTriggerSelectExampleProps: LinkTriggerSelectDDMenuExample = {
  size: 300,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
  loading: undefined,
  color: undefined,
};

Demo.defaultProps = linkTriggerSelectExampleProps;

export default Demo;
