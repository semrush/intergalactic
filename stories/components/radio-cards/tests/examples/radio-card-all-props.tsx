import Fire from '@semcore/icon/Fire/m';
import ThumbUp from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/base-components';
import RadioCards from '@semcore/ui/radio-cards';
import type { NSRadioCards } from '@semcore/ui/radio-cards';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = NSRadioCards.Props & {
  disabledCard?: 'none' | '1' | '2' | '3' | '4';
  text?: string;
  textAddon?: string;
  description?: string;
  showIconAddon?: boolean;
  dot?: boolean;
};

const Demo = (props: ExampleProps) => {
  const {
    value,
    disabled,
    disabledCard = 'none',
    text = 'Lost and Vital',
    textAddon = '24',
    description = 'Restore these backlinks first',
    showIconAddon = true,
    'aria-label': ariaLabel = 'Radio cards',
    dot = false,
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
      <RadioCards aria-label={ariaLabel} name='radio-cards' value={selected} disabled={disabled} onChange={handleChange}>
        <RadioCards.Item
          value='1'
          text='All'
          textAddon='~90,000,000'
          dot={dot ? 'New' : undefined}
          disabled={disabledCard === '1'}
        />
        <RadioCards.Item
          value='2'
          text='Best'
          textAddon='300'
          description='Most valuable backlinks'
          iconAddon={<Fire />}
          disabled={disabledCard === '2'}
        />
        <RadioCards.Item
          value='3'
          text='Top New'
          textAddon='100'
          description='Recently acquired backlinks'
          disabled={disabledCard === '3'}
        />
        <RadioCards.Item
          value='4'
          text={text}
          textAddon={textAddon}
          description={description}
          iconAddon={showIconAddon ? <ThumbUp /> : undefined}
          disabled={disabledCard === '4'}
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
  'disabledCard': '3',
  'text': 'Lost and Vital',
  'textAddon': '24',
  'description': 'Restore these backlinks first',
  'showIconAddon': true,
  'dot': false,
  'name': 'radio-cards',
};

Demo.defaultProps = defaultRadioCardsProps;

export default Demo;
