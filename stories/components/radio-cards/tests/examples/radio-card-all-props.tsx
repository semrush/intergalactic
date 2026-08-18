import Fire from '@semcore/icon/Fire/m';
import ThumbUp from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/base-components';
import RadioCards from '@semcore/ui/radio-cards';
import type { NSRadioCards } from '@semcore/ui/radio-cards';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = NSRadioCards.Props & {
  itemDisabled?: boolean;
  text?: string;
  textAddon?: string;
  description?: string;
  showIconAddon?: boolean;
  dot?: string;
};

const Demo = (props: ExampleProps) => {
  const {
    value,
    disabled,
    itemDisabled = false,
    text = 'Lost and Vital',
    textAddon = '24',
    description = 'Restore these backlinks first',
    showIconAddon = true,
    'aria-label': ariaLabel = 'Radio cards',
    dot,
  } = props;

  const [selected, setSelected] = React.useState(value);

  React.useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleChange: NSRadioCards.Props['onChange'] = (newValue, event) => {
    setSelected(newValue);
    props.onChange?.(newValue, event);
  };

  return (
    <Flex direction='column' gap={4}>
      <RadioCards aria-label={ariaLabel} value={selected} disabled={disabled} onChange={handleChange}>
        <RadioCards.Item
          value='1'
          text='All'
          textAddon='~90,000,000'
          dot={dot}
        />
        <RadioCards.Item
          value='2'
          text='Best'
          textAddon='300'
          description='Most valuable backlinks'
          iconAddon={<Fire />}
        />
        <RadioCards.Item
          value='3'
          text='Top New'
          textAddon='100'
          description='Recently acquired backlinks'
          disabled={itemDisabled}
        />
        <RadioCards.Item
          value='4'
          text={text}
          textAddon={textAddon}
          description={description}
          iconAddon={showIconAddon ? <ThumbUp /> : undefined}
        />
      </RadioCards>
      <Text size={200} use='secondary'>Selected value: {selected || '(none)'}</Text>
    </Flex>
  );
};

export const defaultRadioCardsProps: ExampleProps = {
  'aria-label': 'Radio cards',
  'value': '2',
  'disabled': false,
  'itemDisabled': true,
  'text': 'Lost and Vital',
  'textAddon': '24',
  'description': 'Restore these backlinks first',
  'showIconAddon': true,
};

Demo.defaultProps = defaultRadioCardsProps;

export default Demo;
