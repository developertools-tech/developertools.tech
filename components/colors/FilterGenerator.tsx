import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as convert from 'colors-convert';
import React, { startTransition, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useLocalState from '../../hooks/useLocalState';
import Color from '../../lib/colors/Color';
import Solver from '../../lib/colors/Solver';
import FilterPreviewPane from './FilterPreviewPane';

export default function FilterGenerator({
  input,
  setToastMessage,
  setToastOpen,
  setToastSeverity,
}: {
  input: string;
  setToastMessage: (message: string) => void;
  setToastOpen: (open: boolean) => void;
  setToastSeverity: (severity: 'success' | 'error') => void;
}) {
  const { t } = useTranslation('aspectRatio');

  const [filter, setFilter] = useLocalState<string>({
    key: 'colorPicker_filterString',
    defaultValue: '',
  });

  const [loss, setLoss] = useLocalState<number>({
    key: 'colorPicker_filterLoss',
    defaultValue: 0,
  });

  const rgb = convert.hexToRgb(input);

  const HEXColorRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const isValid = HEXColorRegExp.test(input);

  function generateFilterString() {
    if (!isValid || Object.keys(rgb).length !== 3) {
      return;
    }

    const color = new Color(rgb.r, rgb.g, rgb.b);
    const solver = new Solver(color);

    let tries = 0;
    let result = solver.solve();
    while (result.loss > 0.1 && tries < 25) {
      const attempt = solver.solve();
      if (attempt.loss < result.loss) {
        result = attempt;
      }
      tries++;
    }

    setFilter(result.filter);
    setLoss(result.loss);
  }

  useEffect(() => {
    startTransition(generateFilterString);
  }, [input]); /* eslint-disable-line react-hooks/exhaustive-deps */

  if (Object.keys(rgb).length !== 3 || !isValid) {
    return null;
  }

  return (
    <>
      <Typography
        mb={4}
        variant='h6'
        component='h2'
      >
        CSS Filter Generator
      </Typography>
      <Typography mb={4}>
        Use this filter to transform any color into the selected color.
      </Typography>
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        gap={8}
      >
        <Box
          display='flex'
          flexDirection='column'
          gap={1}
        >
          <FilterPreviewPane
            color={input}
            filter={filter}
          />
          <Typography>Loss: {loss.toFixed(3)}</Typography>
          <div>
            <Button
              startIcon={<ReplayIcon />}
              onClick={generateFilterString}
            >
              Regenerate
            </Button>
          </div>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          gap={1}
        >
          <Box
            padding='16.5px 14px'
            borderRadius='4px'
            border='1px solid #494949'
            minWidth='260px'
            sx={{
              '& pre': {
                fontsize: '1rem',
                lineHeight: '1.4375em',
                letterSpacing: '0.00938em',
              },
            }}
          >
            <pre>
              <code>filter: {filter}</code>
            </pre>
          </Box>
          <Box
            display='flex'
            justifyContent='flex-end'
            gap={2}
          >
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!filter}
              onClick={() => {
                navigator.clipboard
                  .writeText(`filter: ${filter}` || '')
                  .then(
                    () => {
                      setToastMessage(t('common:copiedToClipboard'));
                      setToastSeverity('success');
                      setToastOpen(true);
                    },
                    () => {
                      setToastMessage(
                        t('common:failedToCopyToClipboard'),
                      );
                      setToastSeverity('error');
                      setToastOpen(true);
                    },
                  );
              }}
            >
              {t('common:copy')}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
