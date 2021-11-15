import React from 'react';
import FeedbackForm from '@semcore/feedback-form';
import Input from '@semcore/input';
import { Box, Flex } from '@semcore/flex-box';
import Link from '@semcore/link';
import Dropdown from '@semcore/dropdown';
import Textarea from '@semcore/textarea';
import Notice from '@semcore/notice';
import Button from '@semcore/button';
import ThumbUpXS from '@semcore/icon/lib/ThumbUp/xs';
import ThumbDownXS from '@semcore/icon/lib/ThumbDown/xs';
import { Text } from '@semcore/typography';

const heyImg = {
  '1x':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAYAAAB9qAq4AAAAAXNSR0IArs4c6QAACG1JREFUWAndWGlMXNcVPvfNsO9gbIMBGxtjB28MTO0EGBw5dRwlYZHyo1JUqUqTNkpbdVGbqolU9U/lqlVVVd1+VK3yp+mPVlYMdiRLraIW8LRWzOIFxxBjDDGbWWxiltneu/3OnbnDmwnQwUt/9Ej33fvuPefc753t3feIHpCklK+iffkBxRMWM+yc2LASba997lGMobMOrf6hdUHJd9G+/9CKbAqgrwGtO9I2DDLGgtDbHGm2LR56aEKDtLUNKRR4MnZpU6Q1RKS70LdzE0IMRuYeuMMebDkJXd7VlJzu6Hkf841CyH6Sxh+bPdV/AC8/FLEF9RMKnogQj3XTcw/cY7Pza4FbUSozpaQjkqzft3f2/P3cxWtFvGYHRXhStpwJZUdXBP83IwYUWPY9bUn6GYxdAmAfNHtqPh8PkBPEAsCfbxRWm7e7QpjG27BAFZx53SmMky94qjccHue8/fm+kP9SGKTx1fgkUXG3UXCwvIDdT1nSegVOgZvkl4LS9J7p7Dm0ni6W6+/vT7bzPFe3b84QFK4kwno1xoJ2xtXGZy6Op0vf1I+ltJ7H+rgkx69bPdXvne28vDMkg0PJSU46/rl91D1wiyZn58Eibqempx5+zl01Ea/vrLfvRChkvoP5IhJiRJB4s8Xj+ivzsbt9S8vjkF/YEMDTnd2/RcH4mn0zQ4hfOVJSfhL0+SYQGvTs4f2U7HSS9+rHNDu/wFHe7UgramxyFy9pOa/3k7Q7oWkAkLkMQKUreodD1DXV1/yL+TizBbIi3sW8tiZB2Yu8eKRqFx3cVUoGfGFJ+U3THzgJC7TDZTQwOqHmDz+xkzLTUnj3WnN54l2sRfeatWZrGVxhXg7VuV10oLJc7WmZ9LLevLWx5oWWxtoXo0J6Yd1e0gyvLyz7qLy4kJ7aX0FOhwGQiD1BxbCgHJmYoftLPmJ3P7mvgpKcDgbZ2tbZ81Ot2yJzM4+zMtNxFZSTla2XTuiB7jcG0DB+wYL9w2N05+6ntCkni+oO7FYgYCE3Bz27i9eZMmBBtjbCgG+/19bR+xUeoPxm8TXJAHiQFAalpybjOeTu9guXwuZUK+FCHRn+966lwfUuxxxzfvjRsLJUXlYGNRyspBRYTNPU3DzN3LuvbgtyMqm6cntkyfpdW1fvceBViJH7ERJUslUZlSgYelbPcr8xC0KgqcH1HY63kGnShf4hCgRDlJ2RpkCmJidFdV+FFTkmmUo359Oesq2cDE7Ew3uWGT7ZRPGBJy8n7GaIHFNCkUtCANu6rme1dXb/BnE02dbZOwKn3IQVBhZ9fvrw+jAnCmWmp5LnUKVyFeueX1ii23fmonvt3V5M27cWsBszIP8aL1h4bWhKSgqXQ0miWs9xnxBASYs/AIavwyJboLwEar+NwNnBCtiVV4Y+4SHApQDkHsoCWKaPRsbJtCw15suhijIq21IQvUdyRccARk6nglPB9VYvJAQQLz/1VNW7y5Qr87Mz2BKoIWG6hcy9OT6tbtjNHJM5cPuyP0gjk7OaDfVYEOso21Ko5mbnw3EaZhBUmJeL55eG9E/t00KJATRkHwuMTM5Qbla6AsDWUCUkoukqrMiZzcQlph4g2VrZEWtG2BTIfNQ/JraanfKyVHKz65/Q8wkBTLbEL/H0Y3fvL9H5y4PkCwRpR9EmOlZbRdsK85QujibO7AXUQCYG70L2bsoNb6omIxfDEU6mIBLMTkmRSoBKka/nEwL4fGPNNAnHM/DQTQb5z97r6jXG7nTvLVcFm+uYyuxrQ9Hs1ZvY+yDCzuEMAzRRCezk5KIOggWjlTshgCzUXH/wY7jkdXhlyI8nP39lkIYjcbc5L5uO1VTR7pItlJqCghspLywXTwFg4hAo21ZMpcXqTBplcUYKNwwRBbhSXcHGxyOUjHcA4u0WT+05Lfl+Z19lW1fPKQTNfj3HGC4j7u6hnBysKMWL3qCq8m16ec2eLchUWrQ1PLBdTf1gkgJ6OsaCFskfYV8X+KJByow4273F4NiluoRoBaNTsyoul/1RnXrpMz3HqcmXNSgQCOvAx8uYZokChFsMvEqP84Jw0hnNoO6FKOeeLcWJcdS1V2WowwiL67ic+xTHq3UoBOtpI63G5o88JNTe1utRgJjgrE9HHQi01NXe0Ayql9TB/cDIhMrSXJxCOENPHDmgim8eSg/H5ZWhqN4YcX2znvV4+9tTyEWciIRM7tUyMYXodEc3H6cKUp2pBXz01kx/uziUs7h8r0vHIJeWPWVFMe7mIxZTfAhoHdwvoaosBe0zK2NpBsnbewUTwouzYPQD325BoCd1mvWZvjdWRImOu3fNJ0txDOtneX5s+i590H2NegZu0RLex0wMbD1wzLO2eyXdGBllFuATfw4PwtdYC3ZeOkIy9G9M+oRDfLG5vuaUnZnHZ7p6X8Y79IfYTP3DAWicVgpoJw6wOeoAGi+xcr8I6y3H1mYsSpqemabBWwgPIfpK0lyH3W4RtXMMQFbV1tFzEu/Zt8BsOUg80+Rx/YPn7YSEEu3nLz1N0voGkrIVplGe4FjcUVSo3i46gexyDI5BauKfB+PjE3RzbBLhD6MYDndzQ3W/Xuf+MwB5EiDfICG/ZZD4QpOnBt+oaxN/0Zlkvg5LvALg6hTA4PhAkZ+diVN3JqWhePOngcT8YlBQKBSk+fsLNDg8itMOchNlBV+IL7V6Dl2I32lVgPFMidzz9+3QnP8lgHwNdawBVg0f8NYRxsHXj1P1X0RS0pstTx6YWo31kQG0K+fPyhk59xRJ8ygM5EKYFcCd+YjbDFhrFPc3hCH6RGr6n5rce9SHmF3+/38MNz6aP6aPw1QA91B/TDeKKeY0k6Cw/p/I7Ou8+hPU9jjYYMV6dvPj0B2v8z9CxViE/3a6aAAAAABJRU5ErkJggg==',
  '2x':
    'data:image/png;base64,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',
};

