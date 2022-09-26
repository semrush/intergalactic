import * as React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
const { axe, render, cleanup, fireEvent } = testing;
import Tooltip from '@semcore/tooltip';

import InputTags from '../src';

describe('InputTags', () => {
  afterEach(cleanup);

  test('renders different sizes', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5, width: 150 }}>
        <InputTags size="m">
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
        </InputTags>
        <InputTags size="l">
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
        </InputTags>
      </snapshot.ProxyProps>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('renders basic example', async () => {
    const Component = () => {
      const [tags, updateTags] = React.useState(['vk', 'fk', 'twitter', 'instagram']);
      const [value, updateValue] = React.useState('');

      const handleAppendTags = (newTags) => {
        updateTags((tags) => [...tags, ...newTags]);
        updateValue('');
      };

      const handleRemoveTag = () => {
        if (tags.length === 0) return;
        updateTags(tags.slice(0, -1));
        updateValue(tags.slice(-1)[0] + ` ${value}`);
      };

      const handleCloseTag = (e) => {
        e.preventDefault();
      };

      const handleEditTag = (e) => {
        const { dataset } = e.currentTarget;
        let allTags = [...tags];
        if (value) {
          allTags = [...allTags, value];
        }
        updateTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));
        if (!e.defaultPrevented) {
          updateValue(tags[dataset.id]);
        }
        return false;
      };

      const handleBlurInput = (e) => {
        const { value } = e.currentTarget;
        if (value) handleAppendTags([value]);
      };

      return (
        <InputTags size="l" onAppend={handleAppendTags} onRemove={handleRemoveTag}>
          {tags.map((tag, idx) => (
            <Tooltip key={idx}>
              <Tooltip.Trigger
                tag={InputTags.Tag}
                theme="primary"
                editable
                data-id={idx}
                onClick={handleEditTag}
              >
                <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
                <InputTags.Tag.Close onClick={handleCloseTag} />
              </Tooltip.Trigger>
              <Tooltip.Popper>tag</Tooltip.Popper>
            </Tooltip>
          ))}
          <InputTags.Value value={value} onChange={updateValue} onBlur={handleBlurInput} />
        </InputTags>
      );
    };
    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });
  test("renders url's example", async () => {
    const isValidEmail = (value) => /.+@.+\..+/i.test(value.toLowerCase());

    const component = (
      <InputTags size="l">
        {['bob_vk.com', 'wolf@instagram.dot'].map((tag, idx) => (
          <InputTags.Tag
            key={idx}
            style={{ textDecoration: !isValidEmail(tag) ? 'line-through' : 'none' }}
          >
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close data-id={idx} />
          </InputTags.Tag>
        ))}
        <InputTags.Value />
      </InputTags>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should call onClick', async () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <InputTags>
        <InputTags.Tag theme="primary" editable data-testid="tag" onClick={onClick}>
          <InputTags.Tag.Text>tag</InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>
        <InputTags.Value aria-label="input with tags" />
      </InputTags>,
    );

    fireEvent.keyDown(getByTestId('tag'), { code: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('a11y', async () => {
    const { container } = render(
      <InputTags size="l">
        {['vk', 'fk', 'twitter', 'instagram'].map((tag, idx) => (
          <InputTags.Tag theme="primary" editable data-id={idx} key={idx}>
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>
        ))}
        <InputTags.Value aria-label="input with tags" />
      </InputTags>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
