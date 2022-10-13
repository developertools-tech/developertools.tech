import { json } from '@codemirror/lang-json';
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { styled } from '@mui/material/styles';
import { materialDark } from 'cm6-theme-material-dark';
import React, { useEffect, useRef } from 'react';

import useWindowSize from '../hooks/useWindowSize';

export interface EditorProps {
  extensions?: Extension[];
}

export default function Editor({ extensions = [] }: EditorProps) {
  const { width } = useWindowSize();
  const ref = useRef<HTMLDivElement | null>(null);

  const Wrapper = styled('div')({
    maxWidth: '1000px',
    width:
      (width || 0) > 600
        ? `${(width || 0) - 240 - 48}px`
        : `${(width || 0) - 48}px`,
    height: '60vh',
    '& .cm-editor': {
      height: '100%',
      width: '100%',
    },
  });

  useEffect(() => {
    if (!ref.current) return undefined;

    const view = new EditorView({
      extensions: [
        json(),
        ...extensions,
        lineNumbers(),
        syntaxHighlighting(defaultHighlightStyle),
        materialDark,
      ],
      parent: ref.current,
    });

    return () => view?.destroy();
  }, [ref, extensions]);

  return <Wrapper ref={ref} />;
}

/*

import { json } from '@codemirror/lang-json';
import type { ViewUpdate } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

import useWindowSize from '../hooks/useWindowSize';
import theme from '../styles/editorTheme';

type EditorExtensions = 'json';

export interface EditorProps {
  value?: string;
  onChange?: (_value: string, _viewUpdate: ViewUpdate) => void;
  extensions: EditorExtensions[];
}

export default function Editor({
  value,
  onChange,
  extensions,
}: EditorProps) {
  const { width } = useWindowSize();
  const editorExtensions = [];

  if (extensions.includes('json')) {
    editorExtensions.push(json());
  }

  return (
    <CodeMirror
      value={value}
      height='60vh'
      width={
        (width || 0) > 600
          ? `${(width || 0) - 240 - 48}px`
          : `${(width || 0) - 48}px`
      }
      theme={theme}
      extensions={editorExtensions}
      onChange={onChange}
    />
  );
}

*/
