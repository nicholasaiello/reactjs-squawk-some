import * as types from '../constants/ActionTypes';
import * as api from '../api/streams';

const getStock = (result) => ({
  type: types.FETCH_STOCK,
  result
});

export const getMetaStock = (symbol) => (dispatch) => {
  if (!symbol || symbol.charAt(0) !== '$') {
    dispatch(getStock({symbol: 'no info'}));
    return;
  }

  api.getStockMeta(symbol)
    .then((result) => {
      dispatch(getStock(result));
    })
    .catch(err => console.log(err));
};
