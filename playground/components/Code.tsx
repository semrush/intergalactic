import { Box, Flex } from '@semcore/base-components';
import Check from '@semcore/icon/Check/m';
import GitHubInvertM from '@semcore/icon/color/GitHubInvert/m';
import Copy from '@semcore/icon/Copy/m';
import Button from '@semcore/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import { codeToHtml } from 'shiki';

import dispatchCopyCodeButtonClickEvent from '../events/copy_code_btn_click';
import dispatchViewSourceButtonClickEvent from '../events/view_source_btn_click';
import styles from '../styles/styles.module.css';

interface ICodeProps {
  sourceCode: string;
  link: string;
}

const CHANGE_ICON_TIMEOUT = 2000;

function Code({ sourceCode, link }: ICodeProps) {
  const [html, setHTML] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleViewSource = () => {
    dispatchViewSourceButtonClickEvent();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sourceCode);
      setIsCopied(true);

      dispatchCopyCodeButtonClickEvent();

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
        copyTimeoutRef.current = null;
      }, CHANGE_ICON_TIMEOUT);
    } catch (err) {}
  };

  useEffect(() => {
    codeToHtml(sourceCode, {
      lang: 'tsx',
      theme: 'github-dark',
      tabindex: false,
      transformers: [
        {
          tokens(tokens) {
            const updatedTokens = tokens.map((innnerTokens, idx) => {
              const lineNumber = idx + 1;
              const defaultPadding = 1;
              const padding = tokens.length > 0 ? Math.floor(Math.log10(tokens.length)) + defaultPadding : defaultPadding;

              return [
                {
                  content: `${lineNumber}`.padStart(padding),
                  htmlStyle: {
                    'color': '#6D7DA7',
                    'margin-right': 'var(--intergalactic-spacing-3x)',
                    'user-select': 'none',
                  },
                  offset: 0,
                },
                ...innnerTokens,
                {
                  content: ``.padEnd(padding),
                  htmlStyle: {
                    'color': '#6D7DA7',
                    'margin-right': 'var(--intergalactic-spacing-3x)',
                    'user-select': 'none',
                  },
                  offset: innnerTokens[innnerTokens.length - 1]?.offset + padding,
                },
              ];
            });

            return updatedTokens;
          },
          code(token) {
            token.properties = {
              'aria-label': 'TSX',
            };
          },
        },
      ],
    })
      .then(setHTML)
      .catch();
  }, [sourceCode]);

  if (!html) return;

  return (
    <Box className={styles.code}>
      <Box className={styles['source-code-wrapper']}>
        <Box className={styles['source-code']} dangerouslySetInnerHTML={{ __html: html }}></Box>
        <Flex gap={2} className={styles['source-code-controls']}>
          <Button
            tag='a'
            href={link}
            target='_blank'
            w={40}
            h={40}
            aria-label='View source on GitHub'
            onClick={handleViewSource}
          >
            <GitHubInvertM />
          </Button>
          <Button
            onClick={handleCopy}
            w={40}
            h={40}
            aria-label='Copy code'
          >
            {isCopied ? <Check /> : <Copy />}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default Code;
