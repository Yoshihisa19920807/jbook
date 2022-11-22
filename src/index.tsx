import * as esbuild from 'esbuild-wasm';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state';
// import CodeCell from './components/code-cell';
// import TextEditor from './components/text-editor';
import CellList from './components/cell-list';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// ReactDOM.render(<App />, document.querySelector('#root'));
