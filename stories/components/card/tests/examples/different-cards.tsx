import { Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import Card from '@semcore/card';
import SettingsM from '@semcore/icon/Settings/m';
import ThumbDownM from '@semcore/icon/ThumbDown/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import Pills from '@semcore/pills';
import { Text } from '@semcore/typography';
import React from 'react';

const tooltipContent =
  'When drawing comparisons between different classes of animals, an alternative unit is sometimes used for organisms: body length per second.';

const Demo = () => (

  <>
    <Card w={100} mb={2}>Card Content</Card>

    <Card mb={2}>
      <Card.Description>Info about data (optional) </Card.Description>
    </Card>

    <Card mb={2}>
      <Card.Title hintAfter='Test'>Market Traffic</Card.Title>
    </Card>

    <Card mb={2}>
      <Card.Title hintAfter='test' hintAfterAriaLabel='test-aria-label'>Market Traffic hintAfter</Card.Title>
      <Card.Description uppercase>Info about data (optional)</Card.Description>
      Content
    </Card>

    <Card mb={2}>
      <Card.Title innerHint='test' innerHintAriaLabel='test-aria-label'>Market Traffic innerHint</Card.Title>
      <Card.Description>Info about data (optional)</Card.Description>
    </Card>

    <Card mb={2}>
      <Card.Title innerHint='innerHint test' innerHintAriaLabel='test-aria-label' hintAfterAriaLabel='test-aria-label' hintAfter=' hintAfter test'>Market Traffic hintAfter and innerHint</Card.Title>
      Content
    </Card>

    <Card mb={2}>
      <Flex justifyContent='space-between' w={300}>
        <Card.Title innerHint='test' innerHintAriaLabel='test-aria-label' tag='h1'>Market Traffic h1</Card.Title>
        <Button addonLeft={SettingsM} use='tertiary' theme='muted' aria-label='Settings' />
      </Flex>
      <Card.Description>Info about data (optional)</Card.Description>
      Content
    </Card>

    {/* header and body */}

    <Card mb={2}>
      <Card.Header>
        <Card.Title disabled uppercase>Market Traffic</Card.Title>
        <Card.Description>Info about data (optional)</Card.Description>
      </Card.Header>
      <Card.Body>Your awesome card content</Card.Body>
    </Card>

    <Card mb={2}>
      <Card.Header>
        <Pills mt={2} aria-labelledby='pills-basic-usage'>
          <Pills.Item value='like'>
            <Pills.Item.Addon tag={ThumbUpM} />
            <Pills.Item.Text>Like</Pills.Item.Text>
          </Pills.Item>
          <Pills.Item value={null}>Don't care</Pills.Item>
          <Pills.Item value='dislike'>
            <Pills.Item.Addon tag={ThumbDownM} />
            <Pills.Item.Text>Dislike</Pills.Item.Text>
          </Pills.Item>
        </Pills>
      </Card.Header>
      <Card.Body>Your awesome card content</Card.Body>
    </Card>

  </>

);

export default Demo;
