import { Cell } from '../state/cell';

const CellListItem = ({ cell }: { cell: Cell }) => {
  return (
    <div>
      <span>ID: {cell.id}</span>
      <br />
      <span>Content: {cell.content}</span>
      <br />
      <br />
    </div>
  );
};

export default CellListItem;
