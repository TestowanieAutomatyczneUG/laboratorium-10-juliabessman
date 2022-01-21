import types from './types';

export const QuotesListRequestAction = (quotes) => ({
  type: types.QUOTES_LIST,
  payload: quotes,
});

export const QuotesListRequestStartAction = () => ({
  type: types.QUOTES_LIST_REQUEST_START,
});

export const QuotesListRequestFailAction = (error) => ({
  type: types.QUOTES_LIST_REQUEST_FAIL,
  payload: error,
});
export const QuoteCreateNew = (quote) => ({
  type: types.QUOTE_CREATE,
  payload: quote,
});

export const QuoteEdit = (quote) => ({
  type: types.QUOTE_EDIT,
  payload: quote,
});

export const QuoteDelete = (id) => ({
  type: types.QUOTE_DELETE,
  payload: id,
});

export const QuoteDeleteOne = (quote) => ({
  type: types.QUOTE_DELETE,
  payload: quote,
});
