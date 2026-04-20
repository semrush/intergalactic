import IconL from '@semcore/icon/Monitoring/l';
import IconM from '@semcore/icon/Monitoring/m';
import { Flex, Box } from '@semcore/ui/base-components';
import { ButtonTrigger, LinkTrigger, FilterTrigger } from '@semcore/ui/base-trigger';
import Button, { ButtonLink } from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Input from '@semcore/ui/input';
import Link from '@semcore/ui/link';
import Pills from '@semcore/ui/pills';
import Switch from '@semcore/ui/switch';
import { TagContainer } from '@semcore/ui/tag';
import { Hint, DescriptionTooltip } from '@semcore/ui/tooltip';
import { List } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>

      <Flex columnGap={2} mb={4}>
        <Hint
          title='Hinticon M'
          aria-hidden={false}
          tag={IconM}
          color='var(--intergalactic-icon-primary-success)'
        />

        <Hint
          title='Hint icon L'
          aria-hidden={false}
          tag={IconL}
          color='var(--intergalactic-icon-primary-success)'
        />

        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={ButtonLink}
            addonLeft={IconL}
            aria-label='DescriptionTooltip L'
            color='icon-secondary-neutral'
          />
        </DescriptionTooltip>

        <DescriptionTooltip>
          <DescriptionTooltip.Trigger
            tag={ButtonLink}
            addonLeft={IconM}
            aria-label='DescriptionTooltip M'
            color='icon-secondary-neutral'
          />
        </DescriptionTooltip>
      </Flex>
      <Flex columnGap={2} mb={4}>
        <FilterTrigger>
          <FilterTrigger.Addon>
            <IconL />
          </FilterTrigger.Addon>
          <FilterTrigger.Text>Filter trigger L</FilterTrigger.Text>
        </FilterTrigger>

        <FilterTrigger>
          <FilterTrigger.Addon>
            <IconM />
          </FilterTrigger.Addon>
          <FilterTrigger.Text>Filter trigger M</FilterTrigger.Text>
        </FilterTrigger>

        <LinkTrigger>
          <LinkTrigger.Addon>
            <IconM />
          </LinkTrigger.Addon>
          <LinkTrigger.Text>Link trigger M</LinkTrigger.Text>
        </LinkTrigger>

        <LinkTrigger>
          <LinkTrigger.Addon>
            <IconL />
          </LinkTrigger.Addon>
          <LinkTrigger.Text>Link trigger L</LinkTrigger.Text>
        </LinkTrigger>

        <ButtonTrigger>
          <ButtonTrigger.Addon>
            <IconM />
          </ButtonTrigger.Addon>
          <ButtonTrigger.Text>Button trigger M</ButtonTrigger.Text>
        </ButtonTrigger>

        <ButtonTrigger>
          <ButtonTrigger.Addon>
            <IconL />
          </ButtonTrigger.Addon>
          <ButtonTrigger.Text>Button trigger L</ButtonTrigger.Text>
        </ButtonTrigger>
      </Flex>
      <Flex columnGap={2} mb={4}>
        <DropdownMenu.Trigger mt={2} id='dropdown-menu-basic' tag={Button}>
          <Button.Addon>
            <IconM />
          </Button.Addon>
          <Button.Text>DDMenu Trigger M</Button.Text>
        </DropdownMenu.Trigger>

        <DropdownMenu.Trigger mt={2} id='dropdown-menu-basic' tag={Button}>
          <Button.Addon>
            <IconL />
          </Button.Addon>
          <Button.Text>DDMenu Trigger L</Button.Text>
        </DropdownMenu.Trigger>
      </Flex>
      <Flex columnGap={2} mb={4}>
        <Input w={200} mt={2}>
          <Input.Addon>
            <IconL />
          </Input.Addon>
          <Input.Value id='dynamic-search-filter-by-keyword' placeholder='Inpul with L icon' />
          <Input.Addon>
            <Hint tag={ButtonLink} use='secondary' addonLeft={IconL} title='Clear' />
          </Input.Addon>
        </Input>

        <Input w={200} mt={2}>
          <Input.Addon>
            <IconM />
          </Input.Addon>
          <Input.Value id='dynamic-search-filter-by-keyword' placeholder='Inpul with M link' />
          <Input.Addon>
            <Hint tag={ButtonLink} use='secondary' addonLeft={IconM} title='Clear' />
          </Input.Addon>
        </Input>
      </Flex>

      <Flex columnGap={2} mb={4}>
        <Button addonLeft={IconM}>AddonLeftM</Button>
        <Button addonLeft={IconL} size='l'>
          AddonLeftL
        </Button>

        <Button addonRight={IconM}>AddonRightM</Button>
        <Button addonRight={IconL} size='l'>
          AddonRightL
        </Button>

        <Button addonRight={IconM} addonLeft={IconM}>
          AddonRighLefttM
        </Button>
        <Button addonRight={IconL} addonLeft={IconL} size='l'>
          AddonRightLeftL
        </Button>

        <Button addonRight={IconL} addonLeft={IconM} size='l' disabled>
          AddonRightLeftL
        </Button>
      </Flex>

      <Flex columnGap={2} mb={4}>
        <ButtonLink title='VideoListM'>
          <ButtonLink.Addon>
            <IconM />
          </ButtonLink.Addon>
        </ButtonLink>

        <ButtonLink title='VideoListM' disabled>
          <ButtonLink.Addon>
            <IconM />
          </ButtonLink.Addon>
        </ButtonLink>
        <ButtonLink title='VideoListL'>
          <ButtonLink.Addon>
            <IconL />
          </ButtonLink.Addon>
        </ButtonLink>

        <ButtonLink addonLeft={IconM} aria-label='VideoListM' mr={2}>
          Button Link
        </ButtonLink>
        <ButtonLink addonRight={IconL} aria-label='VideoListL' mr={2} />

        <ButtonLink
          addonRight={IconL}
          aria-label='VideoListL'
          mr={2}
          tag='strong'
          color='text-critical'
          disabled
        />
      </Flex>
      <Flex columnGap={2} mb={4}>
        <Link href='#' size={300}>
          <Link.Addon>
            <IconM />
          </Link.Addon>
          <Link.Text>Link.Addon M</Link.Text>
        </Link>

        <Link href='#' size={300}>
          <Link.Addon>
            <IconL />
          </Link.Addon>
          <Link.Text>Link.Addon L</Link.Text>
        </Link>

        <Link addonLeft={IconM} aria-label='addonLeft M' href='#' />
        <Link addonLeft={IconL} aria-label='addonLeft L' href='#' />

        <Link href='#' tag={Hint} title='tag={Hint} Go to the next pageM'>
          <Link.Addon>
            <IconM />
          </Link.Addon>
        </Link>

        <Link href='#' tag={Hint} title='tag={Hint} Go to the next pageL' color='text-critical'>
          <Link.Addon>
            <IconL />
          </Link.Addon>
        </Link>

        <Link
          href='#'
          tag={Hint}
          title='tag={Hint} Go to the next pageL'
          color='text-critical'
          disabled
        >
          <Link.Addon>
            <IconL />
          </Link.Addon>
        </Link>
      </Flex>

      <Flex mb={4}>
        <Box mr={4}>
          <Switch size='l' theme='success'>
            <Switch.Value id='email-subscription' mt={0}>
              <IconM />
            </Switch.Value>
          </Switch>
        </Box>

        <Box mr={4}>
          <Switch size='xl' theme='success'>
            <Switch.Value id='email-subscription' mt={0}>
              <IconM />
            </Switch.Value>
          </Switch>
        </Box>
      </Flex>

      <Flex>
        <div>
          <List size={300} marker={<Box tag={IconM} color='icon-secondary-success' mt={1} />}>
            <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
            <List.Item marker={<Box tag={IconL} color='icon-secondary-neutral' mt={1} />}>
              (Unchecked icon L) Carpe diem.
            </List.Item>
            <List.Item>Listen to them. Children of the night. What music they make.</List.Item>
          </List>
        </div>
      </Flex>

      <Flex mt={10}>
        <TagContainer theme='primary' size='m' mr={1}>
          <TagContainer.Tag>
            <TagContainer.Tag.Addon><IconM /></TagContainer.Tag.Addon>
            <TagContainer.Tag.Text>Tag text</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
        <TagContainer theme='primary' size='l' mr={1}>
          <TagContainer.Tag>
            <TagContainer.Tag.Addon><IconM /></TagContainer.Tag.Addon>
            <TagContainer.Tag.Text>Tag text</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
        <TagContainer theme='primary' color='green-500' size='m' mr={1}>
          <TagContainer.Tag interactive>
            <TagContainer.Tag.Addon><IconM /></TagContainer.Tag.Addon>
            <TagContainer.Tag.Text>Tag text</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
        <TagContainer theme='primary' color='green-500' size='l' mr={1}>
          <TagContainer.Tag interactive>
            <TagContainer.Tag.Addon><IconM /></TagContainer.Tag.Addon>
            <TagContainer.Tag.Text>Tag text</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
        <TagContainer theme='secondary' size='m' mr={1}>
          <TagContainer.Tag>
            <TagContainer.Tag.Addon><IconM /></TagContainer.Tag.Addon>
            <TagContainer.Tag.Text>Tag text</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
        <TagContainer theme='secondary' size='l' mr={1}>
          <TagContainer.Tag>
            <TagContainer.Tag.Addon><IconM /></TagContainer.Tag.Addon>
            <TagContainer.Tag.Text>Tag text</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
      </Flex>

      <Pills defaultValue={1} mr={4} mt={4}>
        <Pills.Item value={1} addonLeft={IconM}>A</Pills.Item>
        <Pills.Item value={2} addonLeft={IconM}>B</Pills.Item>
        <Pills.Item value={3} addonLeft={IconM}>C</Pills.Item>
      </Pills>

      <Pills size='l' defaultValue={1}>
        <Pills.Item value={1} addonLeft={IconM}>A</Pills.Item>
        <Pills.Item value={2} addonLeft={IconM}>B</Pills.Item>
        <Pills.Item value={3} addonLeft={IconM}>C</Pills.Item>
      </Pills>
    </>
  );
};

export default Demo;
