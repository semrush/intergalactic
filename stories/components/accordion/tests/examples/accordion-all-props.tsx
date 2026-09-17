import Accordion from '@semcore/ui/accordion';
import type { NSAccordion } from '@semcore/ui/accordion';
import { Flex } from '@semcore/ui/base-components';
import React from 'react';

type ExampleProps = NSAccordion.Props & {
  /** Root animation duration. Omitted by default so the component falls back
   * to the `--intergalactic-duration-accordion` CSS variable. */
  duration?: number;
  /** Per-Collapse animation duration. Omitted by default so the root duration applies. */
  collapseDuration?: number;

  /** Accordion.Item.Toggle */
  toggleTag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /** Accordion.Item.Chevron */
  chevronSize: 'm' | 'l';

  /** Accordion.Item.Collapse */
  initialAnimation: boolean;
  timingFunction: 'ease-out' | 'ease-in' | 'ease-in-out' | 'linear' | 'cubic-bezier(0.5, 0, 0, 1.12)';
  animationsDisabled: boolean;
  overflowHidden: boolean;
  defaultHeight: 'auto' | '100%';
  preserveNode: boolean;

  /** Per-item content, editable from the Storybook panel */
  item1Label: string;
  item1Content: string;
  item1Disabled: boolean;
  item2Label: string;
  item2Content: string;
  item2Disabled: boolean;
  item3Label: string;
  item3Content: string;
  item3Disabled: boolean;
};

const Demo = (props: ExampleProps) => {
  const items = [
    { value: 0, label: props.item1Label, content: props.item1Content, disabled: props.item1Disabled },
    { value: 1, label: props.item2Label, content: props.item2Content, disabled: props.item2Disabled },
    { value: 2, label: props.item3Label, content: props.item3Content, disabled: props.item3Disabled },
  ];

  const collapseProps = {
    initialAnimation: props.initialAnimation,
    timingFunction: props.timingFunction,
    animationsDisabled: props.animationsDisabled,
    overflowHidden: props.overflowHidden,
    defaultHeight: props.defaultHeight,
    preserveNode: props.preserveNode,
    ...(props.collapseDuration !== undefined && { duration: props.collapseDuration }),
  };

  return (
    <Flex direction='column' gap={4} p={4} w='100%'>
      <Accordion
        // remount on defaultValue change, otherwise the uncontrolled init is ignored by the panel
        key={String(props.defaultValue)}
        use={props.use}
        defaultValue={props.defaultValue}
        {...(props.duration !== undefined && { duration: props.duration })}
      >
        {items.map((item) => (
          <Accordion.Item value={item.value} key={item.value} disabled={item.disabled}>
            <Accordion.Item.Toggle tag={props.toggleTag}>
              <Accordion.Item.ToggleButton>
                <Accordion.Item.Chevron size={props.chevronSize} />
                {item.label}
              </Accordion.Item.ToggleButton>
            </Accordion.Item.Toggle>
            <Accordion.Item.Collapse {...collapseProps}>{item.content}</Accordion.Item.Collapse>
          </Accordion.Item>
        ))}
      </Accordion>
    </Flex>
  );
};

export const defaultAccordionAllProps: ExampleProps = {
  use: 'secondary',
  defaultValue: [],
  toggleTag: 'h3',
  chevronSize: 'm',
  initialAnimation: false,
  timingFunction: 'ease-out',
  animationsDisabled: false,
  overflowHidden: true,
  defaultHeight: 'auto',
  preserveNode: false,
  item1Label: 'Section 1',
  item1Content: 'This is section 1. Edit this text from the Storybook controls panel.',
  item1Disabled: false,
  item2Label: 'Section 2',
  item2Content: 'This is section 2. Edit this text from the Storybook controls panel.',
  item2Disabled: false,
  item3Label: 'Section 3',
  item3Content: 'This is section 3. Edit this text from the Storybook controls panel.',
  item3Disabled: false,
};

Demo.defaultProps = defaultAccordionAllProps;
export default Demo;
