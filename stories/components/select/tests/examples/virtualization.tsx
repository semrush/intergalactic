import { ButtonTrigger } from '@semcore/ui/base-trigger';
import type { RenderRowProps, DropdownMenuProps, DropdownMenuListProps, DropdownMenuItemProps } from '@semcore/ui/dropdown-menu';
import Select, { InputSearch } from '@semcore/ui/select';
import React from 'react';

const projects = Array.from({ length: 5500 }, (_, index) => `project ${index}`);
const rowHeight = 32;

type ProjectSelectorProps = DropdownMenuProps & DropdownMenuListProps & DropdownMenuItemProps & {
  disabledAll?: boolean;
  disabledFirstItem?: boolean;
  visibleItems?: number;
};

const Row = React.memo(({ index, data, row }: RenderRowProps<string, { selected: string | null; setProject: (project: string, index: number) => void; disabledAll?: boolean; disabledFirstItem?: boolean }>) => {
  const projectName = row;

  return (
    <Select.Option
      key={row}
      disabled={data.disabledAll || (index === 0 && data.disabledFirstItem)}
      index={index}
      data-test-id={`item-${projectName}`}
      value={projectName}
    >
      {projectName}
    </Select.Option>
  );
});

const Demo = (props: ProjectSelectorProps) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [selectedProject, setProject] = React.useState<string>('project 33');

  const visibleItems = props.visibleItems ?? 10;
  const listHeight = visibleItems * rowHeight;

  const normalizedQuery = searchValue.trim().toLowerCase();

  const filteredProjects = React.useMemo(() => {
    if (!normalizedQuery) return projects;
    return projects.filter((p) => p.toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery]);

  const handleSetProject = (project: string) => {
    setProject(project);
  };

  return (
    <Select
      stretch={props.stretch}
      itemsCount={filteredProjects.length}
      visible={visible}
      onVisibleChange={setVisible}
      value={selectedProject}
      onChange={handleSetProject}
    >
      <Select.Trigger tag={ButtonTrigger} w={220}>
        {selectedProject ?? 'Select project'}
      </Select.Trigger>

      <Select.Popper aria-label='Select project popover'>
        <InputSearch value={searchValue} onChange={setSearchValue} m={1} autoFocus={false} />

        <Select.VirtualList
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
      </Select.Popper>
    </Select>
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
