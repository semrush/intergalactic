import Check from '@semcore/icon/Check/m';
import GitHubInvertM from '@semcore/icon/color/GitHubInvert/m';
import Copy from '@semcore/icon/Copy/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import { codeToHtml } from 'shiki';

import dispatchCopyCodeButtonClickEvent from '../events/copy_code_btn_click';
import dispatchViewSourceButtonClickEvent from '../events/view_source_btn_click';
import useFocusableScrollRef from '../hooks/useFocusableScrollRef';
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
  const scrollableContainerRef = useFocusableScrollRef<HTMLDivElement>();

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
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
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
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, [sourceCode]);

  if (!html) return;

  return (
    <Box ref={scrollableContainerRef} className={styles.code} role='group' aria-label='Source code and actions'>
      <Box className={styles.sourceCodeWrapper}>
        <Box className={styles.sourceCode} dangerouslySetInnerHTML={{ __html: html }}></Box>
        <Flex gap={2} className={styles.sourceCodeControls}>
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
