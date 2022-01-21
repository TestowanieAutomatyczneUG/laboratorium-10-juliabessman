import types from './types';

const initState = {
  quotes: [],
  loading: false,
  error: '',
};

const quotesReducer = (state = initState, action) => {
  switch (action.type) {
    case types.QUOTES_LIST_REQUEST_START:
      return { ...state, loading: true };
    case types.QUOTES_LIST_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.QUOTES_LIST:
      return { ...state, quotes: [...action.payload], loading: false };
      case types.QUOTE_CREATE:
      return {
        ...state,
        quotes: [...state.quotes, action.payload],
        loading: false,
      };
    case types.QUOTE_EDIT:
      return {
        ...state,
        quotes: state.quotes.map((q) => {
          if (q.quote_id === action.payload.quote_id) {
            return action.payload;
          }
          return q;
        }),
        loading: false,
      };
    case types.QUOTE_DELETE:
      return {
        ...state,
        quotes: state.quotes.filter((q) => q.quotes_id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default quotesReducer;
