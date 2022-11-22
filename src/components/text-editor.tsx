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
  const { updateCell } = useActions();

  const toggleMode = () => {
    setEditing(!editing);
  };

  if (editing) {
    return (
      <div className="text-editor-wrapper">
        <button
          className="button mode-button is-primary is-small"
          onClick={toggleMode}
        >
          Mode Switch
        </button>
        <div className="text-editor">
          <MDEditor
            value={cell.content}
            onChange={(e) => {
              updateCell(cell.id, e || '');
            }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-editor-wrapper">
        <button
          className="button mode-button is-primary is-small"
          onClick={toggleMode}
        >
          Mode Switch
        </button>
        <div className="text-editor card">
          <div className="card-content">
            <MDEditor.Markdown source={cell.content} />
          </div>
        </div>
      </div>
    );
  }
};

export default TextEditor;
