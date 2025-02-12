import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import { ButtonTrigger } from '@semcore/base-trigger';
import Divider from '@semcore/divider';
import PlusM from '@semcore/icon/MathPlus/m';
import SearchM from '@semcore/icon/Search/m';
import CloseM from '@semcore/icon/Close/m';
import { Flex, Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import Button, { ButtonLink } from '@semcore/button';
import Pin from '@semcore/icon/Pin/m';
import Settings from '@semcore/icon/Settings/m';
import ScrollArea from '@semcore/scroll-area';

const projects = [
  'project 1',
  'project 2',
  'project 3',
  'project 4',
  'project 5',
  'project 6',
  'project 7',
  'project 8',
  'project 9',
];

const Demo = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [project, setProject] = React.useState<string | null>(null);

  return (
    <DropdownMenu selectable>
      <DropdownMenu.Trigger tag={ButtonTrigger} w={220}>
        {project ?? 'Select project'}
      </DropdownMenu.Trigger>

      <DropdownMenu.Popper aria-label={'Select project popover'}>
        <Box m={1}>
          <Input>
            <Input.Addon>
              <SearchM />
            </Input.Addon>
            <Input.Value value={searchValue} onChange={setSearchValue} />
            <Input.Addon>
              {searchValue && (
                <ButtonLink
                  addonLeft={CloseM}
                  use={'secondary'}
                  aria-label={'Clear'}
                  onClick={() => setSearchValue('')}
                />
              )}
            </Input.Addon>
          </Input>
        </Box>

        <DropdownMenu.List>
          <ScrollArea shadow={true} hMax={200}>
            <ScrollArea.Container tabIndex={undefined}>
              {projects.map((projectName) => {
                return (
                  <DropdownMenu.Item
                    key={projectName}
                    onClick={() => setProject(projectName)}
                    selected={project === projectName}
                  >
                    <DropdownMenu inlineActions placement={'right'}>
                      <Flex justifyContent='space-between'>
                        <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                          {projectName}
                        </DropdownMenu.Item.Content>
                        <DropdownMenu.Actions>
                          <DropdownMenu.Item
                            tag={Button}
                            addonLeft={Settings}
                            title={'Settings'}
                            hintPlacement='right'
                          />
                          <DropdownMenu.Item
                            tag={Button}
                            addonLeft={Pin}
                            title={'Pin'}
                            hintPlacement='right'
                          />
                        </DropdownMenu.Actions>
                      </Flex>
                      <DropdownMenu.Item.Hint>{projectName}</DropdownMenu.Item.Hint>
                    </DropdownMenu>
                  </DropdownMenu.Item>
                );
              })}
            </ScrollArea.Container>
            <ScrollArea.Bar orientation='horizontal' />
            <ScrollArea.Bar orientation='vertical' />
          </ScrollArea>
          <Divider />
          <DropdownMenu.Item tag={Flex} alignItems={'center'}>
            <DropdownMenu.Item.Addon tag={PlusM} />
            <DropdownMenu.Item.Content>Create new project</DropdownMenu.Item.Content>
          </DropdownMenu.Item>
        </DropdownMenu.List>
      </DropdownMenu.Popper>
    </DropdownMenu>
  );
};

export default Demo;
