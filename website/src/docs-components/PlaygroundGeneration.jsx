import React from 'react';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';
import fire from '@semcore/utils/lib/fire';
import Input from '@semcore/input';
import Select from '@semcore/select';
import CopyM from '@semcore/icon/Copy/m';
import Radio, { RadioGroup } from '@semcore/radio';
import Pills from '@semcore/pills';
import { createPlayground, Playground } from '../components/playground';
import Code from '../components/Code';
import Copy from '../components/Copy';
import styles from './PlaygroundGeneration.module.css';
import { ThemeProvider } from '@semcore/utils/lib/ThemeProvider';
import { getHighlighter, setCDN } from 'shiki';
import githubDarkTheme from 'shiki/themes/github-dark.json';

Playground.createWidget('empty', () => {
  return null;
});

Playground.createWidget(
  'boolBtn',
  ({ value, onChange, label, positiveLabel, negativeLabel, ...others }) => {
    return (
      <label className={styles.field}>
        <div className={styles.control}>
          <Button w='100%' onClick={() => onChange(!value)} theme='hollow' type='muted' {...others}>
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
              {options.map((o, i) => {
                const option = typeof o === 'string' ? { value: o, name: o } : o;
                return (
                  <Select.Option key={option.name} value={option.value}>
                    {option.name}
                  </Select.Option>
                );
              })}
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
      <label className={styles.field} htmlFor=''>
        <div className={styles.label}>{(value ? positiveLabel : negativeLabel) || label}</div>
        <div className={styles.control}>
          <Pills value={value} onChange={(value) => onChange(value)} behavior='radio' {...others}>
            {options.map((o, i) => {
              const option = typeof o !== 'object' ? { value: o, name: o } : o;
              return (
                <Pills.Item key={option.name} value={option.value}>
                  {String(option.name)}
                </Pills.Item>
              );
            })}
          </Pills>
        </div>
      </label>
    );
  },
);

const PlaygroundView = ({ result, source, widgetControls }) => {
  const [highlightedSource, setHighlightedSource] = React.useState('');

  const hasWidget = !!widgetControls.length;

  React.useEffect(() => {
    setCDN('https://unpkg.com/shiki/');
    getHighlighter({ theme: 'github-dark', themes: [githubDarkTheme], langs: ['tsx'] }).then(
      (highlighter) => {
        const html = highlighter.codeToHtml(source, { lang: 'tsx', theme: 'github-dark' });
        setHighlightedSource(html);
      },
    );
  });

  return (
    <div className={styles.wrapperPlayground} aria-hidden='true'>
      <div className={styles.workArea}>
        <div className={`playground-runtime ${styles.playgroundRuntime}`} style={{ margin: 0 }}>
          <div>{result}</div>
        </div>
        {highlightedSource && (
          <div className='language-tsx vp-adaptive-theme'>
            <span dangerouslySetInnerHTML={{ __html: highlightedSource }} />
          </div>
        )}
      </div>
      {hasWidget ? (
        <div className={styles.widgetsBar}>
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
};

export default createPlayground(PlaygroundView);
