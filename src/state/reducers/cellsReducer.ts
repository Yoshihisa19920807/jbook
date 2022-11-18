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
      case ActionTypes.UPDATE_CELL: {
        let { id, content } = action.payload;
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

        // No need return anything. Immer handles it.
        state.data[id].content = content;
        return;
      }
      case ActionTypes.MOVE_CELL: {
        let { id, direction } = action.payload;
        const index = state.order.findIndex((orderId) => orderId === id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        // Invalid case
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return;
        }
        // payloadで持っているidでの上書きを後回し
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = id;
        return;
      }
      case ActionTypes.INSERT_CELL_BEFORE: {
        return state;
      }
      case ActionTypes.DELETE_CELL: {
        delete state.data[action.payload.id];
        state.order = state.order.filter((id) => id !== action.payload.id);
        return;
      }
      default: {
        return state;
      }
    }
  },
  initialState
);

export default reducer;
