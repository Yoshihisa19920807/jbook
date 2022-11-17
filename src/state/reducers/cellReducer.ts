import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  // key = id, Cell = data of a cell
  data: { [key: string]: Cell };
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: CellsState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};
// 引数の初期値設定
const reducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionTypes.UPDATE_CELL:
      return state;
    case ActionTypes.MOVE_CELL:
      return state;
    case ActionTypes.INSERT_CELL_BEFORE:
      return state;
    case ActionTypes.DELETE_CELL:
      return state;
    default:
      return state;
  }
  return state;
};

export default reducer;
