import { json } from '@codemirror/lang-json';
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import React, { useEffect, useRef } from 'react';

export interface EditorProps {
  extensions?: Extension[];
}

export default function Editor({ extensions = [] }: EditorProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return undefined;

    const view = new EditorView({
      extensions: [
        json(),
        ...extensions,
        lineNumbers(),
        syntaxHighlighting(defaultHighlightStyle),
      ],
      parent: ref.current,
    });

    return () => view?.destroy();
  }, [ref, extensions]);

  return <div ref={ref} />;
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
