import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from './components/preview';
import bundle from './bundler';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // const startService = async () => {
  //   ref.current = await esbuild.startService({
  //     worker: true,
  //     // node_moduleのファイル構造から推測
  //     wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
  //   });
  //   // console.log(service);
  // };

  // useEffect(() => {
  //   startService();
  // }, []);

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
