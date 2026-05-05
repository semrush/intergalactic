import SettingsM from '@semcore/icon/Settings/m';
import ThumbDownM from '@semcore/icon/ThumbDown/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import Pills from '@semcore/ui/pills';
import React from 'react';

const Demo = () => (

  <>
    <Card w={100} mb={2} data-testid='card-only'>Card Content</Card>

    <Card mb={2} data-testid='card-description'>
      <Card.Description>Info about data (optional) </Card.Description>
    </Card>

    <Card mb={2} data-testid='card-title'>
      <Card.Header>
        <Card.Title>Market Traffic</Card.Title>
      </Card.Header>
    </Card>

    <Card mb={2} data-testid='card-title-description'>
      <Card.Header>
        <Card.Title>Market Traffic</Card.Title>
        <Card.Description uppercase>Info about data (optional)</Card.Description>
      </Card.Header>
      Content
    </Card>

    <Card mb={2} data-testid='card-title-description-innterHint'>
      <Card.Header>
        <Card.Title innerHint='test' innerHintAriaLabel='test-aria-label'>Market Traffic innerHint</Card.Title>
        <Card.Description>Info about data (optional)</Card.Description>
      </Card.Header>
    </Card>

    <Card mb={2} data-testid='card-title-content-innerHint'>
      <Card.Header>
        <Card.Title innerHint='innerHint test' innerHintAriaLabel='test-aria-label'>Market Traffic innerHint</Card.Title>
        <Card.Description>Info about data (optional)</Card.Description>
      </Card.Header>
      Content
    </Card>

    <Card mb={2} data-testid='card-title-description-content-innerHint-tag-text-styles'>
      <Card.Header>
        <Flex justifyContent='space-between' w={300} alignItems='center'>
          <Card.Title innerHint='test' innerHintAriaLabel='test-aria-label' tag='h1'>Market Traffic h1</Card.Title>
          <Button addonLeft={SettingsM} use='tertiary' theme='muted' aria-label='Settings' />
        </Flex>
        <Card.Description>Info about data (optional)</Card.Description>
      </Card.Header>
      Content
    </Card>

    {/* header and body */}

    <Card mb={2} data-testid='card-header-title-desription-body'>
      <Card.Header>
        <Card.Title disabled uppercase>Market Traffic</Card.Title>
        <Card.Description>Info about data (optional)</Card.Description>
      </Card.Header>
      <Card.Body>Your awesome card content</Card.Body>
    </Card>

    <Card mb={2} data-testid='card-header-pills-body'>
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
