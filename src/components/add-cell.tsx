import React from 'react';
import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  nextCellId: string;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div>
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
  );
};

export default AddCell;
