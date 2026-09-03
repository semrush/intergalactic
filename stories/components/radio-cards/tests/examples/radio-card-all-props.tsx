import Fire from '@semcore/icon/Fire/m';
import ThumbUp from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/base-components';
import RadioCards from '@semcore/ui/radio-cards';
import type { NSRadioCards } from '@semcore/ui/radio-cards';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = NSRadioCards.Props & {
  disabledCard?: 'none' | '1' | '2' | '3' | '4';
  loadingCard?: 'none' | '1' | '2' | '3' | '4';
  text?: string;
  textAddon?: string;
  description?: string;
  showIconAddon?: boolean;
  dot?: boolean;
  uncontrolled?: boolean;
};

const Demo: ((props: ExampleProps) => React.ReactElement) & { defaultProps: ExampleProps } = (props: ExampleProps) => {
  const {
    value,
    defaultValue,
    disabled,
    disabledCard = 'none',
    loadingCard = 'none',
    text = 'Lost and Vital',
    textAddon = '24',
    description = 'Restore these backlinks first',
    showIconAddon = true,
    'aria-label': ariaLabel = 'Radio cards',
    dot = false,
    uncontrolled = false,
  } = props;

  /*
    In uncontrolled mode `value` is not passed to RadioCards at all, so the component
    manages its own state from `defaultValue`. Pass `defaultValue: undefined` alongside
    to render the group with no initial selection.
  */
  const [selected, setSelected] = React.useState(uncontrolled ? defaultValue : value);

  React.useEffect(() => {
    if (!uncontrolled) {
      setSelected(value);
    }
  }, [value, uncontrolled]);

  const handleChange: NSRadioCards.Props['onChange'] = (newValue, event) => {
    setSelected(newValue);
    props.onChange?.(newValue, event);
  };

  const cards = (
    <>
      <RadioCards.Item
        value='1'
        text='All'
        textAddon='~90,000,000'
        dot={dot ? 'New' : undefined}
        disabled={disabledCard === '1'}
        loading={loadingCard === '1'}
      />
      <RadioCards.Item
        value='2'
        text='Best'
        textAddon='300'
        description='Most valuable backlinks'
        iconAddon={<Fire />}
        disabled={disabledCard === '2'}
        loading={loadingCard === '2'}
      />
      <RadioCards.Item
        value='3'
        text='Top New'
        textAddon='100'
        description='Recently acquired backlinks'
        disabled={disabledCard === '3'}
        loading={loadingCard === '3'}
      />
      <RadioCards.Item
        value='4'
        text={text}
        textAddon={textAddon}
        description={description}
        iconAddon={showIconAddon ? <ThumbUp /> : undefined}
        disabled={disabledCard === '4'}
        loading={loadingCard === '4'}
      />
    </>
  );

  return (
    <Flex direction='column' gap={4}>
      {uncontrolled
        ? (
            <RadioCards
              aria-label={ariaLabel}
              name='radio-cards'
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={handleChange}
            >
              {cards}
            </RadioCards>
          )
        : (
            <RadioCards
              aria-label={ariaLabel}
              name='radio-cards'
              value={selected}
              disabled={disabled}
              onChange={handleChange}
            >
              {cards}
            </RadioCards>
          )}
      <Text size={200} use='secondary'>Selected value: {selected || '(none)'}</Text>
    </Flex>
  );
};

export const defaultRadioCardsProps: ExampleProps = {
  'aria-label': 'Radio cards',
  'value': '2',
  'uncontrolled': false,
  'disabled': false,
  'disabledCard': '3',
  'loadingCard': 'none',
  'text': 'Lost and Vital',
  'textAddon': '24',
  'description': 'Restore these backlinks first',
  'showIconAddon': true,
  'dot': false,
  'name': 'radio-cards',
};

Demo.defaultProps = defaultRadioCardsProps;

export default Demo;
