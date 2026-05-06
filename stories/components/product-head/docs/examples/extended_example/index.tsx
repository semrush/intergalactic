import BookM from '@semcore/icon/Book/m';
import Chat from '@semcore/icon/Chat/m';
import ChevronRight from '@semcore/icon/ChevronRight/m';
import InfoM from '@semcore/icon/Info/m';
import MathPlus from '@semcore/icon/MathPlus/m';
import SettingsM from '@semcore/icon/Settings/m';
import { Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Button, { ButtonLink } from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Link from '@semcore/ui/link';
import Modal from '@semcore/ui/modal';
import Header, { Info, Title } from '@semcore/ui/product-head';
import Select from '@semcore/ui/select';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { AddProjectWizard } from './AddProjectWizard';
import { CountrySelect } from './CountrySelect';
import { EditableName } from './EditableName';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [secondVisible, setSecondVisible] = React.useState(false);

  const handleClose = () => setVisible(false);
  const handleSecondClose = () => setSecondVisible(false);

  const openSettingsModal = () => setVisible(true);

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
            <Link href='#' addonLeft={BookM}>User manual</Link>
            <ButtonLink addonLeft={Chat}>Feedback</ButtonLink>
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
              <DropdownMenu.Menu w={200}>
                <DropdownMenu.Item onClick={openSettingsModal}>Open Modal</DropdownMenu.Item>
                <DropdownMenu.Item onClick={openSettingsModal}>Open Modal one more time</DropdownMenu.Item>

                <DropdownMenu.Item>
                  <DropdownMenu inlineActions placement='right'>
                    <Flex justifyContent='space-between' gap={3}>
                      <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                        Open again?
                      </DropdownMenu.Item.Content>
                      <DropdownMenu.Actions gap={1}>
                        <DropdownMenu.Item tag={Button} addonLeft={MathPlus} title='Add new' />
                        <DropdownMenu.Item tag={Button} addonLeft={SettingsM} title='Delete' />
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
                      Static menu item. Nothing will happen.
                      <ChevronRight color='icon-secondary-neutral' />
                    </DropdownMenu.Item.Content>
                    <DropdownMenu.Menu>
                      <DropdownMenu.Item>Okay. Got it!</DropdownMenu.Item>
                      <DropdownMenu.Item>Oh no</DropdownMenu.Item>
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

      <Modal visible={visible} onClose={handleClose}>
        <Text size={200} mb={3} tag='p'>
          Open one more window
        </Text>
        <Button use='primary' onClick={() => setSecondVisible(true)}>
          Open modal
        </Button>
      </Modal>
      <Modal visible={secondVisible} onClose={handleSecondClose}>
        <Text size={200} mb={3} tag='p'>
          Your changes will be lost if you don't save them.
        </Text>
        <Button use='primary' theme='success' onClick={handleSecondClose}>
          Save changes
        </Button>
        <Button ml={2} onClick={handleSecondClose}>
          Cancel
        </Button>
      </Modal>
    </>
  );
};

export default Demo;
