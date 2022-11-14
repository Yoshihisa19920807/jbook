import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (
    <MonacoEditor
      // value="Inital Value"
      value={initialValue}
      theme="dark"
      language="javascript"
      height="500px"
      options={{
        wordWrap: 'on',
        minimap: {
          enabled: false,
        },
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
      }}
    />
  );
};

export default CodeEditor;
