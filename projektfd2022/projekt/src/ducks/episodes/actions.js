import types from './types';

export const EpisodesListRequestAction = (episodes) => ({
  type: types.EPISODES_LIST,
  payload: episodes,
});

export const EpisodesListRequestStartAction = () => ({
  type: types.EPISODES_LIST_REQUEST_START,
});

export const EpisodesListRequestFailAction = (error) => ({
  type: types.EPISODES_LIST_REQUEST_FAIL,
  payload: error,
});

export const EpisodeCreateNew = (episode) => ({
  type: types.EPISODE_CREATE,
  payload: episode,
});

export const EpisodeEdit = (episode) => ({
  type: types.EPISODE_EDIT,
  payload: episode,
});

export const EpisodeDelete = (id) => ({
  type: types.EPISODE_DELETE,
  payload: id,
});
