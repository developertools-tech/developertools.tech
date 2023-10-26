import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as convert from 'colors-convert';
import { HEX, HSL, RGB } from 'colors-convert/dist/cjs/lib/types/types';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useLocalState from '../../hooks/useLocalState';
import useSupportsClipboardRead from '../../hooks/useSupportsClipboardRead';
import ContrastPreview from './ContrastPreview';

export default function TextContrastChecker({
  serializeColor,
  setToastMessage,
  setToastOpen,
  setToastSeverity,
}: {
  serializeColor: (value: HEX | HSL | RGB) => string;
  setToastMessage: (message: string) => void;
  setToastOpen: (open: boolean) => void;
  setToastSeverity: (severity: 'success' | 'error') => void;
}) {
  const { t } = useTranslation(['colors', 'common']);

  const supportsClipboardRead = useSupportsClipboardRead();

  const [fgColor, setFgColor] = useLocalState<string>({
    key: 'contrastChecker_fgColor',
    defaultValue: 'ffffff',
  });
  const [fgErr, setFgErr] = useLocalState<boolean>({
    key: 'colorPicker_fgErr',
    defaultValue: false,
  });
  const [bgColor, setBgColor] = useLocalState<string>({
    key: 'contrastChecker_bgColor',
    defaultValue: '000000',
  });
  const [bgErr, setBgErr] = useLocalState<boolean>({
    key: 'colorPicker_bgErr',
    defaultValue: false,
  });
  const [textContrast, setTextContrast] = useLocalState<string>({
    key: 'contastChecker_textContrast',
    defaultValue: '21',
  });
  const [contrastErr, setContrastErr] = useLocalState<string>({
    key: 'contastChecker_err',
    defaultValue: '',
  });

  const HEXColorRegExp = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const isValid = (color: string): boolean =>
    HEXColorRegExp.test(color);

  function HandleFgChange(hex: string) {
    setFgColor(serializeColor(hex));
    if (isValid(hex)) {
      setFgErr(false);
    } else {
      setContrastErr(t('colors:invalidHex'));
      setFgErr(true);
    }
  }

  function HandleBgChange(hex: string) {
    setBgColor(serializeColor(hex));
    if (isValid(hex)) {
      setBgErr(false);
    } else {
      setContrastErr(t('colors:invalidHex'));
      setBgErr(true);
    }
  }

  function handleColorSwap() {
    if (isValid(fgColor) && isValid(bgColor)) {
      HandleBgChange(fgColor);
      HandleFgChange(bgColor);
    }
  }

  const updateColors = (
    eventData:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } },
  ) => {
    try {
      setContrastErr('');
      const { name, value } = eventData.target;
      switch (name) {
        case 'foreground':
          HandleFgChange(value);
          break;
        case 'background':
          HandleBgChange(value);
          break;
        default:
          break;
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setContrastErr(e.message);
      }
    }
  };

  function lineariseRGB(rgb: number[]): number[] {
    return rgb.map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  }

  function calculateLuminance(value: RGB): number {
    const gammaEncoded = Object.values(value).map((v) => v / 255);
    const [r, g, b] = lineariseRGB(gammaEncoded);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function calculateContrast(hexValues: string[]) {
    if (!hexValues.every(isValid)) {
      return;
    }

    const [L1, L2] = hexValues
      .map((value) => calculateLuminance(convert.hexToRgb(`#${value}`)))
      .sort((l1, l2) => l2 - l1);
    const contrast = (L1 + 0.05) / (L2 + 0.05);
    setTextContrast(contrast.toFixed(2));
  }

  useEffect(() => {
    calculateContrast([fgColor, bgColor]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fgColor, bgColor]);

  return (
    <>
      <Typography
        mt={8}
        mb={4}
        variant='h6'
        component='h2'
      >
        {t('colors:contrastChecker')}
      </Typography>
      <Typography mb={4}>
        {t('colors:contrastCheckerDescription')}
      </Typography>
      <Box
        width='1000px'
        maxWidth='100%'
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent='center'
        alignItems={{ xs: 'center', md: 'flex-start' }}
        gap='4rem'
      >
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='stretch'
          gap={2}
        >
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='flex-end'
            gap={1}
          >
            <TextField
              label={t('colors:foreground')}
              name='foreground'
              error={fgErr}
              value={fgColor}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={updateColors}
            />
            <Box
              display='flex'
              flexWrap='wrap'
              gap={1}
            >
              <Button
                startIcon={<ContentCopyIcon />}
                disabled={!fgColor}
                onClick={() => {
                  navigator.clipboard.writeText(fgColor || '').then(
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
              {!!supportsClipboardRead && (
                <Button
                  startIcon={<ContentPasteGoIcon />}
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    if (text) {
                      setFgColor(text);
                      updateColors({
                        target: { name: 'fg', value: text },
                      });
                    }
                  }}
                >
                  {t('common:paste')}
                </Button>
              )}
            </Box>
          </Box>
          <Button
            aria-label={t('colors:swapColors')}
            startIcon={<SwapVertIcon />}
            onClick={handleColorSwap}
          >
            {t('colors:swap')}
          </Button>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='flex-end'
            gap={1}
          >
            <TextField
              label={t('colors:background')}
              name='background'
              error={bgErr}
              value={bgColor}
              onChange={updateColors}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box
              display='flex'
              flexWrap='wrap'
              gap={1}
            >
              <Button
                startIcon={<ContentCopyIcon />}
                disabled={!bgColor}
                onClick={() => {
                  navigator.clipboard.writeText(bgColor || '').then(
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
              {!!supportsClipboardRead && (
                <Button
                  startIcon={<ContentPasteGoIcon />}
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    if (text) {
                      setBgColor(text);
                      updateColors({
                        target: { name: 'bg', value: text },
                      });
                    }
                  }}
                >
                  {t('common:paste')}
                </Button>
              )}
            </Box>
          </Box>
          <Typography
            variant='body1'
            color='error'
            minHeight='26px'
          >
            {contrastErr}
          </Typography>
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
            minWidth='250px'
            minHeight='260px'
            mb={4}
            sx={{
              '& pre': {
                fontsize: '1rem',
                lineHeight: '1.4375em',
                letterSpacing: '0.00938em',
              },
            }}
          >
            contrast ratio:
            <Typography
              align='center'
              gutterBottom
              my={6}
              variant='h3'
            >
              {`${textContrast}:1`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <ContrastPreview
        contrast={textContrast}
        foreground={`#${fgColor}`}
        background={`#${bgColor}`}
      />
    </>
  );
}
