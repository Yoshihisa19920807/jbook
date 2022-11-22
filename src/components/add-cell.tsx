import React from 'react';
import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className="add-cell">
      <div className="add-buttons">
        <button
          onClick={() => {
            insertCellBefore(nextCellId, 'code');
          }}
        >
          Add Cell
        </button>
        <button
          onClick={() => {
            insertCellBefore(nextCellId, 'text');
          }}
        >
          Add Text
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
