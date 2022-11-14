import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      // node_moduleのファイル構造から推測
      wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
    // console.log(service);
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    // console.log(input);
    // console.log(ref.current);
    if (!ref.current) {
      return;
    }
    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // });

    iframe.current.srcdoc = html;
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        // double quote!! to indicate it's a string
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    // console.log(ref.current);
    // console.log(result);
    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
    console.log(1);
    // try {
    //   // execute javascript
    //   eval(result.outputFiles[0].text);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  // const html = `
  // <script>

  // ${code}</script>`.replace(/<\/script>/, '<\\/script>');
  const html = `
  <html>
    <head></head>
    <body>
    <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data)
          } catch(err) {
            const root = document.getElementById("root")
            console.error(err)
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
          };
        }, false);
      </script>
    </body>
  </html>
  `;
  return (
    <div>
      <CodeEditor initialValue="Inital Value" />
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// ReactDOM.render(<App />, document.querySelector('#root'));
