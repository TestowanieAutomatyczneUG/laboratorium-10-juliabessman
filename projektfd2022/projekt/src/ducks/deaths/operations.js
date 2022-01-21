import axios from 'axios';
import * as actions from './actions';

export const getDeathsList = () => {
  return async (dispatch) => {
    dispatch(actions.DeathsListRequestStartAction);
    console.log('GET');
    setTimeout(async () => {
      try {
        const response = await axios.get(
          'https://www.breakingbadapi.com/api/deaths',
        );
        dispatch(actions.DeathsListRequestAction(response.data));
      } catch (error) {
        dispatch(actions.DeathsListRequestFailAction(error));
      }
    }, 0);
  };
};
export const createDeath = (death) => {
  return async (dispatch) => {
    dispatch(actions.DeathsListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.DeathCreateNew(death));
      } catch (error) {
        dispatch(actions.DeathsListRequestFailAction(error));
      }
    }, 0);
  };
};

export const editDeath = (death) => {
  return async (dispatch) => {
    dispatch(actions.DeathsListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.DeathEdit(death));
      } catch (error) {
        dispatch(actions.DeathsListRequestFailAction(error));
      }
    }, 0);
  };
};

export const deleteDeath = (id) => {
  return async (dispatch) => {
    dispatch(actions.DeathsListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.DeathDelete(id));
      } catch (error) {
        dispatch(actions.DeathsListRequestFailAction(error));
      }
    }, 0);
  };
};
