import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(true);
  const [value, setValue] = useState('# Header');

  const toggleMode = () => {
    setEditing(!editing);
  };

  if (editing) {
    return (
      <div>
        <button className="mode-button" onClick={toggleMode}>
          Toggle Mode
        </button>
        <div className="text-editor">
          <MDEditor
            value={value}
            onChange={(e) => {
              setValue(e || '');
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <button className="mode-button" onClick={toggleMode}>
          Toggle Mode
        </button>
        <div className="text-editor card">
          <div className="card-content">
            {/* <MDEditor /> */}
            <MDEditor.Markdown source={value} />
          </div>
        </div>
      </div>
    );
  }
};

export default TextEditor;
