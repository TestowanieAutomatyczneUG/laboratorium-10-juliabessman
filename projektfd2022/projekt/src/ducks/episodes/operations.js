import axios from 'axios';
import * as actions from './actions';

export const getEpisodesList = () => {
  return async (dispatch) => {
    dispatch(actions.EpisodesListRequestStartAction);
    console.log('GET');
    setTimeout(async () => {
      try {
        const response = await axios.get(
          'https://www.breakingbadapi.com/api/episodes',
        );
        dispatch(actions.EpisodesListRequestAction(response.data));
      } catch (error) {
        dispatch(actions.EpisodesListRequestFailAction(error));
      }
    }, 0);
  };
};

export const createEpisode = (episode) => {
  return async (dispatch) => {
    dispatch(actions.EpisodesListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.EpisodeCreateNew(episode));
      } catch (error) {
        dispatch(actions.EpisodesListRequestFailAction(error));
      }
    }, 0);
  };
};

export const editEpisode = (episode) => {
  return async (dispatch) => {
    dispatch(actions.EpisodesListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.EpisodeEdit(episode));
      } catch (error) {
        dispatch(actions.EpisodesListRequestFailAction(error));
      }
    }, 0);
  };
};

export const deleteEpisode = (id) => {
  return async (dispatch) => {
    dispatch(actions.EpisodesListRequestStartAction);
    setTimeout(async () => {
      try {
        dispatch(actions.EpisodeDelete(id));
      } catch (error) {
        dispatch(actions.EpisodesListRequestFailAction(error));
      }
    }, 0);
  };
};
