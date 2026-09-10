import figma from '@figma/code-connect';
import { ScreenReaderOnly } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';
import Select from '@semcore/ui/select';

// Normal variants

figma.connect(
  FilterTrigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10191-98848&t=5rMgxkZbFCPoIXFH-11',
  {
    variant: { state: 'normal', Counter: 'false', Dot: 'false' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      placeholder: figma.textContent('↳ text'),
    },
    example: ({ size, placeholder }) => (
      <Select.Trigger tag={FilterTrigger} size={size} placeholder={placeholder} />
    ),
  },
);

figma.connect(
  FilterTrigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10191-98848&t=5rMgxkZbFCPoIXFH-11',
  {
    variant: { state: 'normal', Counter: 'false', Dot: 'true' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      placeholder: figma.textContent('↳ text'),
      dot: figma.boolean('Dot', {
        true: figma.children('Dot'),
        false: undefined,
      }),
    },
    example: ({ size, placeholder, dot }) => (
      <Select.Trigger tag={FilterTrigger} size={size} placeholder={placeholder}>
        {dot}
      </Select.Trigger>
    ),
  },
);

// Variants without addons

figma.connect(
  FilterTrigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10191-98848&t=5rMgxkZbFCPoIXFH-11',
  {
    variant: { 'Counter': 'false', '← addon': 'false' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      active: figma.enum('state', {
        active: true,
      }),
      placeholder: figma.textContent('↳ text'),
      dot: figma.boolean('Dot', {
        true: figma.children('Dot'),
        false: undefined,
      }),
    },
    example: ({ size, placeholder, active, dot }) => (
      <Select.Trigger tag={FilterTrigger} size={size} state={active} placeholder={placeholder}>
        <span aria-hidden>{placeholder}</span>
        {dot}
      </Select.Trigger>
    ),
  },
);

figma.connect(
  FilterTrigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10191-98848&t=5rMgxkZbFCPoIXFH-11',
  {
    variant: { 'Counter': 'true', '← addon': 'false' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      active: figma.enum('state', {
        active: true,
      }),
      placeholder: figma.textContent('↳ text'),
      dot: figma.boolean('Dot', {
        true: figma.children('Dot'),
        false: undefined,
      }),
    },
    example: ({ size, placeholder, active, dot }) => (
      <Dropdown.Trigger placeholder={placeholder} tag={FilterTrigger}>
        <FilterTrigger.TriggerButton size={size} state={active}>
          <FilterTrigger.Text aria-hidden>{placeholder}</FilterTrigger.Text>
          <FilterTrigger.Counter>
            <ScreenReaderOnly>applied</ScreenReaderOnly>
          </FilterTrigger.Counter>
          {dot}
        </FilterTrigger.TriggerButton>
        <FilterTrigger.ClearButton title='Clear advanced filters' />
      </Dropdown.Trigger>
    ),
  },
);

// Variants with addons

figma.connect(
  FilterTrigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10191-98848&t=5rMgxkZbFCPoIXFH-11',
  {
    variant: { 'Counter': 'false', '← addon': 'true' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      addonLeft: figma.boolean('← addon', {
        true: figma.children('← - - addon properties'),
        false: undefined,
      }),
      active: figma.enum('state', {
        active: true,
      }),
      placeholder: figma.textContent('↳ text'),
      dot: figma.boolean('Dot', {
        true: figma.children('Dot'),
        false: undefined,
      }),
    },
    example: ({ size, placeholder, active, dot, addonLeft }) => (
      <Select.Trigger tag={FilterTrigger} size={size} state={active} placeholder={placeholder}>
        <Select.Trigger.Addon>{addonLeft}</Select.Trigger.Addon>
        <span aria-hidden>{placeholder}</span>
        {dot}
      </Select.Trigger>
    ),
  },
);

figma.connect(
  FilterTrigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10191-98848&t=5rMgxkZbFCPoIXFH-11',
  {
    variant: { 'Counter': 'true', '← addon': 'true' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      active: figma.enum('state', {
        active: true,
      }),
      addonLeft: figma.boolean('← addon', {
        true: figma.children('← - - addon properties'),
        false: undefined,
      }),
      placeholder: figma.textContent('↳ text'),
      dot: figma.boolean('Dot', {
        true: figma.children('Dot'),
        false: undefined,
      }),
    },
    example: ({ size, placeholder, active, dot, addonLeft }) => (
      <Dropdown.Trigger placeholder={placeholder} tag={FilterTrigger}>
        <FilterTrigger.TriggerButton size={size} state={active}>
          <FilterTrigger.Addon>{addonLeft}</FilterTrigger.Addon>
          <FilterTrigger.Text aria-hidden>{placeholder}</FilterTrigger.Text>
          <FilterTrigger.Counter>
            <ScreenReaderOnly>applied</ScreenReaderOnly>
          </FilterTrigger.Counter>
          {dot}
        </FilterTrigger.TriggerButton>
        <FilterTrigger.ClearButton title='Clear advanced filters' />
      </Dropdown.Trigger>
    ),
  },
);
