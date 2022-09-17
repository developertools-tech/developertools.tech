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
