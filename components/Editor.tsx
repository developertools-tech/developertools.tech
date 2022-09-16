import dynamic from 'next/dynamic';
import React from 'react';

export interface EditorProps {
  name: string;
  mode?: 'json' | 'javascript' | 'html' | 'css' | 'markdown';
  onChange: (_value: string) => void;
}

function Loader() {
  return <div>Loading...</div>;
}

const AceJson = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-json');
    await import('ace-builds/src-noconflict/theme-monokai');
    await import('ace-builds/src-noconflict/ext-language_tools');
    return ace;
  },
  {
    loading: () => <Loader />,
    ssr: false,
  },
);

const AceJavascript = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-javascript');
    await import('ace-builds/src-noconflict/theme-monokai');
    await import('ace-builds/src-noconflict/ext-language_tools');
    return ace;
  },
  {
    loading: () => <Loader />,
    ssr: false,
  },
);

const AceHtml = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-html');
    await import('ace-builds/src-noconflict/theme-monokai');
    await import('ace-builds/src-noconflict/ext-language_tools');
    return ace;
  },
  {
    loading: () => <Loader />,
    ssr: false,
  },
);

const AceCss = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-css');
    await import('ace-builds/src-noconflict/theme-monokai');
    await import('ace-builds/src-noconflict/ext-language_tools');
    return ace;
  },
  {
    loading: () => <Loader />,
    ssr: false,
  },
);

const AceMarkdown = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-markdown');
    await import('ace-builds/src-noconflict/theme-monokai');
    await import('ace-builds/src-noconflict/ext-language_tools');
    return ace;
  },
  {
    loading: () => <Loader />,
    ssr: false,
  },
);

const options = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  useWorker: false,
};

const editorProps = { $blockScrolling: true };

export default function Editor({
  name,
  mode = 'markdown',
  onChange,
}: EditorProps) {
  switch (mode) {
    case 'json':
      return (
        <AceJson
          name={name}
          mode={mode}
          theme='monokai'
          onChange={onChange}
          width='100%'
          setOptions={options}
          editorProps={editorProps}
        />
      );
    case 'javascript':
      return (
        <AceJavascript
          name={name}
          mode={mode}
          theme='monokai'
          onChange={onChange}
          width='100%'
          setOptions={options}
          editorProps={editorProps}
        />
      );
    case 'html':
      return (
        <AceHtml
          name={name}
          mode={mode}
          theme='monokai'
          onChange={onChange}
          width='100%'
          setOptions={options}
          editorProps={editorProps}
        />
      );
    case 'css':
      return (
        <AceCss
          name={name}
          mode={mode}
          theme='monokai'
          onChange={onChange}
          width='100%'
          setOptions={options}
          editorProps={editorProps}
        />
      );
    default:
      return (
        <AceMarkdown
          name={name}
          mode='markdown'
          theme='monokai'
          onChange={onChange}
          width='100%'
          setOptions={options}
          editorProps={editorProps}
        />
      );
  }
}
