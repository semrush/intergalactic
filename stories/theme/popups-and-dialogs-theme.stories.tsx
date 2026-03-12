import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Carousel from '@semcore/ui/carousel';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import FeaturePopover from '@semcore/ui/feature-popover';
import { FeedbackRating } from '@semcore/ui/feedback-form';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import Link from '@semcore/ui/link';
import Modal from '@semcore/ui/modal';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import SidePanel from '@semcore/ui/side-panel';
import SpinContainer from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import Wizard from '@semcore/ui/wizard';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { ThemePlaygroundLayout } from './theme-playground-switcher';
import './theme-playground-fonts.css';

const LAZZER_FONT = '\'Lazzer\', sans-serif';

const meta: Meta = {
  title: 'Theme/Popups and Dialogs Theme',
};

export default meta;

type Story = StoryObj;

const CAROUSEL_ITEMS = [
  { src: 'https://picsum.photos/id/1023/600/400', alt: 'A cyclist performing stunts in the forest' },
  { src: 'https://picsum.photos/id/1024/600/400', alt: 'A vulture flies with its wings spread wide' },
  { src: 'https://picsum.photos/id/1025/600/400', alt: 'A pug wrapped in a blanket in the forest' },
];
const CAROUSEL_WIDTH = 400;
const CAROUSEL_IMAGE_WIDTH = CAROUSEL_WIDTH - 75;

const WIZARD_STEPS = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Step 3' },
];

const noticeBubbleManager = new NoticeBubbleManager();

