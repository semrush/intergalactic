import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';
import fire from '@semcore/utils/lib/fire';
import Input from '@semcore/input';
import Select from '@semcore/select';
import CopyS from '@semcore/icon/lib/Copy/m';
import Radio, { RadioGroup } from '@semcore/radio';
import Pills from '@semcore/pills';
import { createPlayground, Playground } from './playground';
import Code from './Code';
import Copy from './Copy';

const Field = styled.label`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  width: 100%;
`;
const Label = styled.div`
  flex: 0 0 70px;
`;
const Control = styled.div`
  margin-left: 10px;
`;

Playground.createWidget('empty', () => {
  return null;
});

Playground.createWidget(
  'boolBtn',
  ({ value, onChange, label, positiveLabel, negativeLabel, ...others }) => {
    return (
      <Field>
        <Control>
          <Button w="100%" onClick={() => onChange(!value)} theme="hollow" type="muted" {...others}>
            {(value ? positiveLabel : negativeLabel) || label}
          </Button>
        </Control>
      </Field>
    );
  },
);

Playground.createWidget(
  'bool',
  ({ value, onChange, label, positiveLabel, negativeLabel, ...others }) => {
    return (
      <Field>
        <Label>{(value ? positiveLabel : negativeLabel) || label}</Label>
        <Control>
          <Checkbox>
            <Checkbox.Value checked={value} onChange={() => onChange(!value)} {...others} />
          </Checkbox>
        </Control>
      </Field>
    );
  },
);

Playground.createWidget(
  'text',
  ({ value, onChange, label, positiveLabel, negativeLabel, ...others }) => {
    return (
      <Field>
        <Label>{(value ? positiveLabel : negativeLabel) || label}</Label>
        <Control>
          <Input>
            <Input.Value checked={value} value={value} onChange={(v) => onChange(v)} {...others} />
          </Input>
        </Control>
      </Field>
    );
  },
);

Playground.createWidget(
  'select',
  ({ value, onChange, label, options, positiveLabel, negativeLabel, ...others }) => {
    return (
      <Field>
        <Label>{(value ? positiveLabel : negativeLabel) || label}</Label>
        <Control>
          <Select value={value} onChange={(value) => onChange(value)} {...others}>
            <Select.Trigger />
            <Select.Menu>
              {options.map((o, i) => (
                <Select.Option key={i} value={o.value}>
                  {o.name}
                </Select.Option>
              ))}
            </Select.Menu>
          </Select>
        </Control>
      </Field>
    );
  },
);

Playground.createWidget(
  'radio',
  ({ value, onChange, label, options, positiveLabel, negativeLabel, ...others }) => {
    return (
      <Field htmlFor="">
        <Label>{(value ? positiveLabel : negativeLabel) || label}</Label>
        <Control>
          <Pills
            style={{ background: '#fff' }}
            value={value}
            onChange={(value) => onChange(value)}
            {...others}
          >
            {options.map((o) => (
              <Pills.Item key={o} value={o}>
                {o}
              </Pills.Item>
            ))}
          </Pills>
        </Control>
      </Field>
    );
  },
);

const WrapperPlayground = styled.div`
  display: flex;
  border: 1px solid #dee3e5;
  border-radius: 6px;
  height: auto;
  margin-bottom: 32px;
  & p {
    margin: 0;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const ResultView = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-size: 20px 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-position: center center;
  border-bottom: 1px solid #dee3e5;
  overflow-y: auto;
  position: relative;
  font-size: 12px;
`;

const ResultCode = styled.div`
  position: relative;
  overflow-y: auto;
`;

const SourceView = styled(Code)`
  height: 100%;
  margin: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
`;

const WorkArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  width: ${({ full }) => (full ? '100%' : '70%')};
`;

const WidgetsBar = styled.div`
  position: relative;
  width: 30%;
  padding: 32px;
  font-size: 14px;
  background-color: #f9f9f9;
  border-left: 1px solid #dee3e5;
  overflow-y: auto;
`;

const WidgetGroup = styled.div`
  padding-bottom: 15px;
`;

const IconCopy = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;

  & > span {
    display: inline-block;
  }

  & svg {
    width: 22px;
    height: 22px;
    fill: #999;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const ChooseBackgroundColor = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${({ color }) => color};
  border-style: solid;
  border-width: 3px;
  border-color: ${({ active }) => (active ? '#2595e4' : '#e3e3e3')};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
`;

const PaintPlaygroundView = ({ backgroundColor, onChange, ...other }) => {
  const [color, changeColor] = useState(backgroundColor || 'white');
  return (
    <RadioGroup
      name="background-color"
      value={color}
      onChange={(color) => {
        changeColor(color);
        onChange(color);
      }}
    >
      <Flex
        alignItems="center"
        style={{ position: 'absolute', right: '16px', bottom: '16px' }}
        {...other}
      >
        <Radio mr={2}>
          <Radio.Value style={{ display: 'none' }} value="white" checked={color === 'white'} />
          <ChooseBackgroundColor color="white" active={color === 'white'} />
        </Radio>
        <Radio>
          <Radio.Value style={{ display: 'none' }} value="#333" checked={color === '#333'} />
          <ChooseBackgroundColor color="#333" active={color === '#333'} />
        </Radio>
      </Flex>
    </RadioGroup>
  );
};

class PlaygroundView extends React.Component {
  static defaultProps = {
    LayoutPreview: (props) => <div {...props} />,
  };

  constructor(props) {
    super(props);
    this.state = { backgroundColor: props.backgroundColor || 'white' };
  }

  onChangeBackground = (color) => {
    fire(this, 'onChange', color);
    this.setState({ backgroundColor: color });
  };

  render() {
    const { result, source, widgetControls, LayoutPreview } = this.props;
    const { backgroundColor } = this.state;

    const hasWidget = !!widgetControls.length;

    return (
      <WrapperPlayground>
        <WorkArea full={!hasWidget}>
          <ResultView backgroundColor={backgroundColor}>
            <LayoutPreview>{result}</LayoutPreview>
            <PaintPlaygroundView
              backgroundColor={backgroundColor}
              onChange={this.onChangeBackground}
            />
          </ResultView>
          <ResultCode>
            <SourceView lang="jsx" copy={false} block>
              {source}
            </SourceView>
            <IconCopy>
              <Copy text={source} textTooltip="Click to copy code">
                <CopyS />
              </Copy>
            </IconCopy>
          </ResultCode>
        </WorkArea>
        {hasWidget ? (
          <WidgetsBar ref={(node) => (this.container = node)}>
            {widgetControls.map((control, i) => {
              return <WidgetGroup key={i}>{control.widgets}</WidgetGroup>;
            })}
          </WidgetsBar>
        ) : null}
      </WrapperPlayground>
    );
  }
}

export default createPlayground(PlaygroundView);
