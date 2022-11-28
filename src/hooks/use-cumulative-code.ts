import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const showFunc = `
      import _React from 'react'
      import _ReactDOM from 'react-dom'
      var show = (value) => {
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, document.querySelector('#root'))
          } else {
            document.querySelector('#root').innerHTML = JSON.stringify(value);
          }
        } else{
          document.querySelector('#root').innerHTML = value;
        }
      };
    `;
    const showFuncNoop = `var show = () => {}`;
    const codeArray = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          codeArray.push(showFunc);
        } else {
          codeArray.push(showFuncNoop);
        }
        codeArray.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return codeArray;
  });
  return cumulativeCode;
};
