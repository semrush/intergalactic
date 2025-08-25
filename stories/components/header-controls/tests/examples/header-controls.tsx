import { Flex } from '@semcore/base-components';
import Button, { ButtonLink } from '@semcore/button';
import { HeaderButton, HeaderInput, HeaderButtonTrigger, HeaderButtonLink } from '@semcore/header-controls';
import Chevron from '@semcore/icon/ChevronDown/m';
import Close from '@semcore/icon/Close/m';
import Plus from '@semcore/icon/MathPlus/m';
import Search from '@semcore/icon/Search/m';
import Input from '@semcore/input';
import React from 'react';

const Demo = () => {
  const [focused, setFocused] = React.useState(false);

  return (
    <Flex
      p={4}
      gap={4}
      flexWrap
      style={{ background: 'var(--intergalactic-header-bg)' }}
    >
      <HeaderButton>
        Log in
      </HeaderButton>

      <HeaderButton>
        <Button.Addon>
          <img src='https://www.google.com/s2/favicons?sz=64&domain_url=semrush.com' width='16' height='16' loading='lazy' alt='' aria-hidden='true' />
        </Button.Addon>
        <Button.Text>Log in</Button.Text>
      </HeaderButton>

      <HeaderButton use='primary' theme='success' addonLeft={Search}>
        Sign up
      </HeaderButton>

      <HeaderButton>
        <Button.Addon color='icon-primary-invert' tag={Plus} />
        <Button.Text>Create project</Button.Text>
      </HeaderButton>

      <div>
        <HeaderButton neighborLocation='right'>Menu</HeaderButton>
        <HeaderButton
          use='primary'
          theme='brand'
          addonLeft={Search}
          title='Search'
          neighborLocation='left'
        />
      </div>
      <div>
        <HeaderButton neighborLocation='right'>Menu</HeaderButton>
        <HeaderButton
          addonLeft={Search}
          title='Search'
          neighborLocation='left'
        />
      </div>
      <HeaderButton use='tertiary' addonRight={Chevron}>More</HeaderButton>
      <HeaderButton use='tertiary' tag='a' href='https://www.semrush.com/pricing/'>
        Pricing
      </HeaderButton>
      <div>
        <HeaderInput w={200} neighborLocation='right'>
          <Input.Value placeholder='Search' />
        </HeaderInput>
        <HeaderButton
          addonLeft={Search}
          title='Search'
          neighborLocation='left'
        />
      </div>
      <HeaderButtonTrigger>Root domain</HeaderButtonTrigger>
      <div>
        <HeaderInput w={200} neighborLocation='right'>
          <Input.Value
            value='abc.com'
            placeholder='Search'
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <Input.Addon>
            <HeaderButtonLink
              addonLeft={Close}
              use='secondary'
              title='Clear'
              onClick={() => alert('asdf')}
              data-group-focused={focused}
            />
          </Input.Addon>
        </HeaderInput>
        <HeaderButtonTrigger neighborLocation='both'>
          Root domain
        </HeaderButtonTrigger>
        <HeaderButton
          addonLeft={Search}
          title='Search'
          neighborLocation='left'
        />
      </div>
      <div>
        <HeaderInput w={200} neighborLocation='right' state='invalid'>
          <Input.Value value='abc.com' placeholder='Search' />
          <Input.Addon tag={ButtonLink} addonLeft={Close} title='Clear' />
        </HeaderInput>
        <HeaderButtonTrigger neighborLocation='both'>
          Root domain
        </HeaderButtonTrigger>
        <HeaderButton
          addonLeft={Search}
          title='Search'
          neighborLocation='left'
        />
      </div>
      <HeaderButtonLink addonLeft={Close}>Clear</HeaderButtonLink>
      <HeaderButton size='l' use='tertiary' addonRight={Chevron}>Large</HeaderButton>
    </Flex>
  );
};

export default Demo;
