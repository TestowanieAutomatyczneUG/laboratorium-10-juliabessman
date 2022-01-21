import types from './types';

const initState = {
  characters: [],
  loading: false,
  error: '',
};

const charactersReducer = (state = initState, action) => {
  switch (action.type) {
    case types.CHARACTERS_LIST_REQUEST_START:
      return { ...state, loading: true };
    case types.CHARACTERS_LIST_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.CHARACTERS_LIST:
      return { ...state, characters: [...action.payload], loading: false };
    case types.CHARACTER_CREATE:
      return {
        ...state,
        characters: [...state.characters, action.payload],
        loading: false,
      };
    case types.CHARACTER_EDIT:
      return {
        ...state,
        characters: state.characters.map((c) => {
          if (c.char_id === action.payload.char_id) {
            return action.payload;
          }
          return c;
        }),
        loading: false,
      };
    case types.CHARACTER_DELETE:
      return {
        ...state,
        characters: state.characters.filter(
          (c) => c.char_id !== action.payload,
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default charactersReducer;
