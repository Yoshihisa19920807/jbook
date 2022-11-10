import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

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
    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });
    console.log(ref.current);
    console.log(result);
    setCode(result.code);
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
