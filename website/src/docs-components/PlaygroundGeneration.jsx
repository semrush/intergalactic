import React, { useState } from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';
import fire from '@semcore/utils/lib/fire';
import Input from '@semcore/input';
import Select from '@semcore/select';
import CopyS from '@semcore/icon/Copy/m';
import Radio, { RadioGroup } from '@semcore/radio';
import Pills from '@semcore/pills';
import { createPlayground, Playground } from '../components/playground';
import Code from '../components/Code';
import Copy from '../components/Copy';
import styles from './PlaygroundGeneration.module.css';

Playground.createWidget('empty', () => {
  return null;
});

Playground.createWidget(
  'boolBtn',
  ({ value, onChange, label, positiveLabel, negativeLabel, ...others }) => {
    return (
      <label className={styles.field}>
        <div className={styles.control}>
          <Button w="100%" onClick={() => onChange(!value)} theme="hollow" type="muted" {...others}>
            {(value ? positiveLabel : negativeLabel) || label}
          </Button>
        </div>
      </label>
    );
  },
);

Playground.createWidget(
  'bool',
  ({ value, onChange, label, positiveLabel, negativeLabel, ...others }) => {
    return (
      <label className={styles.field}>
        <div className={styles.label}>{(value ? positiveLabel : negativeLabel) || label}</div>
        <div className={styles.control}>
          <Checkbox>
            <Checkbox.Value checked={value} onChange={() => onChange(!value)} {...others} />
          </Checkbox>
        </div>
      </label>
    );
  },
);

Playground.createWidget(
  'text',
  ({ value, onChange, label, positiveLabel, negativeLabel, ...others }) => {
    return (
      <label className={styles.field}>
        <div className={styles.label}>{(value ? positiveLabel : negativeLabel) || label}</div>
        <div className={styles.control}>
          <Input>
            <Input.Value checked={value} value={value} onChange={(v) => onChange(v)} {...others} />
          </Input>
        </div>
      </label>
    );
  },
);

Playground.createWidget(
  'select',
  ({ value, onChange, label, options, positiveLabel, negativeLabel, ...others }) => {
    return (
      <label className={styles.field}>
        <div className={styles.label}>{(value ? positiveLabel : negativeLabel) || label}</div>
        <div className={styles.control}>
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
        </div>
      </label>
    );
  },
);

Playground.createWidget(
  'radio',
  ({ value, onChange, label, options, positiveLabel, negativeLabel, ...others }) => {
    return (
      <label className={styles.field} htmlFor="">
        <div className={styles.label}>{(value ? positiveLabel : negativeLabel) || label}</div>
        <div className={styles.control}>
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
        </div>
      </label>
    );
  },
);

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
          <div
            className={styles.chooseBackgroundColor}
            style={{
              backgroundColor: 'white',
              borderColor: color === 'white' ? '#2595e4' : '#e3e3e3',
            }}
          />
        </Radio>
        <Radio>
          <Radio.Value style={{ display: 'none' }} value="#333" checked={color === '#333'} />
          <div
            className={styles.chooseBackgroundColor}
            style={{
              backgroundColor: '#333',
              borderColor: color === '#333' ? '#2595e4' : '#e3e3e3',
            }}
          />
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
      <div className={styles.wrapperPlayground}>
        <div className={styles.workArea} style={{ width: !hasWidget ? '100%' : '70%' }}>
          <div className={styles.resultView} style={{ backgroundColor }}>
            <LayoutPreview>{result}</LayoutPreview>
            <PaintPlaygroundView
              backgroundColor={backgroundColor}
              onChange={this.onChangeBackground}
            />
          </div>
          <div className={styles.resultCode}>
            <Code className={styles.sourceView} lang="jsx" copy={false} block>
              {source}
            </Code>
            <div className={styles.iconCopy}>
              <Copy text={source} textTooltip="Click to copy code">
                <CopyS />
              </Copy>
            </div>
          </div>
        </div>
        {hasWidget ? (
          <div classNamme={styles.widgetsBar} ref={(node) => (this.container = node)}>
            {widgetControls.map((control, i) => {
              return (
                <div className={styles.widgetGroup} key={i}>
                  {control.widgets}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default createPlayground(PlaygroundView);
