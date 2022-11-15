import './code-editor.css';
import './syntax.css';

import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import CodeShift from 'jscodeshift';
import Hiligher from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  // ": () => string" indicates that the type is a function whose return value is string?
  const editorRef = useRef<any>();
  const editorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    console.log(getValue());
    // ？はnilガード
    monacoEditor.getModel()?.updateOptions({
      tabSize: 2,
    });

    const highlighter = new Hiligher(
      // ignores the type check for the next line
      // @ts-ignore
      window.monaco,
      // ↑ When implementing monaco editor, it automatically provide monaco property to the global window
      CodeShift,
      monacoEditor
    );
    console.log(highlighter);
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined, // Custom for how errors would be spitted out
      () => {}
    );

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
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        singleQuote: true,
      })
      // $ indicates the end
      .replace(/\n$/, '');
    editorRef.current.getModel().setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={editorDidMount}
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
