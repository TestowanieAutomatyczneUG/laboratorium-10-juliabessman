import axios from 'axios';
import * as actions from './actions';

export const getQuotesList = () => {
  return async (dispatch) => {
    dispatch(actions.QuotesListRequestStartAction);
    console.log('GET');
    setTimeout(async () => {
      try {
        const response = await axios.get(
          'https://www.breakingbadapi.com/api/quotes',
        );
        dispatch(actions.QuotesListRequestAction(response.data));
      } catch (error) {
        dispatch(actions.QuotesListRequestFailAction(error));
      }
    }, 0);
  };
};
export const createQuote = (quote) => {
  return async (dispatch) => {
    dispatch(actions.QuotesListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.QuoteCreateNew(quote));
      } catch (error) {
        dispatch(actions.QuotesListRequestFailAction(error));
      }
    }, 0);
  };
};

export const editQuote = (quote) => {
  return async (dispatch) => {
    dispatch(actions.QuotesListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.QuoteEdit(quote));
      } catch (error) {
        dispatch(actions.QuotesListRequestFailAction(error));
      }
    }, 0);
  };
};

export const deleteQuote = (id) => {
  return async (dispatch) => {
    dispatch(actions.QuotesListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.QuoteDelete(id));
      } catch (error) {
        dispatch(actions.QuotesListRequestFailAction(error));
      }
    }, 0);
  };
};