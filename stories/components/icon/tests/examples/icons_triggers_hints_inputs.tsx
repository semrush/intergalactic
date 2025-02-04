import React from 'react';
import Button, { ButtonLink } from '@semcore/button';
import VideoListM from '@semcore/icon/VideoList/m';
import VideoListL from '@semcore/icon/VideoList/l';
import { ButtonTrigger, LinkTrigger, FilterTrigger } from '@semcore/base-trigger';
import '@semcore/utils/lib/themes/default.css';
import Tooltip, { Hint, DescriptionTooltip } from '@semcore/tooltip';
import { Flex } from '@semcore/flex-box';
import Input from '@semcore/input';
import Icon from '@semcore/icon';
import DropdownMenu from '@semcore/dropdown-menu';

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
        </>
    );
};

export default Demo;
