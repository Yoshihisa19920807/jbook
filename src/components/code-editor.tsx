import { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  // ": () => string" indicates that the type is a function whose return value is string?
  const editorRef = useRef<any>();
  const editorDidMount = (getValue: () => string, monacoEditor: any) => {
    editorRef.current = monacoEditor;
    console.log(getValue());
    monacoEditor.getModel().updateOptions({
      tabSize: 2,
    });
    monacoEditor.onDidChangeModelContent((e: any) => {
      console.log(e);
      console.log('getValue()=code=editor');
      console.log(getValue());
      onChange(getValue());
    });
    // return onChange;
  };

  const onFormatClick = () => {
    // function_a().function_b()の形で使える
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      singleQuote: true,
    });
    console.log(editorRef.current);
    // onChange(formatted);
    editorRef.current.getModel().setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
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
    </div>
  );
};

export default CodeEditor;
