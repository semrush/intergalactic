---
title: Design tokens
tabs: Tokens('design-tokens'), Usage in design('design-tokens-usage'), Usage in development('design-tokens-usage-development'), Changelog('design-tokens-changelog')
---

## Global theme

Design tokens are ideal for global theming because they help ensure consistent visual choices and behavior across the design system. They also make it easier to update and maintain the product, as changes can be made in a centralized way.

**Why design tokens should be used only for global theming:**

- By using design tokens only for global theming, you can ensure that the design system remains flexible and adaptable to a change. As the design system evolves, updates can be made to the design tokens, which will then be reflected in all relevant places throughout the design system.
- Design tokens add a centralized approach to updating the design system, making it easier to ensure that all updates are made in a controlled and deliberate manner.

To sum up, using design tokens only for global theming is a best practice because it promotes consistency, maintainability, modularity, and adaptability in the design system.

::: tip
If you can't find the token you are looking for, then please double-check the existing ones. If it is really missing, you can drop us a line with a request to add a new token.
:::

### How to apply theme globally

Global themes should be preferred over local ones until multiple themes appear on the same page.

To apply a global theme, define CSS variables on the `:root` via CSS or JS. For example, following CSS will make all main backgrounds black and all primary texts white.

```css
:root {
  --intergalactic-bg-primary-neutral: #000;
  --intergalactic-text-primary: #fff;
}
```

