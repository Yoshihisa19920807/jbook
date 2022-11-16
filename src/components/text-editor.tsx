import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);

  const toggleMode = () => {
    setEditing(!editing);
  };

  if (editing) {
    return (
      <div>
        <button onClick={toggleMode}>Toggle Mode</button>
        <MDEditor />
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={toggleMode}>Toggle Mode</button>
        {/* <MDEditor /> */}
        <MDEditor.Markdown source={'# header'} />
      </div>
    );
  }
};

export default TextEditor;
