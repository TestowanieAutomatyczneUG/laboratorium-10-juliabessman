import axios from 'axios';
import * as actions from './actions';

export const getCharactersList = () => {
  return async (dispatch) => {
    dispatch(actions.CharactersListRequestStartAction);
    setTimeout(async () => {
      try {
        const response = await axios.get(
          'https://www.breakingbadapi.com/api/characters',
        );
        dispatch(actions.CharactersListRequestAction(response.data));
      } catch (error) {
        dispatch(actions.CharactersListRequestFailAction(error));
      }
    }, 0);
  };
};
export const createCharacter = (character) => {
  return async (dispatch) => {
    dispatch(actions.CharactersListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.CharacterCreateNew(character));
      } catch (error) {
        dispatch(actions.CharactersListRequestFailAction(error));
      }
    }, 0);
  };
};

export const editCharacter = (character) => {
  return async (dispatch) => {
    dispatch(actions.CharactersListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.CharacterEdit(character));
      } catch (error) {
        dispatch(actions.CharactersListRequestFailAction(error));
      }
    }, 0);
  };
};

export const deleteCharacter = (id) => {
  return async (dispatch) => {
    dispatch(actions.CharactersListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.CharacterDelete(id));
      } catch (error) {
        dispatch(actions.CharactersListRequestFailAction(error));
      }
    }, 0);
  };
};