const validate = {
  description: (value = '') => {
    const splitText = value.split(' ');
    const numberSpaces = splitText.reduce((acc, item) => {
      if (!item.length) {
        acc += 1;
      }
      return acc;
    }, 0);
    if (value.length - numberSpaces < 10 || splitText.length <= 2) {
      return 'Your feedback must contain at least 3 words (10 characters).';
    }
  },
  email: (value = '') => {
    validate.description(value);
    if (!/.+@.+\..+/i.test(String(value).toLowerCase())) {
      return 'Please enter valid email.\t';
    }
  },
};

class Feedback extends React.PureComponent {
  handleChange = (fn, trigger) => (value, e) => {
    fn(e);
    this.props.onChange(e, trigger);
  };

  render() {
    const { status, onSubmit, onCancel } = this.props;

    if (status === 'success') {
      return <FeedbackForm.Success>Thank you for your feedback!</FeedbackForm.Success>;
    }

    return (
      <FeedbackForm onSubmit={onSubmit} loading={status === 'loading'}>
        <Box p={4}>
          <Flex tag="label" direction="column">
            <Text mb={1} size={100}>
              Tell us your suggestion or report an issue
            </Text>
            <FeedbackForm.Item name="feedback" validate={validate.description}>
              {({ input }) => (
                <Textarea
                  {...input}
                  autoFocus
                  h={80}
                  onChange={this.handleChange(input.onChange, 'description')}
                />
              )}
            </FeedbackForm.Item>
          </Flex>
          <Flex tag="label" mt={4} direction="column">
            <Text mb={1} size={100}>
              Reply-to email
            </Text>
            <FeedbackForm.Item name="email" validate={validate.email}>
              {({ input }) => (
                <Input state={input.state}>
                  <Input.Value {...input} onChange={this.handleChange(input.onChange, 'email')} />
                </Input>
              )}
            </FeedbackForm.Item>
          </Flex>
          <Box mt={2}>
            <Text lineHeight="18px" size={100}>
              We will only use this email to respond to you on your feedback.{' '}
              <Link href="https://www.semrush.com/company/legal/privacy-policy/">
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Flex mt={4}>
            <FeedbackForm.Submit>Send feedback</FeedbackForm.Submit>
            <FeedbackForm.Cancel onClick={onCancel}>Cancel</FeedbackForm.Cancel>
          </Flex>
        </Box>
        <FeedbackForm.Notice hidden={status === 'failed'}>
          You can also send us an email to <Link>backlink.audit@semrush.com</Link>
        </FeedbackForm.Notice>
        <FeedbackForm.Notice hidden={status !== 'failed'} theme="danger">
          Your message hasn’t been sent.
        </FeedbackForm.Notice>
      </FeedbackForm>
    );
  }
}

