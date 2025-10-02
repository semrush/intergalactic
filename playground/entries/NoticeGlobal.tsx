import type { NoticeGlobalProps } from '@semcore/ui/notice-global';
import NoticeGlobal from '@semcore/ui/notice-global';
import React, { useState } from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

type AdditionalJSXProps = {
  message: string;
  closable: boolean;
};
export type NoticeGlobalJSXProps = JSXProps<NoticeGlobalProps> & AdditionalJSXProps;

function getJSX(props: NoticeGlobalJSXProps) {
  const [isHidden, setIsHidden] = useState(false);

  function closeHandler() {
    setIsHidden(true);
    setTimeout(() => {
      setIsHidden(false);
    }, 2000);
  }

  return (
    <NoticeGlobal
      theme={props.theme}
      closable={props.closable}
      hidden={isHidden}
      onClose={props.closable ? closeHandler : undefined}
    >
      <NoticeGlobal.Content>{props.message}</NoticeGlobal.Content>
    </NoticeGlobal>
  );
}

const entry: PlaygroundEntry<NoticeGlobalJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    theme: {
      type: 'select',
      value: 'neutral',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
      displayName: 'Theme',
    },
    closable: {
      type: 'boolean',
      value: true,
      displayName: 'Closable',
    },
    message: {
      type: 'text-area',
      value: 'You can place your message here.',
      displayName: 'Text',
    },
  },
  link: createGithubLink('notice-global'),
};

export default entry;