Any design token from the [tokens list](/style/design-tokens/design-tokens#semantic-tokens) may be applied.

## Local theme

We don’t recommend using tokens for local theming or specific instances, because it can lead to visual inconsistencies within the design system and may require more effort to maintain visual decisions. Besides, using tokens only for a certain component will cause changes to be applied to the internal content of the component as well, which may be unnecessary.

If you do need to make pointed changes, then instead of using design tokens, you need to use **sstyled** and apply the styles directly to the component.

### ThemeProvider

Theme for React components subtree may also be applied via `<ThemeProvider />`.

`<ThemeProvider />` applies provided tokens on DOM node and handles passing them into React Portal created with `@semcore/portal`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/utils/design-tokens/docs/examples/themeprovider.tsx';
</script>

:::

## Custom components

Design tokens are recommended when creating a custom component to ensure a consistent look and reducing the time and effort spent on manual updates.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/utils/design-tokens/docs/examples/tokens-with-custom-component.tsx';
</script>

:::

## Transforming JSON files

Design token JSON-files [produced by Tokens Studio Figma plugin](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma) can't be used as is in Frontend application. Use the following widgets to transform output of the Figma plugin to ready-to-import CSS file or ready-to-use JSON files.

::: react-view

<script lang="tsx">
import React from 'react';
import '@semcore/core/lib/themes/default.css'; /** TO REMOVE WHEN THEME PR WILL BE MERGED */
import Button from '@semcore/button';
import { Box } from '@semcore/flex-box';
import CheckM from '@semcore/icon/Check/m';
import CopyM from '@semcore/icon/Copy/m';
import cx from 'classnames';
import { processTokens, tokensToJson, tokensToCss } from '@semcore/core/lib/theme/utils';
import styles from './processor.module.css';
import Copy from '@components/Copy';

const FileInput = ({ id, onFile, multiple, accept }) => {
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef(null);  

  const handleDragStart = React.useCallback(() => setDragging(true), []);
  const handleDragEnd = React.useCallback(() => setDragging(false), []);
  const handleClick = React.useCallback(() => {
    inputRef.current?.click();
  }, []);
  React.useEffect(() => {
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);
    return () => {
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  return (
    <div className={cx(styles.dropzone, dragging && styles.dropzoneDragging)}>
      <div />
      <input
        className={styles.fileInput}
        id={id}
        multiple={multiple}
        type='file'
        accept={accept}
        onChange={(event) => onFile([...(event.target.files ?? [])])}
        aria-describedby="inpu-hint"
        ref={inputRef}
      />
      <div className={styles.dropzoneInner}>
        <div>Drag files here</div>
        <div>or</div>
        <Button theme='success' use='primary' size='l' mb={4} onClick={handleClick}>
          Browse files
        </Button>
      </div>
      <div id="inpu-hint">Upload files, uncompressed, less than 1 GB in size.</div>
    </div>
  );
};
const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });

const DesignTokensProcessor = () => {
  const [baseTokensFileName, setBaseTokensFileName] = React.useState('');
  const [designTokensFileName, setDesignTokensFileName] = React.useState('');
  const [baseTokens, setBaseTokens] = React.useState(null);
  const [designTokens, setDesignTokens] = React.useState(null);
  const handleBaseTokensFile = React.useCallback(async (files) => {
    try {
      setBaseTokens(JSON.parse(await readFile(files[0])));
      setBaseTokensFileName(files[0]?.name);
      setTimeout(() => {
        document.querySelector('#replace-file-label-1')?.focus();
      }, 0);
    } catch (err) {
      console.error(err);
      setBaseTokens(null);
    }
  }, []);
  const handleDesignTokensFile = React.useCallback(async (files) => {
    try {
      setDesignTokens(JSON.parse(await readFile(files[0])));
      setDesignTokensFileName(files[0]?.name);
      setTimeout(() => {
        document.querySelector('#replace-file-label-2')?.focus();
      }, 0);
    } catch (err) {
      console.error(err);
      setDesignTokens(null);
    }
  }, []);
  const handleChangeBaseTokensFile = React.useCallback(() => {
    setBaseTokens(null);
    setTimeout(() => {
      document.querySelector('#base-tokens-file')?.focus();
    }, 0);
  }, []);
  const handleChangeDesignTokensFile = React.useCallback(() => {
    setDesignTokens(null);
    setTimeout(() => {
      document.querySelector('#design-tokens-file')?.focus();
    }, 0);
  }, []);

  const { css, json, error } = React.useMemo(() => {
    if (!designTokens) return {};
    try {
      const { processedTokens } = processTokens(baseTokens || {}, designTokens, 'intergalactic');

      return {
        css: tokensToCss(processedTokens),
        json: tokensToJson(processedTokens),
        error: null,
      };
    } catch (error) {
      return { error };
    }
  }, [baseTokens, designTokens]);

  return (
    <div className={styles.container}>
      <Box mb={2}>
        <label htmlFor='base-tokens-file' className={styles.fileInputLabel}>Upload base tokens JSON file</label>
        {!baseTokens && (
          <>
            <FileInput
              id='base-tokens-file'
              multiple={false}
              accept='application/json'
              onFile={handleBaseTokensFile}
            />
          </>
        )}
        {baseTokens && (
          <div className={styles.uploadedFileBlock} id="uploaded-file-label-1">
            <CheckM color='icon-primary-success' /> {`${baseTokensFileName} `}
            <Button onClick={handleChangeBaseTokensFile} ml={2} aria-labelledby="uploaded-file-label-1" id="replace-file-label-1">
              Replace file
            </Button>
          </div>
        )}
      </Box>
      <Box mb={2}>
        <label htmlFor='design-tokens-file' className={styles.fileInputLabel}>Upload semantic tokens JSON file</label>
        {!designTokens && (
          <>
            <FileInput
              id='design-tokens-file'
              multiple={false}
              accept='application/json'
              onFile={handleDesignTokensFile}
            />
          </>
        )}
        {designTokens && (
          <div className={styles.uploadedFileBlock} id="uploaded-file-label-2">
            <CheckM color='icon-primary-success' /> {`${designTokensFileName} `}
            <Button autoFocus onClick={handleChangeDesignTokensFile} ml={2} aria-labelledby="uploaded-file-label-2"  id="replace-file-label-2">
              Replace file
            </Button>
          </div>
        )}
      </Box>
      <div className={styles.processedSection} aria-live="polite" role="alert">
        {error && (
          <>
            <h3>Error occurred while processing your files</h3>
            {!baseTokens && <div>Maybe you forgot to provide base tokens?</div>}
            <code>{String(error.message ?? error)}</code>
          </>    
        )}
      </div>
      {css && json && !error && (
        <div className={styles.processedSection}>
          <div className={styles.processedBlock}>
            <div className={styles.processedBlockTitle}>
              <h3 htmlFor="copy-button-css">
                Processed CSS code
                </h3>
                <Copy copiedToast='Copied!' toCopy={css} trigger='click' onlyCopiedToast>
                  <Button addonLeft={CopyM} use='tertiary' theme="muted" ml={2} mb={2} id="copy-button-css">
                    Copy to clipboard
                    </Button>
                    </Copy>
            </div>
            <code className={styles.codeBlock}>{css}</code>
          </div>
          <div className={styles.processedBlock}>
            <div className={styles.processedBlockTitle}>
              <h3 htmlFor="copy-button-json">
                Processed JSON code
            </h3>
              <Copy copiedToast='Copied!' toCopy={json} trigger='click' onlyCopiedToast>
                <Button addonLeft={CopyM} use='tertiary' theme="muted" ml={2} mb={2} id="copy-button-json">
                  Copy to clipboard
                </Button>
              </Copy>
            </div>
            <code lang='css' className={styles.codeBlock}>
              {json}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};

const App = DesignTokensProcessor;
</script>

:::
