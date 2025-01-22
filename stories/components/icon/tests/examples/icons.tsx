import React from 'react';
import Button, { ButtonLink } from '@semcore/button';
import { Hint } from '@semcore/tooltip';
import Link from '@semcore/link';
import VideoListM from '@semcore/icon/VideoList/m';
import VideoListL from '@semcore/icon/VideoList/l';

const Demo = () => {
    return (
        <>
            <Button addonLeft={VideoListM} ml={4}>Button</Button>
            <Button addonLeft={VideoListL} size={'l'} ml={4}>Button L</Button>

            <ButtonLink addonLeft={VideoListM} ml={4}>Button</ButtonLink>
            <ButtonLink addonLeft={VideoListL} ml={4}>Button L</ButtonLink>
            <Hint
                ml={4}
                tag={VideoListM}
                interactive
                title='Go to our awesome article'
                color='icon-secondary-neutral'
            />
            <Hint
                ml={4}
                tag={VideoListL}
                interactive
                title='Go to our awesome article'
                color='icon-secondary-neutral'
            />

            <Link ml={4} href='#' size={300}>
                <Link.Addon>
                    <VideoListM />
                </Link.Addon>
                <Link.Text>Link</Link.Text>
            </Link>

            <Link ml={4} href='#' size={300} addonLeft={VideoListL}>
                Link L
            </Link>
        </>
    );
};

export default Demo;
