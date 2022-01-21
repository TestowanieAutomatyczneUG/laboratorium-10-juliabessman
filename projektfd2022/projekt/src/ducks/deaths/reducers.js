import types from './types';

const initState = {
  deaths: [],
  loading: false,
  error: '',
};

const deathsReducer = (state = initState, action) => {
  switch (action.type) {
    case types.DEATHS_LIST_REQUEST_START:
      return { ...state, loading: true };
    case types.DEATHS_LIST_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.DEATHS_LIST:
      return { ...state, deaths: [...action.payload], loading: false };
    case types.DEATH_CREATE:
      return {
        ...state,
        deaths: [...state.deaths, action.payload],
        loading: false,
      };
    case types.DEATH_EDIT:
      return {
        ...state,
        deaths: state.deaths.map((d) => {
          if (d.death_id === action.payload.death_id) {
            return action.payload;
          }
          return d;
        }),
        loading: false,
      };
    case types.DEATH_DELETE:
      return {
        ...state,
        deaths: state.deaths.filter((d) => d.death_id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default deathsReducer;