class FeedbackYesNo extends React.PureComponent {
  state = { status: 'default', visible: true };
  onSubmit = (reaction, data) => {
    this.requestServer('success', 1000);
    this.setState({ status: 'loading' });
  };
  requestServer = (status, time = 500, cb) => {
    this.timeout = setTimeout(() => {
      this.setState({ status });
      cb && cb();
    }, time);
  };
  changeVisible = (visible) => {
    this.setState({ visible });
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { status, visible } = this.state;

    return (
      <Notice
        hidden={!visible}
        style={{
          padding: '10px 16px 9px 30px',
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
          borderRadius: '0',
        }}
      >
        <Notice.Label my="-6px">
          <picture>
            <source srcSet={`${heyImg['1x']}, ${heyImg['2x']} 2x`} />
            <img src={heyImg['1x']} alt="Hey" />
          </picture>
        </Notice.Label>
        <Notice.Content>
          Do you find our On Page SEO Checker reports useful?
          <Dropdown>
            <Dropdown.Trigger tag={Button} ml={4}>
              <Button.Addon tag={ThumbUpXS} />
              <Button.Text>Yes</Button.Text>
            </Dropdown.Trigger>
            <Dropdown.Popper>
              {(props, { visible }) => (
                <Feedback
                  status={status}
                  onCancel={() => visible(false)}
                  onSubmit={(data) => this.onSubmit('yes', data)}
                />
              )}
            </Dropdown.Popper>
          </Dropdown>
          <Dropdown>
            <Dropdown.Trigger tag={Button} ml={2}>
              <Button.Addon tag={ThumbDownXS} />
              <Button.Text>No</Button.Text>
            </Dropdown.Trigger>
            <Dropdown.Popper>
              {(props, { visible }) => (
                <Feedback
                  status={status}
                  onCancel={() => visible(false)}
                  onSubmit={(data) => this.onSubmit('no', data)}
                />
              )}
            </Dropdown.Popper>
          </Dropdown>
          <Button ml={2} use="tertiary" onClick={() => this.changeVisible(false)}>
            Ask me later
          </Button>
        </Notice.Content>
        <Notice.CloseIcon onClick={() => this.changeVisible(false)} />
      </Notice>
    );
  }
}

export default FeedbackYesNo;
