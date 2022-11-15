import * as esbuild from 'esbuild-wasm';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';

const App = () => {
  return (
    <div>
      <CodeCell />
      {/* <CodeCell /> */}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// ReactDOM.render(<App />, document.querySelector('#root'));
