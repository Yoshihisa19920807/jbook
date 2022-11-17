import * as esbuild from 'esbuild-wasm';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
// import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {
  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// ReactDOM.render(<App />, document.querySelector('#root'));
