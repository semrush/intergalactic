import React from 'react';
import '@semcore/ui/utils/lib/themes/default.css'; /** TO REMOVE WHEN THEME PR WILL BE MERGED */
import Button from '@semcore/ui/button';
import { Box } from '@semcore/ui/flex-box';
import CheckM from '@semcore/icon/Check/m';
import cx from 'classnames';
import Code from '../../../../src/components/Code';
import { processTokens, tokensToJson, tokensToCss } from '@semcore/utils/theme/utils';
import styles from './processor.module.css';
import Copy from '@components/Copy';

const FileInput = ({ id, onFile, multiple, accept }) => {
  const [dragging, setDragging] = React.useState(false);

  const handleDragStart = React.useCallback(() => setDragging(true), []);
  const handleDragEnd = React.useCallback(() => setDragging(false), []);
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
      <div className={styles.dropzoneInner}>
        <div>Drag files here</div>
        <div>or</div>
        <Button theme="success" use="primary">
          Browse files
        </Button>
      </div>
      <div>Upload files, uncompressed, less than 1 GB in size</div>
      <input
        className={styles.fileInput}
        id={id}
        multiple={multiple}
        type="file"
        accept={accept}
        onChange={(event) => onFile([...(event.target.files ?? [])])}
      />
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
  const [baseTokens, setBaseTokens] = React.useState(null);
  const [designTokens, setDesignTokens] = React.useState(null);
  const handleBaseTokensFile = React.useCallback(async (files) => {
    try {
      setBaseTokens(JSON.parse(await readFile(files[0])));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setBaseTokens(null);
    }
  }, []);
  const handleDesignTokensFile = React.useCallback(async (files) => {
    try {
      setDesignTokens(JSON.parse(await readFile(files[0])));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setDesignTokens(null);
    }
  }, []);
  const handleChangeBaseTokensFile = React.useCallback(() => setBaseTokens(null), []);
  const handleChangeDesignTokensFile = React.useCallback(() => setDesignTokens(null), []);

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
        <label htmlFor="base-tokens-file">Base tokens file:</label>
        {!baseTokens && (
          <>
            <FileInput
              id="base-tokens-file"
              multiple={false}
              accept="application/json"
              onFile={handleBaseTokensFile}
            />
          </>
        )}
        {baseTokens && (
          <div className={styles.uploadedFileBlock}>
            <CheckM color="green-400" /> File selected{' '}
            <button
              className={styles.changeFileButton}
              id="base-tokens-file"
              onClick={handleChangeBaseTokensFile}
            >
              replace file
            </button>
          </div>
        )}
      </Box>
      <Box mb={2}>
        <label htmlFor="design-tokens-file">Design tokens file:</label>
        {!designTokens && (
          <>
            <FileInput
              id="design-tokens-file"
              multiple={false}
              accept="application/json"
              onFile={handleDesignTokensFile}
            />
          </>
        )}
        {designTokens && (
          <div className={styles.uploadedFileBlock}>
            <CheckM color="green-400" /> File selected{' '}
            <button
              className={styles.changeFileButton}
              id="base-tokens-file"
              onClick={handleChangeDesignTokensFile}
            >
              replace file
            </button>
          </div>
        )}
      </Box>
      {error && (
        <div className={styles.processedSection}>
          <h4>Error occurred while processing your files.</h4>
          {!baseTokens && <div>Maybe you forgot to provide base tokens?</div>}
          <code>{String(error.message ?? error)}</code>
        </div>
      )}
      {css && json && !error && (
        <div className={styles.processedSection}>
          <div className={styles.processedBlock}>
            <h4>
              Processed
              <span className={styles.extension}>.css</span>
              <Copy copiedToast="Copied!" toCopy={css} trigger="click">
                <span className={styles.clickToCopy}>click copy</span>
              </Copy>
            </h4>
            <Code lang="css" className={styles.codeBlock}>
              {css}
            </Code>
          </div>
          <div className={styles.processedBlock}>
            <h4>
              Processed
              <span className={styles.extension}>.json</span>
              <Copy copiedToast="Copied!" toCopy={json} trigger="click">
                <span className={styles.clickToCopy}>click copy</span>
              </Copy>
            </h4>
            <Code lang="css" className={styles.codeBlock}>
              {json}
            </Code>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignTokensProcessor;
