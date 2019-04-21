import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QBE_START:
      return { ...state, message: action.message };
    case actionTypes.FETCH_QBE_PROGRESS:
      // console.log(action.payload.progress);
      return {
        ...state,
        progress: action.payload.progress,
        results: action.payload.results
      };
    case actionTypes.FETCH_QBE_SUCCESS:
      return { ...state, message: action.message };
    case actionTypes.FETCH_QBE_CLOSED:
      return { ...state, message: action.message };
    case actionTypes.FETCH_QBE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};