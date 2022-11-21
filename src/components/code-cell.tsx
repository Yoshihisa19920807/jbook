import * as esbuild from 'esbuild-wasm';
import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);
    // Executed at the cleanup phase
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  // const onClick = async () => {
  //   const output = await bundle(input);
  //   setCode(output);
  // };

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 'Inital Value';"
            onChange={(value) => {
              updateCell(cell.id, value);
            }}
          />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
// ReactDOM.render(<App />, document.querySelector('#root'));