function PopupsAndDialogsContent() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [fullscreenVisible, setFullscreenVisible] = React.useState(false);
  const [sidePanelVisible, setSidePanelVisible] = React.useState(false);
  const [wizardVisible, setWizardVisible] = React.useState(false);
  const [wizardStep, setWizardStep] = React.useState(1);
  const [feedbackRatingVisible, setFeedbackRatingVisible] = React.useState(false);
  const [feedbackRatingValue, setFeedbackRatingValue] = React.useState(0);
  const [feedbackRatingNotification, setFeedbackRatingNotification] = React.useState(true);
  const [feedbackRatingStatus, setFeedbackRatingStatus] = React.useState<'default' | 'loading' | 'success' | 'error'>('default');

  const handleFeedbackRatingVisibleChange = React.useCallback((visible: boolean, rating: number) => {
    setFeedbackRatingVisible(visible);
    setFeedbackRatingValue(visible ? rating : 0);
  }, []);

  const handleFeedbackRatingSubmit = React.useCallback(async (values: Record<string, unknown>) => {
    setFeedbackRatingStatus('loading');
    await new Promise((r) => setTimeout(r, 500));
    setFeedbackRatingStatus('success');
    setFeedbackRatingVisible(false);
    setFeedbackRatingNotification(false);
  }, []);

  return (
    <ThemePlaygroundLayout dropdownMenuProps={{ disablePortal: true }} switcherZIndex={10000}>
      <Box p={6} style={{ background: 'var(--intergalactic-bg-primary-neutral)' }}>
        <Flex alignItems='center' mb={10}>
          <Text tag='h1' semibold size={600} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
            Popups, dialogs and overlays theme
          </Text>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Carousel
        </Text>
        <Box w={CAROUSEL_WIDTH} mb={10}>
          <Carousel
            w={CAROUSEL_WIDTH}
            aria-label='Theme playground carousel'
            indicators='default'
            zoom
            zoomWidth={800}
          >
            {CAROUSEL_ITEMS.map((item, index) => (
              <Carousel.Item key={item.src} w={CAROUSEL_IMAGE_WIDTH}>
                <img
                  role='button'
                  src={item.src}
                  alt={item.alt}
                  aria-label={`Open in fullscreen ${item.alt}`}
                  style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Box>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          DropdownMenu
        </Text>
        <Flex gap={4} flexWrap alignItems='center' mb={10}>
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button}>Open menu</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>Item 1</DropdownMenu.Item>
              <DropdownMenu.Item>Item 2</DropdownMenu.Item>
              <DropdownMenu.Item>Item 3</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          FeaturePopover
        </Text>
        <Flex gap={4} flexWrap alignItems='flex-start' mb={10}>
          <FeaturePopover {...({ interaction: 'click' } as Record<string, unknown>)} disablePortal placement='right-start'>
            <FeaturePopover.Trigger>
              <Button>Open popover</Button>
            </FeaturePopover.Trigger>
            <FeaturePopover.Popper closeIcon wMax={280} aria-label='Feature popover'>
              <Text size={300} bold tag='h3' mb={1} mt={0}>
                Popover title
              </Text>
              <Text size={200} color='text-secondary'>
                Short description for theme playground.
              </Text>
            </FeaturePopover.Popper>
          </FeaturePopover>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          FullscreenModal
        </Text>
        <Flex gap={4} flexWrap alignItems='center' mb={10}>
          <Button onClick={() => setFullscreenVisible(true)}>Open FullscreenModal</Button>
          <FullscreenModal visible={fullscreenVisible} onClose={() => setFullscreenVisible(false)}>
            <FullscreenModal.Close />
            <FullscreenModal.Back>Back</FullscreenModal.Back>
            <FullscreenModal.Header title='Fullscreen modal' description='Theme playground example' />
            <FullscreenModal.Body>
              <FullscreenModal.Section>
                <Text>Body content</Text>
              </FullscreenModal.Section>
            </FullscreenModal.Body>
            <FullscreenModal.Footer
              justifyContent='center'
              alignItems='center'
              gap={3}
              py={3}
            >
              <Button use='primary'>Submit</Button>
              <Button ml={2} onClick={() => setFullscreenVisible(false)}>Cancel</Button>
            </FullscreenModal.Footer>
          </FullscreenModal>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          FeedbackRating
        </Text>
        <Flex gap={4} flexWrap alignItems='center' mb={10}>
          <FeedbackRating
            notificationVisible={feedbackRatingNotification}
            notificationText='Is it working well for you?'
            learnMoreLink='https://developer.semrush.com/intergalactic/patterns/feedback-rating/feedback-rating-a11y'
            header='Great! What do you like the most?'
            submitText='Send feedback'
            initialValues={{
              rating: 0,
              description: '',
              email: '',
              option1: false,
              option2: false,
              option3: false,
            }}
            rating={feedbackRatingValue}
            visible={feedbackRatingVisible}
            onVisibleChange={handleFeedbackRatingVisibleChange}
            onNotificationClose={() => setFeedbackRatingNotification(false)}
            status={feedbackRatingStatus}
            onSubmit={handleFeedbackRatingSubmit}
            errorFeedbackEmail='feedback@example.com'
            formConfig={[
              { key: 'option1', label: 'Score is more accurate', type: 'checkbox' },
              { key: 'option2', label: 'Formula is more transparent', type: 'checkbox' },
              { key: 'option3', label: 'It\'s easier to use for evaluation', type: 'checkbox' },
              {
                key: 'description',
                label: 'If there anything we could improve?',
                type: 'textarea',
                validate: FeedbackRating.validate.description('Please share your ideas.'),
              },
              {
                key: 'email',
                label: 'Reply-to email',
                type: 'email',
                validate: FeedbackRating.validate.email('Please enter valid email'),
                description: (
                  <>
                    We will only use this email to respond to you on your feedback.
                    {' '}
                    <Link href='https://www.semrush.com/company/legal/privacy-policy/'>Privacy Policy</Link>
                  </>
                ),
              },
            ]}
          />
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Modal
        </Text>
        <Flex gap={4} flexWrap alignItems='center' mb={10}>
          <Button onClick={() => setModalVisible(true)}>Open modal</Button>
          <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Title>Modal title</Modal.Title>
            <Text size={200} mb={4} tag='p'>
              Modal content for theme playground.
            </Text>
            <Button use='primary' size='l' onClick={() => setModalVisible(false)}>
              Close
            </Button>
          </Modal>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          NoticeBubble
        </Text>
        <Flex gap={4} flexWrap alignItems='center' mb={10}>
          <Button
            onClick={() =>
              noticeBubbleManager.add({
                type: 'info',
                children: (
                  <>
                    Link was moved to
                    {' '}
                    <Link href='#'>Cats from outer space group</Link>
                  </>
                ),
                duration: 2000,
              })}
          >
            Show info notice
          </Button>
          <Button
            onClick={() =>
              noticeBubbleManager.add({
                type: 'warning',
                children: 'Something went wrong. Please try again.',
                duration: 2000,
              })}
          >
            Show warning notice
          </Button>
          <NoticeBubbleContainer manager={noticeBubbleManager} />
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          SidePanel
        </Text>
        <Flex gap={4} flexWrap alignItems='center' mb={10}>
          <Button onClick={() => setSidePanelVisible(true)}>Open SidePanel</Button>
          <SidePanel visible={sidePanelVisible} onClose={() => setSidePanelVisible(false)} aria-label='Side panel'>
            <SidePanel.Header>
              <SidePanel.Back>Back</SidePanel.Back>
              <SidePanel.Title>Panel title</SidePanel.Title>
            </SidePanel.Header>
            <SidePanel.Body>
              <Text>Panel body content</Text>
            </SidePanel.Body>
            <SidePanel.Footer justifyContent='center' pt={2}>
              <Button use='primary'>Apply</Button>
              <Button ml={2} onClick={() => setSidePanelVisible(false)}>Cancel</Button>
            </SidePanel.Footer>
          </SidePanel>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          SpinContainer
        </Text>
        <Flex gap={6} flexWrap alignItems='flex-start' mb={10}>
          <SpinContainer loading size='m' h={80} w={200}>
            <Box p={4}>
              <Text>Loading content</Text>
            </Box>
          </SpinContainer>
          <Box
            p={4}
            style={{
              background: 'var(--intergalactic-bg-primary-invert)',
              borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
            }}
          >
            <SpinContainer loading size='m' theme='invert' h={80} w={200}>
              <Box p={4}>
                <Text color='text-primary-invert'>Invert theme</Text>
              </Box>
            </SpinContainer>
          </Box>
        </Flex>

        <Text tag='h2' size={400} semibold mb={4} mt={10} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
          Wizard
        </Text>
        <Flex gap={4} flexWrap alignItems='center' mb={10}>
          <Button
            onClick={() => {
              setWizardVisible(true);
              setWizardStep(1);
            }}
          >
            Open Wizard
          </Button>
          <Wizard
            visible={wizardVisible}
            step={wizardStep}
            w={500}
            onClose={() => setWizardVisible(false)}
          >
            <Wizard.Sidebar title='Steps'>
              <Wizard.Stepper step={1} onActive={() => setWizardStep(1)} completed={wizardStep > 1}>
                {WIZARD_STEPS[0].title}
              </Wizard.Stepper>
              <Wizard.Stepper step={2} onActive={() => setWizardStep(2)} completed={wizardStep > 2}>
                {WIZARD_STEPS[1].title}
              </Wizard.Stepper>
              <Wizard.Stepper step={3} onActive={() => setWizardStep(3)}>
                {WIZARD_STEPS[2].title}
              </Wizard.Stepper>
            </Wizard.Sidebar>
            <Wizard.Content tag={Flex} direction='column' justifyContent='space-between'>
              {WIZARD_STEPS.map((stepData, index) => (
                <Wizard.Step key={index} step={index + 1}>
                  <Text size={500} tag='h3'>
                    {stepData.title}
                  </Text>
                </Wizard.Step>
              ))}
              <Flex mt={5}>
                {wizardStep > 1 && (
                  <Wizard.StepBack
                    onActive={() => setWizardStep(wizardStep - 1)}
                    stepName={WIZARD_STEPS[wizardStep - 2].title}
                  />
                )}
                {wizardStep < WIZARD_STEPS.length && (
                  <Wizard.StepNext
                    ml='auto'
                    onActive={() => setWizardStep(wizardStep + 1)}
                    stepName={WIZARD_STEPS[wizardStep].title}
                  />
                )}
                {wizardStep === WIZARD_STEPS.length && (
                  <Button ml='auto' use='primary' onClick={() => setWizardVisible(false)}>
                    Done
                  </Button>
                )}
              </Flex>
            </Wizard.Content>
          </Wizard>
        </Flex>
      </Box>
    </ThemePlaygroundLayout>
  );
}

export const Default: Story = {
  render: () => <PopupsAndDialogsContent />,
};
