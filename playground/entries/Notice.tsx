import QuestionAltM from '@semcore/icon/Question/m';
import Button from '@semcore/ui/button';
import type { NSNotice } from '@semcore/ui/notice';
import Notice from '@semcore/ui/notice';
import React, { useState } from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

type AdditionalJSXProps = {
  label: boolean;
  title: string;
  closable: boolean;
  message: string;
  actions: boolean;
};
export type NoticeJSXProps = JSXProps<NSNotice.Props> & AdditionalJSXProps;

function getJSX(props: NoticeJSXProps) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <Notice theme={props.theme} hidden={isHidden}>
      {props.label && (
        <Notice.Label>
          <QuestionAltM />
        </Notice.Label>
      )}
      <Notice.Content>
        {props.title && <Notice.Title>{props.title}</Notice.Title>}
        {props.title || props.label || props.closable ? <Notice.Text>{props.message}</Notice.Text> : props.message}
        {props.actions && (
          <Notice.Actions>
            <Button use='primary' theme='success'>
              Wow, so cool!
            </Button>
            <Button use='tertiary'>
              Don't think so
            </Button>
          </Notice.Actions>
        )}
      </Notice.Content>
      {props.closable && (
        <Notice.Close
          onClick={() => {
            setIsHidden(true);
            setTimeout(() => {
              setIsHidden(false);
            }, 2000);
          }}
        />
      )}
    </Notice>
  );
}

const entry: PlaygroundEntry<NoticeJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    theme: {
      type: 'select',
      value: 'info',
      options: ['info', 'muted', 'success', 'warning', 'danger'],
      displayName: 'Theme',
    },
    label: {
      type: 'boolean',
      value: true,
      displayName: 'Label',
    },
    actions: {
      type: 'boolean',
      value: true,
      displayName: 'Actions',
    },
    closable: {
      type: 'boolean',
      value: true,
      displayName: 'Close button',
    },
    title: {
      type: 'text-area',
      value: 'Look at this notice!',
      displayName: 'Title',
    },
    message: {
      type: 'text-area',
      value: 'You can place your message here.',
      displayName: 'Text',
    },
  },
  link: createGithubLink('notice'),
};

export default entry;
