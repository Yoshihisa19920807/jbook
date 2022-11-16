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
        <button onClick={toggleMode}>Toggle Mode</button>
        <MDEditor
          value={value}
          onChange={(e) => {
            setValue(e || '');
          }}
        />
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={toggleMode}>Toggle Mode</button>
        {/* <MDEditor /> */}
        <MDEditor.Markdown source={value} />
      </div>
    );
  }
};

export default TextEditor;
