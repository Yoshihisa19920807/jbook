import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
    // console.log(service);
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    console.log(input);
    if (!ref.current) {
      return;
    }
    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // });
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
    });
    console.log(ref.current);
    console.log(result);
    setCode(result.outputFiles[0].text);
  };
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// ReactDOM.render(<App />, document.querySelector('#root'));
