import { Cell } from '../state/cell';
import TextEditor from './text-editor';
import CodeCell from './code-cell';

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
    <div>
      {child}
      <br />
    </div>
  );
};

export default CellListItem;
