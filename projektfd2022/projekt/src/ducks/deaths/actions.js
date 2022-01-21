import types from './types';

export const DeathsListRequestAction = (deaths) => ({
  type: types.DEATHS_LIST,
  payload: deaths,
});

export const DeathsListRequestStartAction = () => ({
  type: types.DEATHS_LIST_REQUEST_START,
});

export const DeathsListRequestFailAction = (error) => ({
  type: types.DEATHS_LIST_REQUEST_FAIL,
  payload: error,
});
export const DeathCreateNew = (death) => ({
  type: types.DEATH_CREATE,
  payload: death,
});

export const DeathEdit = (death) => ({
  type: types.DEATH_EDIT,
  payload: death,
});

export const DeathDelete = (id) => ({
  type: types.DEATH_DELETE,
  payload: id,
});

export const DeathDeleteOne = (death) => ({
  type: types.DEATH_DELETE,
  payload: death,
});
