import { Cell } from '../state/cell';
import TextEditor from './text-editor';
import CodeCell from './code-cell';
import ActionBar from './action-bar';
import './cell-list-item.css';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child =
    cell.type === 'code' ? (
      <CodeCell cell={cell} />
    ) : (
      <TextEditor cell={cell} />
    );
  return (
    <div className="cell-list-item">
      <ActionBar id={cell.id} />
      {child}
    </div>
  );
};

export default CellListItem;
