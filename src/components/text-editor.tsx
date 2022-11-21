import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(true);
  // const [value, setValue] = useState('# Header');
  const { updateCell } = useActions();

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
            // value={value}
            value={cell.content}
            onChange={(e) => {
              // setValue(e || '');
              updateCell(cell.id, e || '');
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
            <MDEditor.Markdown
              // source={value}
              source={cell.content}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default TextEditor;
