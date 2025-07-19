import { Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import { HeaderButton, HeaderInput, HeaderButtonTrigger } from '@semcore/header-controls';
import Chevron from '@semcore/icon/ChevronDown/m';
import Search from '@semcore/icon/Search/m';
import Input from '@semcore/input';
import React from 'react';

const Demo = () => {
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

      <div>
        <HeaderButton neighborLocation='right'>Search</HeaderButton>
        <HeaderButton use='primary' theme='brand' addonLeft={Search} title='Search' neighborLocation='left' />
      </div>
      <div>
        <HeaderButton neighborLocation='right'>Search</HeaderButton>
        <HeaderButton addonLeft={Search} title='Search' neighborLocation='left' />
      </div>
      <HeaderButton use='tertiary' addonRight={Chevron}>More</HeaderButton>
      <HeaderButton use='tertiary' tag='a' href='https://www.semrush.com/pricing/'>Pricing</HeaderButton>
      <div>
        <HeaderInput w={200} neighborLocation='right'><Input.Value placeholder='Search' /></HeaderInput>
        <HeaderButton addonLeft={Search} title='Search' neighborLocation='left' />
      </div>
      <HeaderButtonTrigger>asdf</HeaderButtonTrigger>
    </Flex>
  );
};

export default Demo;
