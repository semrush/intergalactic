import BookM from '@semcore/icon/Book/m';
import Chat from '@semcore/icon/Chat/m';
import ChevronRight from '@semcore/icon/ChevronRight/m';
import InfoM from '@semcore/icon/Info/m';
import MathPlus from '@semcore/icon/MathPlus/m';
import Settings from '@semcore/icon/Settings/m';
import SettingsM from '@semcore/icon/Settings/m';
import { Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Button, { ButtonLink } from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Link from '@semcore/ui/link';
import Header, { Info, Title } from '@semcore/ui/product-head';
import Select from '@semcore/ui/select';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import React from 'react';

import { AddProjectWizard } from './AddProjectWizard';
import { CountrySelect } from './CountrySelect';
import { EditableName } from './EditableName';

const Demo = () => {
  return (
    <>
      <Header>
        <Header.Row>
          <Breadcrumbs>
            <Breadcrumbs.Item href='#'>Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#'>Domain.com</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#' active>
              Tool Name
            </Breadcrumbs.Item>
          </Breadcrumbs>

          <Header.Links>
            <ButtonLink addonLeft={Chat}>Feedback</ButtonLink>
            <Link href='#' addonLeft={BookM}>User manual</Link>
          </Header.Links>
        </Header.Row>

        <Header.Row>
          <Title toolName='Tool Name:'>
            <EditableName />
          </Title>

          <Header.Buttons>
            <AddProjectWizard />

            <DropdownMenu>
              <DropdownMenu.Trigger tag={Button} addonLeft={SettingsM}>Settings</DropdownMenu.Trigger>
              <DropdownMenu.Menu w={160}>
                <DropdownMenu.Item>Menu item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Menu item 2</DropdownMenu.Item>

                <DropdownMenu.Item>
                  <DropdownMenu inlineActions placement='right'>
                    <Flex justifyContent='space-between' gap={3}>
                      <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                        Menu item 3
                      </DropdownMenu.Item.Content>
                      <DropdownMenu.Actions gap={1}>
                        <DropdownMenu.Item tag={Button} addonLeft={MathPlus} title='Add new' />
                        <DropdownMenu.Item tag={Button} addonLeft={Settings} title='Delete' />
                      </DropdownMenu.Actions>
                    </Flex>
                  </DropdownMenu>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <DropdownMenu
                    placement='left-start'
                    interaction={DropdownMenu.nestedMenuInteraction}
                    timeout={[0, 300]}
                    offset={[-11, 12]}
                  >
                    <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                      Menu item 4
                      <ChevronRight color='icon-secondary-neutral' />
                    </DropdownMenu.Item.Content>
                    <DropdownMenu.Menu>
                      <DropdownMenu.Item>Add</DropdownMenu.Item>
                      <DropdownMenu.Item>Delete</DropdownMenu.Item>
                    </DropdownMenu.Menu>
                  </DropdownMenu>
                </DropdownMenu.Item>
              </DropdownMenu.Menu>
            </DropdownMenu>
          </Header.Buttons>
        </Header.Row>

        <Header.Row>
          <Info>
            <CountrySelect />
            <Info.Item>
              <Info.Item.Label tag='label' htmlFor='select-device'>
                Device:
              </Info.Item.Label>
              <Select
                id='select-device'
                defaultValue='Desktop'
                placeholder='Select option'
                m='auto'
                tag={LinkTrigger}
                options={[
                  { value: 'Desktop', children: 'Desktop' },
                  { value: 'Mobile', children: 'Mobile' },
                ]}
              />
            </Info.Item>
            <Info.Item label='Last update:'>
              1 hour ago
              <DescriptionTooltip>
                <DescriptionTooltip.Trigger
                  tag={ButtonLink}
                  addonLeft={InfoM}
                  display='inline-flex'
                  ml={1}
                  mt='-1.5px'
                  color='icon-secondary-neutral'
                  aria-label='About update rate'
                />
                <DescriptionTooltip.Popper aria-label='About update rate'>
                  Some details about data update rates.
                </DescriptionTooltip.Popper>
              </DescriptionTooltip>
            </Info.Item>
          </Info>
        </Header.Row>
      </Header>
    </>
  );
};

export default Demo;
