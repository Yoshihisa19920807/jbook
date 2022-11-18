import produce from 'immer';
import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

// dataの中には複数のcellが含まれるためcellsState
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

const reducer = produce(
  (
    // 引数の初期値設定
    state: CellsState = initialState,
    action: Action
  ) => {
    switch (action.type) {
      case ActionTypes.UPDATE_CELL:
        const { id, content } = action.payload;
        // return {
        //   // // 「他を残す」ことを明示するためにスプレッド記法を使っている。
        //   // // stateをまんま返すがdataだけは上書きして返す --- (1)
        //   // ...state,
        //   // data: {
        //   //   // (1)の上書きの内容。同じことをやっている。
        //   //   // dataをまんま返すがdata内のaction.payload.idがkeyになっている要素は上書きして返す --- (2)
        //   //   ...state.data,
        //   //   [action.payload.id]: {
        //   //     // (2)の上書きの内容。これまた同じことをやっている。
        //   //     // data内のaction.payload.idがkeyになっている要素をまんま返すがcontent部分だけは上書きして返す。
        //   //     ...state.data[action.payload.id],
        //   //     content: action.payload.content,
        //   //   },
        //   // },
        //   // ↓id, contentを変数に置き換えた上での記述

        //   ...state,
        //   data: {
        //     ...state.data,
        //     [id]: {
        //       ...state.data[id],
        //       content: content,
        //     },
        //   },
        // };
        // ↓ write in immer

        // no need
        state.data[id].content = content;
        break;
      case ActionTypes.MOVE_CELL:
        return state;
      case ActionTypes.INSERT_CELL_BEFORE:
        return state;
      case ActionTypes.DELETE_CELL:
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
