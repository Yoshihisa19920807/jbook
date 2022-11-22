import { useTypedSelector } from '../hooks/use-typed-selector';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';
import { Fragment } from 'react';

const CellList: React.FC = () => {
  // useSelector allows you to extract data from the Redux store state, using a selector function.
  // Example: const counter = useSelector((state) => state.counter)

  // This code returns only the order property and the data property of the cells.
  // ```({ cells: { order, data } })``` is translated as ```{<argument>.cells.order, <argument>.cells.data}```
  // And <argument> is RootState in this case
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell nextCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div>
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
