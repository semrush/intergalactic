import InfoM from '@semcore/icon/Info/m';
import Button, { ButtonLink } from '@semcore/ui/button';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import Link from '@semcore/ui/link';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type HeaderConfig = {
  closable?: boolean;
  showClose?: boolean;
  showBack?: boolean;
  backText?: string;
  backWMax?: string;
  titleText?: string;
  titleWidth?: number;
  descriptionText?: string;
  showDescriptionTooltip?: boolean;
  hasBody?: boolean;
  hasFooter?: boolean;
};

const Demo = (props: HeaderConfig) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>

      <FullscreenModal
        disablePortal
        visible={visible}
        onClose={() => setVisible(false)}
        closable={props.closable}
      >
        {props.showClose && <FullscreenModal.Close />}

        {props.showBack && (
          <FullscreenModal.Back wMax={props.backWMax}>
            {props.backText}
          </FullscreenModal.Back>
        )}

        <FullscreenModal.Header>
          {props.titleText && (
            <FullscreenModal.Title w={props.titleWidth}>
              {props.titleText}
            </FullscreenModal.Title>
          )}

          {props.descriptionText && (
            <FullscreenModal.Description>
              {props.descriptionText}
              {props.showDescriptionTooltip && (
                <>
                  {' '}
                  <DescriptionTooltip>
                    <DescriptionTooltip.Trigger
                      tag={ButtonLink}
                      addonLeft={InfoM}
                      color='icon-secondary-neutral'
                      size={100}
                      top='-1px'
                      aria-label='More information'
                    />
                    <DescriptionTooltip.Popper aria-labelledby='modal-description-tooltip'>
                      <Text tag='p'>
                        Additional context about this modal window and its purpose.
                        {' '}
                        <Link href='#'>Learn more</Link>
                      </Text>
                    </DescriptionTooltip.Popper>
                  </DescriptionTooltip>
                </>
              )}
            </FullscreenModal.Description>
          )}
        </FullscreenModal.Header>

        {props.hasBody && (
          <FullscreenModal.Body>
            <FullscreenModal.Section>
              <Text>Modal body content goes here</Text>
            </FullscreenModal.Section>
          </FullscreenModal.Body>
        )}

        {props.hasFooter && (
          <FullscreenModal.Footer>
            <Button use='primary'>Submit</Button>
            <Button use='secondary' ml={2}>Cancel</Button>
          </FullscreenModal.Footer>
        )}
      </FullscreenModal>
    </>
  );
};

export const defaultProps: HeaderConfig = {
  closable: true,
  showClose: false,
  showBack: false,
  backText: 'Go to Tool Name',
  titleText: 'Modal Window Title',
  descriptionText: 'Additional information about this modal',
  showDescriptionTooltip: false,
  hasBody: true,
  hasFooter: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
