import types from './types';

export const CharactersListRequestAction = (characters) => ({
  type: types.CHARACTERS_LIST,
  payload: characters,
});

export const CharactersListRequestStartAction = () => ({
  type: types.CHARACTERS_LIST_REQUEST_START,
});

export const CharactersListRequestFailAction = (error) => ({
  type: types.CHARACTERS_LIST_REQUEST_FAIL,
  payload: error,
});

export const CharacterCreateNew = (character) => ({
  type: types.CHARACTER_CREATE,
  payload: character,
});

export const CharacterEdit = (character) => ({
  type: types.CHARACTER_EDIT,
  payload: character,
});

export const CharacterDelete = (id) => ({
  type: types.CHARACTER_DELETE,
  payload: id,
});

export const CharacterDeleteOne = (character) => ({
  type: types.CHARACTER_DELETE,
  payload: character,
});
