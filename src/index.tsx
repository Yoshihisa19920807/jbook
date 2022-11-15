import * as esbuild from 'esbuild-wasm';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeEditor from './components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from './components/preview';
import bundle from './bundler';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 'Inital Value';"
        onChange={(value) => {
          console.log('value_index');
          console.log(value);
          setInput(value);
        }}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// ReactDOM.render(<App />, document.querySelector('#root'));
