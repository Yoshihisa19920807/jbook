import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  // ": () => string" indicates that the type is a function whose return value is string?
  const editorDidMount = (getValue: () => string, monacoEditor: any) => {
    console.log(getValue());
    monacoEditor.onDidChangeModelContent((e: any) => {
      console.log(e);
      console.log('getValue()=code=editor');
      console.log(getValue());
      onChange(getValue());
    });
    // return onChange;
  };
  return (
    <MonacoEditor
      editorDidMount={editorDidMount}
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
