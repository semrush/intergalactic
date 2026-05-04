import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import FeaturePopover from '@semcore/ui/feature-popover';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import CarouselStory from '../../../../../components/carousel/docs/examples/carousel_with_default_indicators';
import DropdownMenuWithDnDExample from '../../../../../components/drag-and-drop/docs/examples/with_dropdownmenu';
import DropdownMenuBasicUsage from '../../../../../components/dropdown-menu/docs/examples/basic';
import FullscreenModalBasicUsage from '../../../../../components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use';
import ModalBasicUsage from '../../../../../components/modal/docs/examples/basic_modal_window_usage';
import ModalOverAnotherModal from '../../../../../components/modal/docs/examples/modal_window_inside_a_modal_window';
import NoticeBubbleBasicNotice from '../../../../../components/notice-bubble/docs/examples/basic_notice';
import NoticeBubbleNoConnection from '../../../../../components/notice-bubble/docs/examples/no_connection_notice';
import SidePanelBasicUsage from '../../../../../components/side-panel/docs/examples/basic_example';
import SpinContainerUsageInContent from '../../../../../components/spin-container/docs/examples/usage_in_content';
import WizardBasicUsage from '../../../../../components/wizard/docs/examples/basic_example';
import FeedbackRatingExample from '../../../../../patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form';

export function PopupsDialogs() {
  const [featurePopoverAccentVisible, setFeaturePopoverAccentVisible] = React.useState(false);
  const [featurePopoverNeutralVisible, setFeaturePopoverNeutralVisible] = React.useState(false);

  return (
    <>

      <Card mt={4}>
        <Card.Body>
          <Flex direction='column' gap={10}>
            <Text tag='h3' size={400} mb={4}>Carousel</Text>
            <CarouselStory />
            <Box>
              <Text tag='h3' size={400} mb={4}>DropdownMenu</Text>
              <DropdownMenuBasicUsage />
              <Text tag='h4' size={300} mb={2} mt={6}>
                With drag and drop
              </Text>
              <Box w='fit-content'>
                <DropdownMenuWithDnDExample />
              </Box>
            </Box>

            <Box>
              <Text tag='h3' size={400} mb={4}>FullscreenModal</Text>
              <FullscreenModalBasicUsage />
            </Box>

            <Box>
              <Text tag='h3' size={400} mb={4}>FeaturePopover</Text>
              <Flex direction='column' gap={20}>
                <FeaturePopover
                  {...({ interaction: 'click' } as Record<string, unknown>)}
                  visible={featurePopoverAccentVisible}
                  onVisibleChange={setFeaturePopoverAccentVisible}
                  disablePortal
                  placement='bottom-start'
                >
                  <FeaturePopover.Trigger>
                    <Box style={{ position: 'relative', display: 'inline-flex' }}>
                      <Button>
                        Open popover
                      </Button>
                      {featurePopoverAccentVisible ? <FeaturePopover.Spot /> : null}
                    </Box>
                  </FeaturePopover.Trigger>
                  <FeaturePopover.Popper closeIcon wMax={280} aria-label='Feature popover (accent)'>
                    <Text size={300} bold tag='h3' mb={1} mt={0}>
                      Popover title
                    </Text>
                    <Text size={200}>
                      Short description for theme playground.
                    </Text>
                  </FeaturePopover.Popper>
                </FeaturePopover>

                <FeaturePopover
                  {...({ interaction: 'click' } as Record<string, unknown>)}
                  visible={featurePopoverNeutralVisible}
                  onVisibleChange={setFeaturePopoverNeutralVisible}
                  disablePortal
                  placement='bottom-start'
                  theme='neutral'
                >
                  <FeaturePopover.Trigger>
                    <Box style={{ position: 'relative', display: 'inline-flex' }}>
                      <Button>
                        Open popover (neutral)
                      </Button>
                      {featurePopoverNeutralVisible ? <FeaturePopover.Spot /> : null}
                    </Box>
                  </FeaturePopover.Trigger>
                  <FeaturePopover.Popper closeIcon wMax={280} aria-label='Feature popover (neutral)'>
                    <Text size={300} bold tag='h3' mb={1} mt={0}>
                      Popover title
                    </Text>
                    <Text size={200}>
                      Short description for theme playground (neutral theme).
                    </Text>
                  </FeaturePopover.Popper>
                </FeaturePopover>
              </Flex>
            </Box>

            <Box w='60%'>
              <Text tag='h3' size={400} mb={4}>FeedbackRating</Text>
              <FeedbackRatingExample />
            </Box>

            <Box>
              <Text tag='h3' size={400} mb={4}>Modal</Text>
              <Flex gap={4} flexWrap>
                <Box>
                  <Text tag='h4' size={300} mb={2}>Basic usage</Text>
                  <ModalBasicUsage />
                </Box>
                <Box>
                  <Text tag='h4' size={300} mb={2}>Modal over another modal</Text>
                  <ModalOverAnotherModal />
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text tag='h3' size={400} mb={4}>NoticeBubble</Text>
              <Flex gap={4} flexWrap>
                <Box>
                  <Text tag='h4' size={300} mb={2}>Basic notice</Text>
                  <NoticeBubbleBasicNotice />
                </Box>
                <Box>
                  <Text tag='h4' size={300} mb={2}>No connection</Text>
                  <NoticeBubbleNoConnection />
                </Box>
              </Flex>
            </Box>

            <Box>
              <Text tag='h3' size={400} mb={4}>SidePanel</Text>
              <SidePanelBasicUsage />
            </Box>

            <Box w='60%'>
              <Text tag='h3' size={400} mb={4}>SpinContainer</Text>
              <SpinContainerUsageInContent />
            </Box>

            <Box>
              <Text tag='h3' size={400} mb={4}>Wizard</Text>
              <WizardBasicUsage />
            </Box>
          </Flex>
        </Card.Body>
      </Card>
    </>
  );
}
