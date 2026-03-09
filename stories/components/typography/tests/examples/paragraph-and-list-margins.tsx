import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = { formatTags: boolean };

const Demo = (props: ExampleProps) => (
  <div>
    {/* Default size paragraphs */}
    <Text formatTags={props.formatTags}>
      <p>Default paragraph with 4x bottom margin (16px)</p>
      <p>Another default paragraph</p>
    </Text>

    {/* size=100 paragraphs */}
    <Text size={100} formatTags={props.formatTags}>
      <p>Size 100 paragraph with 4.5x bottom margin (18px)</p>
      <p>Another size 100 paragraph</p>
    </Text>

    {/* size=200 paragraphs - should be 3x (12px) */}
    <Text size={200} formatTags={props.formatTags}>
      <p>Size 200 paragraph with 3x bottom margin (12px)</p>
      <p>Another size 200 paragraph</p>
    </Text>

    {/* size=300 paragraphs - should be 4x (16px) */}
    <Text size={300} formatTags={props.formatTags}>
      <p>Size 300 paragraph with 4x bottom margin (16px)</p>
      <p>Another size 300 paragraph</p>
    </Text>

    {/* ul with default 2x margins */}
    <Text formatTags={props.formatTags}>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    </Text>

    {/* ul followed by p - list should have 4x bottom margin (16px) to match p */}
    <Text formatTags={props.formatTags}>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
      <p>This paragraph follows the list. The list above should have 4x (16px) bottom margin.</p>
    </Text>

    {/* Multiple lists and paragraphs */}
    <Text formatTags={props.formatTags}>
      <p>Paragraph before list</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
      <p>Paragraph after list</p>
      <ul>
        <li>Another list item 1</li>
        <li>Another list item 2</li>
      </ul>
      <p>Final paragraph</p>
    </Text>
  </div>
);

export const defaultProps: ExampleProps = {
  formatTags: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
