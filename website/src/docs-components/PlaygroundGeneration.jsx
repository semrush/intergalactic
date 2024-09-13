import React from 'react';
import Button from '@semcore/button';
import Checkbox from '@semcore/checkbox';
import Input from '@semcore/input';
import Select from '@semcore/select';
import Pills from '@semcore/pills';
import { createPlayground, Playground } from '../components/playground';
import styles from './PlaygroundGeneration.module.css';
import { getHighlighterCore } from 'shiki/core';
import { createPortal } from 'react-dom';
import { isolateStyles } from '../../docs/.vitepress/theme/isolateStyles';
import getWasm from 'shiki/wasm';
import { codeTheme } from '../../docs/.vitepress/code-theme';

const ShadowRooted = ({ children }) => {
  const ref = React.useRef();
  const [shadowedRef, setShadowedRef] = React.useState();
  React.useEffect(() => {
    if (!ref.current) return;
    const shadowed = isolateStyles(ref.current);
    setShadowedRef(shadowed);
  }, []);
  return (
    <>
      <div ref={ref} />
      {shadowedRef && createPortal(children, shadowedRef)}
    </>
  );
};

Playground.createWidget('label', ({ label }) => {
  return <h4>{label}</h4>;
});

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
    (async () => {
      const highlighter = await getHighlighterCore({
        themes: [codeTheme.dark],
        langs: [import('shiki/langs/tsx.mjs')],
        loadWasm: getWasm,
      });
      const html = highlighter.codeToHtml(source, {
        lang: 'tsx',
        theme: 'github-dark',
      });
      setHighlightedSource(html);
    })();
  }, [source]);

  return (
    <div className={styles.wrapperPlayground} aria-hidden='true'>
      <div className={styles.workArea}>
        <div className={`${styles.playgroundRuntime}`} style={{ margin: 0 }}>
          <ShadowRooted>
            <style>{`
              .playground-runtime {
                padding-top: 40px;
                margin-top: 20px;
                padding-bottom: 40px;
                margin-bottom: -5px;
                border-radius: 6px;
                padding-left: 4px;
                padding-right: 4px;
                line-height: normal;
                overflow: auto;
              }

              @media (min-width: 640px) {
                .playground-runtime {
                  padding-left: 24px;
                  padding-right: 24px;
                }
              }
            `}</style>
            <div className='playground-runtime'>{result}</div>
          </ShadowRooted>
        </div>
        {highlightedSource && (
          <div className='language-tsx vp-adaptive-theme'>
            <span dangerouslySetInnerHTML={{ __html: highlightedSource }} />
          </div>
        )}
      </div>
      {hasWidget ? (
        <div className={`${styles.widgetsBar} playground-widgets-bar`}>
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
