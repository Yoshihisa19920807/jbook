import * as esbuild from 'esbuild-wasm';
import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <CodeEditor
          initialValue="const a = 'Inital Value';"
          onChange={(value) => {
            console.log('value_index');
            console.log(value);
            setInput(value);
          }}
        />
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
// ReactDOM.render(<App />, document.querySelector('#root'));
