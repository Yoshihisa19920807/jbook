import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <MonacoEditor
      theme="dark"
      language="javascript"
      height="500px"
      options={{
        wordWrap: 'on',
      }}
    />
  );
};

export default CodeEditor;
