import React from 'react';
import Button, { ButtonLink } from '@semcore/button';
import VideoListM from '@semcore/icon/VideoList/m';
import VideoListL from '@semcore/icon/VideoList/l';
import { ButtonTrigger, LinkTrigger, FilterTrigger } from '@semcore/base-trigger';
import  { Hint, DescriptionTooltip } from '@semcore/tooltip';
import { Flex, Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import Link from '@semcore/link';
import Switch from '@semcore/switch';
import DropdownMenu from '@semcore/dropdown-menu';
import { List } from '@semcore/ui/typography';

const Demo = () => {
    return (
        <>
            <Flex columnGap={2} mb={4}>
                <Hint
                    title='Hinticon M'
                    aria-hidden={false}
                    tag={VideoListM}
                    color='var(--intergalactic-icon-primary-success)'
                />

                <Hint
                    title='Hint icon L'
                    aria-hidden={false}
                    tag={VideoListL}
                    color='var(--intergalactic-icon-primary-success)'
                />

                <DescriptionTooltip>
                    <DescriptionTooltip.Trigger
                        tag={ButtonLink}
                        addonLeft={VideoListL}
                        aria-label='DescriptionTooltip L'
                        color='icon-secondary-neutral'
                    />
                </DescriptionTooltip>

                <DescriptionTooltip>
                    <DescriptionTooltip.Trigger

                        tag={ButtonLink}
                        addonLeft={VideoListM}
                        aria-label='DescriptionTooltip M'
                        color='icon-secondary-neutral'
                    />
                </DescriptionTooltip>
</Flex>
                <Flex columnGap={2} mb={4}>
                <FilterTrigger>
                    <FilterTrigger.Addon>
                        <VideoListL />
                    </FilterTrigger.Addon>
                    <FilterTrigger.Text>Filter trigger L</FilterTrigger.Text>
                </FilterTrigger>

                <FilterTrigger>
                    <FilterTrigger.Addon>
                        <VideoListM />
                    </FilterTrigger.Addon>
                    <FilterTrigger.Text>Filter trigger M</FilterTrigger.Text>
                </FilterTrigger>

                <LinkTrigger>
                    <LinkTrigger.Addon>
                        <VideoListM />
                    </LinkTrigger.Addon>
                    <LinkTrigger.Text>Link trigger M</LinkTrigger.Text>
                </LinkTrigger>

                <LinkTrigger>
                    <LinkTrigger.Addon>
                        <VideoListL />
                    </LinkTrigger.Addon>
                    <LinkTrigger.Text>Link trigger L</LinkTrigger.Text>
                </LinkTrigger>

                <ButtonTrigger>
                    <ButtonTrigger.Addon>
                        <VideoListM />
                    </ButtonTrigger.Addon>
                    <ButtonTrigger.Text>Button trigger M</ButtonTrigger.Text>
                </ButtonTrigger>

                <ButtonTrigger>
                    <ButtonTrigger.Addon>
                        <VideoListL />
                    </ButtonTrigger.Addon>
                    <ButtonTrigger.Text>Button trigger L</ButtonTrigger.Text>
                </ButtonTrigger>
                </Flex>
                <Flex columnGap={2} mb={4}>
                <DropdownMenu.Trigger mt={2}  id='dropdown-menu-basic' tag={Button}>
                    <Button.Addon>
                        <VideoListM />
                    </Button.Addon>
                    <Button.Text>DDMenu Trigger M</Button.Text>
                </DropdownMenu.Trigger>

                <DropdownMenu.Trigger mt={2}  id='dropdown-menu-basic' tag={Button}>
                    <Button.Addon>
                        <VideoListL />
                    </Button.Addon>
                    <Button.Text>DDMenu Trigger L</Button.Text>
                </DropdownMenu.Trigger>

                </Flex>
                <Flex columnGap={2} mb={4}>
                <Input w={200} mt={2}>
                    <Input.Addon>
                        <VideoListL />
                    </Input.Addon>
                    <Input.Value
                        id='dynamic-search-filter-by-keyword'
                        placeholder='Inpul with L icon'
                    />
                    <Input.Addon>
                        <Hint
                            tag={ButtonLink}
                            use='secondary'
                            addonLeft={VideoListL}
                            title='Clear'
                        />
                    </Input.Addon>
                </Input>

                <Input w={200} mt={2}>
                    <Input.Addon>
                        <VideoListM />
                    </Input.Addon>
                    <Input.Value
                        id='dynamic-search-filter-by-keyword'
                        placeholder='Inpul with M link'
                    />
                    <Input.Addon>
                        <Hint
                            tag={ButtonLink}
                            use='secondary'
                            addonLeft={VideoListM}
                            title='Clear'
                        />
                    </Input.Addon>
                </Input>

            </Flex>

            <Flex columnGap={2} mb = {4}>
            <Button addonLeft={VideoListM} >AddonLeftM</Button>
            <Button addonLeft={VideoListL} size={'l'} >AddonLeftL</Button>

            <Button addonRight={VideoListM} >AddonRightM</Button>
            <Button addonRight={VideoListL} size={'l'} >AddonRightL</Button>

            <Button addonRight={VideoListM} addonLeft={VideoListM} >AddonRighLefttM</Button>
            <Button addonRight={VideoListL}addonLeft={VideoListL} size={'l'} >AddonRightLeftL</Button>

            <Button addonRight={VideoListL}addonLeft={VideoListM} size={'l'}  disabled>AddonRightLeftL</Button>
            </Flex>

            <Flex columnGap={2} mb={4}>  
            <ButtonLink title='VideoListM'>
      <ButtonLink.Addon>
        <VideoListM />
      </ButtonLink.Addon>
    </ButtonLink>

    <ButtonLink title='VideoListM' disabled>
      <ButtonLink.Addon>
        <VideoListM />
      </ButtonLink.Addon>
    </ButtonLink>
    <ButtonLink title='VideoListL'>
      <ButtonLink.Addon>
        <VideoListL />
      </ButtonLink.Addon>
    </ButtonLink>


    

    <ButtonLink addonLeft={VideoListM} aria-label='VideoListM' mr={2}>Button Link</ButtonLink>
    <ButtonLink addonRight={VideoListL} aria-label='VideoListL' mr={2} />

    <ButtonLink addonRight={VideoListL} aria-label='VideoListL' mr={2} tag='strong'  color='text-critical' disabled/>
    </Flex>
    <Flex columnGap={2} mb={4}>
                <Link href='#' size={300}>
                    <Link.Addon>
                        <VideoListM />
                    </Link.Addon>
                    <Link.Text>Link.Addon M</Link.Text>
                </Link>

                <Link href='#' size={300}>
                    <Link.Addon>
                        <VideoListL />
                    </Link.Addon>
                    <Link.Text>Link.Addon L</Link.Text>
                </Link>

                <Link addonLeft={VideoListM} aria-label='addonLeft M' href='#' />
                <Link addonLeft={VideoListL} aria-label='addonLeft L' href='#' />

                <Link href='#' tag={Hint} title={'tag={Hint} Go to the next pageM'}>
                    <Link.Addon>
                        <VideoListM />
                    </Link.Addon>
                </Link>

                <Link href='#' tag={Hint} title={'tag={Hint} Go to the next pageL'} color='text-critical'>
                    <Link.Addon>
                        <VideoListL />
                    </Link.Addon>
                </Link>

                <Link href='#' tag={Hint} title={'tag={Hint} Go to the next pageL'} color='text-critical' disabled>
                    <Link.Addon>
                        <VideoListL />
                    </Link.Addon>
                </Link>
            </Flex>

            <Flex mb={4}>
            <Box mr = {4}>
        <Switch size='l'  theme='success'>
          <Switch.Value id='email-subscription' mt={0}>
            <VideoListM />
          </Switch.Value>
        </Switch>
      </Box>

      <Box mr = {4}>
        <Switch size='xl' theme='success'>
          <Switch.Value id='email-subscription' mt={0}>
            <VideoListM />
          </Switch.Value>
        </Switch>
      </Box>
            </Flex>


            <Flex>
            <div>
    <List size={300} marker={<VideoListM color='icon-secondary-success' mt={1} />}>
      <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item marker={<VideoListL color='icon-secondary-neutral' mt={1} />}>
        (Unchecked icon L) Carpe diem.
      </List.Item>
      <List.Item>Listen to them. Children of the night. What music they make.</List.Item>
    </List>
  </div>
            </Flex>

        </>
    );
};

export default Demo;
