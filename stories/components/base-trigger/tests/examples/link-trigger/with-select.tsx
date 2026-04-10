import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import type { LinkTriggerProps } from '@semcore/ui/base-trigger';
import Counter, { type CounterProps } from '@semcore/ui/counter';
import Select from '@semcore/ui/select';
import Spin, { type SpinSize } from '@semcore/ui/spin';
import type { TextEllipsisProps } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type AddonType = 'icon' | 'badge' | 'counter' | 'spin';

interface Project {
  id: number;
  name: string;
}

type LinkTriggerSelectDDMenuExample = LinkTriggerProps & {
  showAddonLeft?: boolean;
  showAddonRight?: boolean;
  addonLeftType?: AddonType;
  addonRightType?: AddonType;
  ellipsis?: TextEllipsisProps;
  w?: number;
};

const Demo = (props: LinkTriggerSelectDDMenuExample) => {
  const {
    size = 300,
    active,
    empty,
    placeholder,
    disabled,
    loading,
    color,
    showAddonLeft = false,
    showAddonRight = false,
    addonLeftType = 'icon',
    addonRightType = 'icon',
    ellipsis,
    w,
  } = props;

  const [selectedProject, setSelectedProject] = React.useState<Project | undefined>();
  const [deviceValue, setDeviceValue] = React.useState<string | null>(null);

  const numSize = Number(size);
  const IconAddon = numSize < 600 ? MathPlusAltM : MathPlusAltL;

  let spinSize: SpinSize = 'm';
  if (numSize <= 200) {
    spinSize = 'xs';
  } else if (numSize <= 500) {
    spinSize = 's';
  }

  let counterSize: CounterProps['size'];
  if (numSize >= 600) {
    counterSize = 'l';
  } else if (numSize >= 300) {
    counterSize = 'm';
  }

  const renderAddon = (show: boolean, type: AddonType) => {
    if (!show) return null;

    switch (type) {
      case 'badge':
        return <LinkTrigger.Addon><Badge type='new' /></LinkTrigger.Addon>;
      case 'counter':
        return <LinkTrigger.Addon><Counter size={counterSize}>17</Counter></LinkTrigger.Addon>;
      case 'spin':
        return <LinkTrigger.Addon><Spin size={spinSize} /></LinkTrigger.Addon>;
      case 'icon':
      default:
        return <LinkTrigger.Addon><IconAddon /></LinkTrigger.Addon>;
    }
  };

  const hasEllipsis = ellipsis !== undefined && ellipsis.ellipsis !== false;
  const ellipsisW = hasEllipsis ? (w || (numSize < 600 ? 150 : 300)) : undefined;

  const handleSelect = (id: number) => {
    setSelectedProject(() => projects.find((project) => project.id === id));
  };

  return (
    <Flex gap={4} alignItems='flex-start' direction='column'>
      {/* Pattern 1: Select with tag={LinkTrigger} */}
      <Select
        tag={LinkTrigger}
        options={devices}
        data-test-id='base-trigger-as-tag-in-select'
        aria-label='base addon'
        size={size}
        active={active}
        empty={empty}
        placeholder={placeholder}
        disabled={disabled}
        loading={loading}
        color={color}
      />

      {/* Pattern 2: Select with Select.Trigger and custom addons */}
      <Select
        value={selectedProject?.id}
        onChange={handleSelect}
        placeholder='Select Project'
      >
        {({ getTriggerProps }) => (
          <>
            <Select.Trigger
              tag={LinkTrigger}
              active={active}
              empty={empty}
              placeholder={placeholder}
              disabled={disabled}
              loading={loading}
              color={color}
              size={size}
            >
              {renderAddon(showAddonLeft, addonLeftType)}
              <LinkTrigger.Text
                tag={Text}
                fontWeight={400}
                w={ellipsisW}
                {...ellipsis}
                ellipsis:observeChildrenMutations
              >
                {selectedProject?.name ?? (getTriggerProps().placeholder as string)}
              </LinkTrigger.Text>
              {renderAddon(showAddonRight, addonRightType)}
            </Select.Trigger>
            <Select.Popper aria-label='Projects'>
              <Select.List>
                {projects.map((project) => (
                  <Select.Option key={project.id} value={project.id}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select.List>
            </Select.Popper>
          </>
        )}
      </Select>

      {/* Pattern 3: Select with in wMax in Select Trigger and ellipsis in Link trigger */}
      <Select
        placeholder='Select SEO project'
        value={deviceValue}
        onChange={setDeviceValue}
      >
        <Select.Trigger tag={LinkTrigger} size={size} wMax={ellipsisW}>
          {renderAddon(showAddonLeft, addonLeftType)}
          <LinkTrigger.Text
            fontWeight={600}
            {...ellipsis}
            ellipsis:observeChildrenMutations
          >
            {deviceValue}
          </LinkTrigger.Text>
          {renderAddon(showAddonRight, addonRightType)}
        </Select.Trigger>
        <Select.Popper aria-label=''>
          <Select.List>
            {devices.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.children}
              </Select.Option>
            ))}
          </Select.List>
        </Select.Popper>
      </Select>
    </Flex>
  );
};

const devices = ['Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

const projects: Project[] = [
  { id: 1, name: 'Semrush' },
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
  showAddonLeft: false,
  showAddonRight: false,
  addonLeftType: 'icon',
  addonRightType: 'icon',
  ellipsis: { ellipsis: true },
  w: 140,
};

Demo.defaultProps = linkTriggerSelectExampleProps;

export default Demo;
