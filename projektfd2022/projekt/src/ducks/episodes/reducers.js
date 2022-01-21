import types from './types';

const initState = {
  episodes: [],
  loading: false,
  error: '',
};

const episodesReducer = (state = initState, action) => {
  switch (action.type) {
    case types.EPISODES_LIST_REQUEST_START:
      return { ...state, loading: true };
    case types.EPISODES_LIST_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.EPISODES_LIST:
      return { ...state, episodes: [...action.payload], loading: false };
    case types.EPISODE_CREATE:
      return {
        ...state,
        episodes: [...state.episodes, action.payload],
        loading: false,
      };
    case types.EPISODE_EDIT:
      return {
        ...state,
        episodes: state.episodes.map((e) => {
          if (e.episode_id === action.payload.episode_id) {
            return action.payload;
          }
          return e;
        }),
        loading: false,
      };
    case types.EPISODE_DELETE:
      return {
        ...state,
        episodes: state.episodes.filter((c) => c.episode_id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default episodesReducer;
