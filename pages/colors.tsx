import ColorizeIcon from '@mui/icons-material/Colorize';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { TextField, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as convert from 'colors-convert';
import { HEX, HSL, RGB } from 'colors-convert/dist/cjs/lib/types/types';
import { Namespace } from 'i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ChangeEvent, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useTranslation } from 'react-i18next';
import useEyeDropper from 'use-eye-dropper';

import FilterGenerator from '../components/colors/FilterGenerator';
import PreviewPane from '../components/colors/PreviewPane';
import TextContrastChecker from '../components/colors/TextContrastChecker';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';
import nextI18NextConfig from '../next-i18next.config.js';

function serializeColor(value: HEX | HSL | RGB): string {
  if (typeof value === 'object') {
    return Object.values(value).join(', ');
  }
  return value.replace(/^#/, '');
}

function stringToNumArray(value: string): number[] | string {
  const valArr = value.split(',');
  if (
    valArr?.length >= 3 &&
    valArr.every((v) => !Number.isNaN(Number(v) || NaN))
  ) {
    return value.split(',').map((v) => parseInt(v, 10));
  }

  return value;
}

export default function Colors() {
  const { t } = useTranslation(['common', 'colors']);

  const supportsClipboardRead = useSupportsClipboardRead();
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const { open, isSupported } = useEyeDropper();

  const [pickerColor, setPickerColor] = useLocalState<string>({
    key: 'colorPicker_pickerColor',
    defaultValue: '#000000',
  });
  const [hexColor, setHexColor] = useLocalState<string>({
    key: 'colorPicker_hexColor',
    defaultValue: '000000',
  });
  const [hexErr, setHexErr] = useLocalState<boolean>({
    key: 'colorPicker_hexErr',
    defaultValue: false,
  });
  const [hslColor, setHslColor] = useLocalState<string>({
    key: 'colorPicker_hslColor',
    defaultValue: '0, 0, 0',
  });
  const [hslErr, setHslErr] = useLocalState<boolean>({
    key: 'colorPicker_hslErr',
    defaultValue: false,
  });
  const [rgbColor, setRGBColor] = useLocalState<string>({
    key: 'colorPicker_rgbColor',
    defaultValue: '0, 0, 0',
  });
  const [rgbErr, setRgbErr] = useLocalState<boolean>({
    key: 'colorPicker_rgbErr',
    defaultValue: false,
  });
  const [err, setErr] = useLocalState<string>({
    key: 'colorPicker_err',
    defaultValue: '',
  });

  function HandleHexChange(hex: string) {
    setHexColor(serializeColor(hex));
    const sanitized = hex.replace(/^#/, '');
    if (/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
      setHslColor(serializeColor(convert.hexToHsl(`#${sanitized}`)));
      setRGBColor(serializeColor(convert.hexToRgb(`#${sanitized}`)));
      setPickerColor(`#${sanitized}`);
    } else {
      setErr(t('colors:invalidHex'));
      setHexErr(true);
    }
  }

  function HandleRGBChange(value: string) {
    const valArr = stringToNumArray(value);
    if (Array.isArray(valArr)) {
      const rgb = {
        r: valArr[0] <= 255 ? valArr[0] : 255,
        g: valArr[1] <= 255 ? valArr[1] : 255,
        b: valArr[2] <= 255 ? valArr[2] : 255,
      };
      const hex = convert.rgbToHex(rgb);
      setHexColor(serializeColor(hex));
      setPickerColor(hex);
      setRGBColor(serializeColor(rgb));
      setHslColor(serializeColor(convert.rgbToHsl(rgb)));
    } else {
      setRGBColor(value);
      setErr(t('colors:invalidRGB'));
      setRgbErr(true);
    }
  }

  function HandleHSLChange(value: string) {
    const valArr = stringToNumArray(value);
    if (Array.isArray(valArr)) {
      const hsl = {
        h: valArr[0] <= 359 ? valArr[0] : 359,
        s: valArr[1] <= 100 ? valArr[1] : 100,
        l: valArr[2] <= 100 ? valArr[2] : 100,
      };
      const hex = convert.hslToHex(hsl);
      setPickerColor(hex);
      setHexColor(serializeColor(hex));
      setHslColor(serializeColor(hsl));
      setRGBColor(serializeColor(convert.hslToRgb(hsl)));
    } else {
      setHslColor(value);
      setErr(t('colors:invalidHSL'));
      setHslErr(true);
    }
  }

  const updateColors = (
    eventData:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } },
  ) => {
    try {
      setErr('');
      setHexErr(false);
      setRgbErr(false);
      setHslErr(false);
      const { name, value } = eventData.target;
      switch (name) {
        case 'hex':
          HandleHexChange(value);
          break;
        case 'rgb':
          HandleRGBChange(value);
          break;
        case 'hsl':
          HandleHSLChange(value);
          break;
        default:
          break;
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      }
    }
  };

  function pickColor() {
    open()
      .then((color) =>
        updateColors({ target: { name: 'hex', value: color.sRGBHex } }),
      )
      .catch((_e) => {});
  }

  return (
    <Layout title={t('common:colors')}>
      <Typography
        mb={4}
        variant='h6'
        component='h2'
      >
        Color Picker
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
        >
          <Box
            display='flex'
            flexDirection='column'
            gap={4}
          >
            <PreviewPane color={pickerColor} />
            <HexColorPicker
              color={pickerColor}
              onChange={(color) => {
                updateColors({
                  target: { name: 'hex', value: color },
                });
              }}
            />
            {isSupported() ? (
              <Button
                onClick={pickColor}
                variant='text'
                aria-label={t('colors:openColorPicker')}
              >
                <ColorizeIcon />
              </Button>
            ) : (
              <Tooltip
                placement='top'
                title={t('colors:eyeDropperNotSupported')}
              >
                <span style={{ textAlign: 'center' }}>
                  <Button
                    disabled
                    variant='text'
                  >
                    <ColorizeIcon />
                  </Button>
                </span>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='stretch'
          gap={7}
        >
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='flex-end'
            gap={1}
          >
            <TextField
              label={t('colors:hex')}
              name='hex'
              error={hexErr}
              value={hexColor}
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
                disabled={!hexColor}
                onClick={() => {
                  navigator.clipboard.writeText(hexColor || '').then(
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
                      setHexColor(text);
                      updateColors({
                        target: { name: 'hex', value: text },
                      });
                    }
                  }}
                >
                  {t('common:paste')}
                </Button>
              )}
            </Box>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='flex-end'
            gap={1}
          >
            <TextField
              label={t('colors:hsl')}
              name='hsl'
              error={hslErr}
              value={hslColor}
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
                disabled={!hslColor}
                onClick={() => {
                  navigator.clipboard.writeText(hslColor || '').then(
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
                      setHslColor(text);
                      updateColors({
                        target: { name: 'hsl', value: text },
                      });
                    }
                  }}
                >
                  {t('common:paste')}
                </Button>
              )}
            </Box>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='flex-end'
            gap={1}
          >
            <TextField
              label={t('colors:rgb')}
              name='rgb'
              error={rgbErr}
              value={rgbColor}
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
                disabled={!rgbColor}
                onClick={() => {
                  navigator.clipboard.writeText(rgbColor || '').then(
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
                      setRGBColor(text);
                      updateColors({
                        target: { name: 'rgb', value: text },
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
            {err}
          </Typography>
        </Box>
      </Box>
      <FilterGenerator
        input={pickerColor}
        setToastMessage={setToastMessage}
        setToastSeverity={setToastSeverity}
        setToastOpen={setToastOpen}
      />
      <TextContrastChecker
        serializeColor={serializeColor}
        setToastMessage={setToastMessage}
        setToastSeverity={setToastSeverity}
        setToastOpen={setToastOpen}
      />
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['common', 'colors'];
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(
    locale || 'en',
    i18nextNameSpaces as string[],
    nextI18NextConfig,
  );
  return {
    props: { ...translation },
  };
};
